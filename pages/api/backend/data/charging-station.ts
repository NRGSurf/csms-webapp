import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const base =
      process.env.CITRINE_API_BASE_URL ||
      process.env.NEXT_PUBLIC_CITRINE_API_BASE_URL;
    const token = process.env.CITRINE_API_TOKEN;

    const stationId = String(req.query.stationId || "").trim();
    const tenantId = String(req.query.tenantId || "1");

    if (!base || !token) {
      return res.status(500).json({
        error:
          "Backend not configured. Set CITRINE_API_BASE_URL and CITRINE_API_TOKEN in env.",
      });
    }
    if (!stationId) {
      return res.status(400).json({ error: "stationId is required" });
    }

    const url = new URL(`${base}/data/transactions/chargingStation`);
    url.searchParams.set("stationId", stationId);
    url.searchParams.set("tenantId", tenantId);

    const upstream = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await upstream.text();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: "Upstream error",
        details: body,
        forwardedUrl: url.toString(),
      });
    }

    res.setHeader("Cache-Control", "no-store");
    // body is JSON string already
    return res.status(200).send(body);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
}
