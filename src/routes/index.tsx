import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio/HomePage";

const TITLE = "Kenneth Louie Cleofe | AI Automation & Operations Specialist";
const DESCRIPTION =
  "Automation for small and medium businesses in Australia, the US and the UK. 8+ years in operations, building Zapier, Make, n8n, GoHighLevel and AI systems that remove manual work.";

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
