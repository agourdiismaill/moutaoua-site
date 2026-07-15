"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PremiumVariant = "dashboard" | "devices" | "analytics" | "marketing";
type ServiceVisualKind = "marketing" | "software" | "ai" | "documents" | "nfc" | "crm" | "erp";

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export function PremiumIllustration({
  variant = "dashboard",
  className,
  label = "Illustration premium",
}: {
  variant?: PremiumVariant;
  className?: string;
  label?: string;
}) {
  return (
    <div role="img" aria-label={label} className={cn("relative isolate overflow-hidden", className)}>
      <svg
        viewBox="0 0 640 420"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`frame-${variant}`} x1="76" y1="54" x2="558" y2="370" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A8000D" stopOpacity=".2" />
            <stop offset="1" stopColor="#FF7B6F" stopOpacity=".06" />
          </linearGradient>
          <linearGradient id={`screen-${variant}`} x1="120" y1="90" x2="520" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF9F7" />
            <stop offset="1" stopColor="#F1E8E5" />
          </linearGradient>
          <filter id={`shadow-${variant}`} x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#5B1117" floodOpacity=".16" />
          </filter>
          <pattern id={`dots-${variant}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#A8000D" fillOpacity=".18" />
          </pattern>
        </defs>

        <circle cx="510" cy="92" r="100" fill={`url(#frame-${variant})`} />
        <circle cx="124" cy="334" r="120" fill={`url(#dots-${variant})`} opacity=".5" />

        {variant === "devices" ? <DevicesArt /> : variant === "analytics" ? <AnalyticsArt /> : <DashboardArt marketing={variant === "marketing"} />}
      </svg>
      <motion.span
        aria-hidden="true"
        className="absolute right-[13%] top-[17%] size-3 rounded-full bg-primary shadow-[0_0_24px_rgba(168,0,13,.55)]"
        animate={{ y: [-4, 8, -4], opacity: [0.6, 1, 0.6] }}
        transition={floatTransition}
      />
    </div>
  );
}

export function ServiceVisual({
  kind,
  className,
}: {
  kind: ServiceVisualKind;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -right-3 -top-3 z-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100", className)}
      animate={{ y: [0, -4, 0], rotate: [0, 1.5, 0] }}
      transition={{ ...floatTransition, duration: 7 }}
    >
      <svg viewBox="0 0 180 140" className="size-36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="132" cy="30" r="46" fill="#A8000D" fillOpacity=".06" />
        {kind === "marketing" && <MarketingIcon />}
        {kind === "software" && <SoftwareIcon />}
        {kind === "ai" && <AiIcon />}
        {kind === "documents" && <DocumentsIcon />}
        {kind === "nfc" && <NfcIcon />}
        {kind === "crm" && <CrmIcon />}
        {kind === "erp" && <ErpIcon />}
      </svg>
    </motion.div>
  );
}

function DashboardArt({ marketing }: { marketing: boolean }) {
  return (
    <g filter="url(#shadow-dashboard)">
      <rect x="78" y="58" width="484" height="296" rx="24" fill={`url(#screen-dashboard)`} stroke="#fff" strokeWidth="8" />
      <rect x="78" y="58" width="484" height="48" rx="24" fill="#211C1C" />
      <circle cx="108" cy="82" r="5" fill="#FF7B6F" />
      <circle cx="126" cy="82" r="5" fill="#F6C85F" />
      <circle cx="144" cy="82" r="5" fill="#7AD5A2" />
      <rect x="104" y="130" width="112" height="198" rx="12" fill="#211C1C" fillOpacity=".05" />
      <rect x="128" y="154" width="64" height="8" rx="4" fill="#A8000D" fillOpacity=".45" />
      <rect x="128" y="177" width="48" height="7" rx="3.5" fill="#211C1C" fillOpacity=".12" />
      <rect x="128" y="199" width="60" height="7" rx="3.5" fill="#211C1C" fillOpacity=".12" />
      <rect x="128" y="221" width="42" height="7" rx="3.5" fill="#211C1C" fillOpacity=".12" />
      <rect x="242" y="130" width="286" height="84" rx="12" fill="#fff" />
      <path d="M266 188C290 169 308 178 330 153C352 128 371 174 398 154C426 133 432 165 459 145C481 129 500 141 514 130" stroke="#A8000D" strokeWidth="4" strokeLinecap="round" />
      <rect x="242" y="232" width="88" height="96" rx="12" fill={marketing ? "#A8000D" : "#211C1C"} fillOpacity=".1" />
      <rect x="346" y="232" width="88" height="96" rx="12" fill="#fff" />
      <rect x="450" y="232" width="78" height="96" rx="12" fill="#fff" />
      <rect x="265" y="286" width="42" height="8" rx="4" fill="#A8000D" fillOpacity=".5" />
      <rect x="369" y="274" width="42" height="8" rx="4" fill="#211C1C" fillOpacity=".2" />
      <rect x="472" y="260" width="30" height="34" rx="6" fill="#A8000D" fillOpacity=".2" />
    </g>
  );
}

function DevicesArt() {
  return (
    <g filter="url(#shadow-devices)">
      <rect x="72" y="75" width="444" height="260" rx="18" fill="#211C1C" fillOpacity=".1" />
      <rect x="86" y="58" width="444" height="260" rx="18" fill="#211C1C" />
      <rect x="102" y="76" width="412" height="218" rx="8" fill={`url(#screen-devices)`} />
      <rect x="120" y="98" width="110" height="12" rx="6" fill="#A8000D" fillOpacity=".35" />
      <rect x="120" y="128" width="162" height="124" rx="12" fill="#fff" />
      <path d="M140 222L171 192L196 208L230 161L264 204" stroke="#A8000D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="302" y="128" width="184" height="54" rx="12" fill="#fff" />
      <rect x="302" y="198" width="184" height="54" rx="12" fill="#A8000D" fillOpacity=".12" />
      <rect x="270" y="318" width="86" height="12" rx="6" fill="#211C1C" fillOpacity=".22" />
      <rect x="492" y="176" width="92" height="184" rx="18" fill="#211C1C" />
      <rect x="502" y="198" width="72" height="132" rx="10" fill="#FFF9F7" />
      <circle cx="538" cy="344" r="5" fill="#fff" fillOpacity=".8" />
    </g>
  );
}

function AnalyticsArt() {
  return (
    <g filter="url(#shadow-analytics)">
      <rect x="86" y="60" width="468" height="294" rx="22" fill={`url(#screen-analytics)`} stroke="#fff" strokeWidth="8" />
      <rect x="112" y="94" width="130" height="82" rx="14" fill="#A8000D" fillOpacity=".12" />
      <rect x="264" y="94" width="130" height="82" rx="14" fill="#fff" />
      <rect x="416" y="94" width="112" height="82" rx="14" fill="#fff" />
      <rect x="112" y="202" width="416" height="112" rx="14" fill="#fff" />
      <path d="M138 284C170 256 189 271 216 240C243 210 270 272 302 235C333 199 354 257 382 228C411 198 437 238 503 214" stroke="#A8000D" strokeWidth="5" strokeLinecap="round" />
      <rect x="138" y="116" width="44" height="8" rx="4" fill="#211C1C" fillOpacity=".2" />
      <rect x="138" y="140" width="70" height="20" rx="5" fill="#A8000D" fillOpacity=".55" />
      <rect x="290" y="116" width="44" height="8" rx="4" fill="#211C1C" fillOpacity=".16" />
      <rect x="290" y="140" width="58" height="20" rx="5" fill="#211C1C" fillOpacity=".2" />
    </g>
  );
}

function MarketingIcon() {
  return <><path d="M54 88L96 44L140 88" stroke="#A8000D" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><rect x="72" y="78" width="48" height="36" rx="7" fill="#A8000D" fillOpacity=".14" /><path d="M86 98H106" stroke="#A8000D" strokeWidth="5" strokeLinecap="round" /></>;
}
function SoftwareIcon() {
  return <><rect x="46" y="42" width="90" height="66" rx="10" fill="#211C1C" fillOpacity=".1" stroke="#A8000D" strokeWidth="4" /><path d="M66 72L78 82L66 92M88 94H112" stroke="#A8000D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><path d="M36 118H146" stroke="#A8000D" strokeWidth="6" strokeLinecap="round" /></>;
}
function AiIcon() {
  return <><circle cx="90" cy="77" r="31" fill="#A8000D" fillOpacity=".12" stroke="#A8000D" strokeWidth="4" /><circle cx="78" cy="72" r="4" fill="#A8000D" /><circle cx="102" cy="72" r="4" fill="#A8000D" /><path d="M78 91C86 97 94 97 102 91M90 46V28M60 57L46 45M120 57L134 45" stroke="#A8000D" strokeWidth="4" strokeLinecap="round" /></>;
}
function DocumentsIcon() {
  return <><path d="M58 34H110L128 52V112H58V34Z" fill="#A8000D" fillOpacity=".1" stroke="#A8000D" strokeWidth="4" /><path d="M110 34V54H128M72 70H114M72 88H104" stroke="#A8000D" strokeWidth="4" strokeLinecap="round" /><rect x="40" y="54" width="18" height="62" rx="4" fill="#211C1C" fillOpacity=".12" /></>;
}
function NfcIcon() {
  return <><rect x="60" y="28" width="60" height="100" rx="12" fill="#211C1C" fillOpacity=".1" stroke="#A8000D" strokeWidth="4" /><path d="M78 72C86 62 94 62 102 72M72 82C84 66 96 66 108 82" stroke="#A8000D" strokeWidth="4" strokeLinecap="round" /><circle cx="90" cy="108" r="4" fill="#A8000D" /></>;
}
function CrmIcon() {
  return <><circle cx="66" cy="56" r="13" fill="#A8000D" fillOpacity=".16" stroke="#A8000D" strokeWidth="4" /><circle cx="114" cy="88" r="13" fill="#A8000D" fillOpacity=".16" stroke="#A8000D" strokeWidth="4" /><circle cx="66" cy="112" r="13" fill="#A8000D" fillOpacity=".16" stroke="#A8000D" strokeWidth="4" /><path d="M78 62L102 82M78 106L102 94" stroke="#A8000D" strokeWidth="4" strokeLinecap="round" /></>;
}
function ErpIcon() {
  return <><rect x="48" y="54" width="84" height="60" rx="8" fill="#A8000D" fillOpacity=".1" stroke="#A8000D" strokeWidth="4" /><path d="M62 96V82M82 96V70M102 96V62M122 96V76" stroke="#A8000D" strokeWidth="6" strokeLinecap="round" /></>;
}
