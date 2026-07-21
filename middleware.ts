import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Inclure les chemins sans locale (sinon 404 GSC sur /case-studies/..., /legal/..., etc.)
  // next-intl redirige alors vers /fr/... avec localePrefix: "always".
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
