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
    const idToken = String(req.query.idToken || "").trim(); // NEW
    const tenantId = String(req.query.tenantId || "1");

    // Only filter locally; don't forward isActive upstream
    const wantActive =
      String(req.query.isActive || "").toLowerCase() === "true";

    if (!base || !token) {
      return res.status(500).json({
        error:
          "Backend not configured. Set CITRINE_API_BASE_URL and CITRINE_API_TOKEN in env.",
      });
    }

    // Accept either stationId or idToken (or both)
    if (!stationId && !idToken) {
      return res
        .status(400)
        .json({ error: "stationId or idToken is required" });
    }

    const params = new URLSearchParams({ tenantId });
    if (stationId) params.set("stationId", stationId);
    if (idToken) params.set("idToken", idToken); // forward to backend

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

    let data: any;
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
