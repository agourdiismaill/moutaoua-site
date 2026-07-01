import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #fcf9f8 0%, #f5ebe8 45%, #fce8ea 100%)",
          color: "#141313",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#a8000d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <p
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            {t("tagline")}
          </p>
          <p style={{ fontSize: 26, lineHeight: 1.4, color: "#5c5656", margin: 0 }}>
            {t("description")}
          </p>
        </div>

        <p style={{ fontSize: 22, color: "#a8000d", fontWeight: 700, margin: 0 }}>
          mohtaoua.ma
        </p>
      </div>
    ),
    { ...size }
  );
}
