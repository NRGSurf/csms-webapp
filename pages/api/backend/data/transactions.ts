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

    // We accept `isActive=true` from the browser, but DO NOT forward it upstream yet.
    const wantActive =
      String(req.query.isActive || "").toLowerCase() === "true";

    if (!base || !token) {
      return res.status(500).json({
        error:
          "Backend not configured. Set CITRINE_API_BASE_URL and CITRINE_API_TOKEN in env.",
      });
    }
    if (!stationId) {
      return res.status(400).json({ error: "stationId is required" });
    }

    // Build upstream URL WITHOUT isActive (filter locally for now)
    const params = new URLSearchParams({ stationId, tenantId });
    const url = `${base}/data/transactions/transactions?${params.toString()}`;

    const upstream = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const bodyText = await upstream.text();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: "Upstream error",
        details: bodyText,
        forwardedUrl: url,
      });
    }

    let data: any = [];
    try {
      data = JSON.parse(bodyText);
    } catch {
      data = [];
    }

    if (wantActive && Array.isArray(data)) {
      data = data.filter((t) => t?.isActive === true);
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
