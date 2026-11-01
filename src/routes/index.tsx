import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio/HomePage";

const TITLE = "Kenneth Louie Cleofe | AI Automation & Operations Specialist";
const DESCRIPTION =
  "8+ years turning manual operations into automated systems with Zapier, Make, n8n, GoHighLevel and AI. Services, work experience, past builds and a discovery call booking link.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: HomePage,
});
