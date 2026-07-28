import agentFacebook from "@/assets/AI_Agent_for_Facebook.png.asset.json";
import jobScraper from "@/assets/AI_Job_Scraper_Resume_Optimizer.png.asset.json";
import receptionist from "@/assets/AI_Receptionist.png.asset.json";
import repurposing from "@/assets/AI_Repurposing.png.asset.json";
import asanaLeads from "@/assets/Asana_CRM_Lead_Engagement_Workflow-2.png.asset.json";
import xeroAsana from "@/assets/Asana_CRM_Lead_Engagement_Workflow.png.asset.json";
import gmailDrive from "@/assets/Auto_Sort_Gmail_Attachments_on_Drive.png.asset.json";
import leadsEnrichment from "@/assets/Automated_Leads_Enrichment.png.asset.json";
import shortsCreator from "@/assets/Automated_Youtube_Shorts_and_Facebook_Reels_Creator.webp.asset.json";
import ragAgent from "@/assets/RAG.webp.asset.json";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  shows: string;
  build: string;
  tools: string[];
  problem: string;
  result: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "asana-crm",
    title: "Asana CRM Lead Engagement Workflow",
    category: "CRM Automation · Zapier",
    image: asanaLeads.url,
    alt: "Zapier workflow splitting an Asana task update into five lead-stage paths with Gmail follow-ups",
    shows:
      "A 23-step Zapier Zap where a single Asana task update fans out into five parallel pipeline paths — Ready to Start, No Response, Quoted, Approved, and Paid and Closed — each with its own conditions, delays and email actions.",
    build:
      "Asana acts as the lightweight CRM. When a task moves stage, Paths route the lead down the correct branch: lead folders are created in Google Drive, staged follow-up emails go out through Gmail with Delay and Filter steps between attempts, approved deals pull their PDF quote from Drive, and AI by Zapier drafts a personalised welcome message before it is sent.",
    tools: ["Zapier", "Asana", "Gmail", "Google Drive", "AI by Zapier"],
    problem:
      "Leads were slipping between stages because follow-up depended on someone remembering to send the next email, and quoted deals went cold with no second touch.",
    result:
      "Every stage change now triggers the right follow-up automatically, quoted leads receive a timed second and third touch, and onboarding emails go out the moment a deal is approved — no manual chasing.",
  },
  {
    id: "leads-enrichment",
    title: "Automated Lead Enrichment & Routing",
    category: "Sales Ops · Zapier + Apollo",
    image: leadsEnrichment.url,
    alt: "Zapier workflow enriching inbound form leads with Apollo and splitting them by priority",
    shows:
      "An inbound Youform submission running through a Formatter step, an Apollo enrichment webhook, and a Paths split into High Priority and Low Priority branches with different destinations.",
    build:
      "The form capture is normalised with Formatter to extract a clean company URL, then Webhooks by Zapier calls Apollo to enrich the record with firmographic data. Path conditions score the lead: high-priority records are logged to Google Sheets, announced in Slack and given an AI-drafted outreach email; low-priority records are routed to the sales team by Gmail notification only.",
    tools: ["Zapier", "Youform", "Apollo", "Google Sheets", "Slack", "Gmail", "AI by Zapier"],
    problem:
      "Raw form leads arrived with nothing but a name and email, so the team spent time researching each one manually before deciding who was worth calling.",
    result:
      "Leads arrive pre-enriched and pre-qualified, with the best ones surfaced in Slack in seconds and a draft email already written — cutting research time to zero and shortening first-response time.",
  },
  {
    id: "content-repurposing",
    title: "AI Content Repurposing Pipeline",
    category: "Marketing Automation · Zapier",
    image: repurposing.url,
    alt: "Zapier workflow transcribing Drive uploads and publishing generated posts to Facebook Pages",
    shows:
      "A Zap triggered by a new file in a Google Drive folder, passing through filters, two AI by Zapier steps and a Looping step that splits generated content into multiple publishing paths.",
    build:
      "New media dropped into Drive is filtered for the right file type, transcribed by AI, then rewritten into multiple blog and social posts. Looping by Zapier iterates over each generated line item and Paths send each variant to its correct destination — including automated Facebook Page posts.",
    tools: ["Zapier", "Google Drive", "AI by Zapier", "Facebook Pages"],
    problem:
      "One recorded video took hours to turn into written content, and most recordings were never repurposed at all.",
    result:
      "A single upload now produces a transcript plus a batch of ready-to-publish posts that distribute themselves, turning every recording into multi-channel content without extra effort.",
  },
  {
    id: "xero-asana",
    title: "Xero to Asana Transaction Export",
    category: "Finance Ops · Make",
    image: xeroAsana.url,
    alt: "Make scenario exporting Xero account transactions into Google Sheets and attaching a CSV to Asana",
    shows:
      "A Make (Integromat) scenario chaining an Asana trigger, a Xero API call, a Router with two branches, an Iterator, and multiple Google Sheets modules feeding a CSV attachment back to Asana.",
    build:
      "When a task is completed in Asana, the scenario calls the Xero API for the matching account transactions. The Router handles two flows: the first iterates each transaction into a Google Sheets row; the second sleeps, reads the range back, aggregates it into a CSV, uploads it as an Asana attachment and clears the sheet ready for the next run.",
    tools: ["Make (Integromat)", "Xero", "Asana", "Google Sheets"],
    problem:
      "Reconciling finance data meant exporting from Xero by hand, reformatting it in a spreadsheet, and re-uploading it wherever the team was tracking the job.",
    result:
      "Transaction exports are generated and attached to the right task automatically, with a self-clearing staging sheet so the process repeats cleanly every time — removing a recurring manual export job.",
  },
  {
    id: "gmail-drive",
    title: "Auto-Sort Gmail Attachments to Drive",
    category: "Back Office · Make + AI",
    image: gmailDrive.url,
    alt: "Make scenario analysing Gmail attachments with AI, renaming them and filing them in Google Drive",
    shows:
      "A linear Make scenario: Gmail watches for new mail, lists attachments, sends each file to an AI model for analysis and filename generation, uploads it to Google Drive, logs it in Sheets and sends a confirmation email.",
    build:
      "Each incoming attachment is uploaded to an AI model that reads the document and returns a structured, consistent filename. The renamed file is filed into the correct Drive folder, a log row is written to Google Sheets for auditability, and a notification email confirms the filing.",
    tools: ["Make (Integromat)", "Gmail", "Google Drive", "Google Sheets", "AI file analysis"],
    problem:
      "Invoices, quotes and signed documents piled up in the inbox with meaningless filenames, and filing them by hand was slow and inconsistent.",
    result:
      "Documents file themselves within minutes of arriving, under a predictable naming convention, with a searchable log — so nothing is lost and no one spends time on inbox housekeeping.",
  },
  {
    id: "facebook-agent",
    title: "AI Agent for Facebook Messenger",
    category: "Conversational AI · n8n",
    image: agentFacebook.url,
    alt: "n8n workflow with a webhook, verification branch and an AI agent using Gemini and memory",
    shows:
      "An n8n workflow where a webhook handles both Facebook's GET verification handshake and POST message events, feeding filtered messages into an AI Agent node backed by Google Gemini and a memory buffer.",
    build:
      "GET requests hit an If node that responds to Facebook's verification challenge. POST messages pass a Filter, load business context from a knowledge document, then run through an AI Agent with Gemini as the chat model and Simple Memory for conversation continuity. The reply is sent back through the Graph API via HTTP Request.",
    tools: ["n8n", "Facebook Graph API", "Google Gemini", "Webhooks"],
    problem:
      "Page enquiries arrived at all hours and went unanswered until someone opened the inbox, costing leads to faster-replying competitors.",
    result:
      "Every message gets an accurate, context-aware answer within seconds, 24/7, with conversation memory so follow-up questions make sense — and only genuine handovers reach a human.",
  },
  {
    id: "ai-receptionist",
    title: "AI Voice Receptionist & Booking System",
    category: "Conversational AI · n8n + Vapi",
    image: receptionist.url,
    alt: "n8n workflow with grouped branches for getting slots, booking, updating and cancelling appointments",
    shows:
      "A multi-branch n8n workflow organised into labelled blocks — Get Slots, Book Slot, Update Slot, Cancel Slot and Call Result — each acting as a tool the voice agent can call.",
    build:
      "A Vapi voice agent calls webhook tools per intent. Get Slots reads the calendar, formats availability and returns speakable time ranges. Book Slot validates payload data, converts timezones, creates the calendar event and logs the booking to Airtable. Update and Cancel find the original appointment, amend or delete the event and confirm back. Every branch has its own error-response path.",
    tools: ["n8n", "Vapi", "Google Calendar", "Airtable", "Webhooks"],
    problem:
      "Missed calls meant missed bookings, and manual scheduling created double-bookings and back-and-forth rescheduling calls.",
    result:
      "Calls are answered instantly and appointments booked, rescheduled or cancelled inside the conversation, with the calendar and records updated in real time and clean error handling when details are missing.",
  },
  {
    id: "job-scraper",
    title: "AI Job Scraper & Resume Optimizer",
    category: "AI Workflow · n8n",
    image: jobScraper.url,
    alt: "Long n8n workflow scraping jobs from Slack input and generating tailored resumes in Google Drive",
    shows:
      "An extended n8n workflow starting from a Slack trigger, validating the query, calling a job search API, looping over results and generating a tailored resume for each role before drafting an email.",
    build:
      "A Slack command supplies the search query, which is validated before hitting a jobs API. Results are split and looped: for each role the base resume is pulled from Google Drive, rewritten by an OpenRouter chat model with a structured output parser, checked for an existing copy, duplicated, updated with the tailored content, and finally turned into a Gmail draft with a Slack confirmation.",
    tools: ["n8n", "Slack", "Job Search API", "OpenRouter", "Google Drive", "Gmail"],
    problem:
      "Tailoring a resume to each job posting is the single biggest time cost in applying, so applications were either generic or never sent.",
    result:
      "One Slack message returns a set of matched roles, each with a role-specific resume already stored in Drive and an application email drafted — reducing hours of tailoring to a few minutes of review.",
  },
  {
    id: "shorts-creator",
    title: "Automated Shorts & Reels Creator",
    category: "Content Automation · n8n",
    image: shortsCreator.url,
    alt: "n8n workflow generating videos from a spreadsheet and publishing to YouTube and Facebook",
    shows:
      "A scheduled n8n workflow reading rows from Google Sheets, scripting with an LLM chain, authenticating a video generation API with a signed JWT, polling until the render is ready, then publishing to YouTube and Facebook.",
    build:
      "A Schedule Trigger pulls pending content rows. A Basic LLM Chain with Gemini and a structured output parser turns each row into a prompt, which is sent to a video generation API using a JWT exchanged for an access token. A wait-and-poll loop checks render status, filters failures, converts the base64 result to a file and uploads it to both YouTube and the Facebook Graph API.",
    tools: ["n8n", "Google Sheets", "Google Gemini", "Video generation API", "YouTube", "Facebook Graph API"],
    problem:
      "Short-form publishing demands constant output, but scripting, rendering and uploading each clip by hand is unsustainable.",
    result:
      "A content calendar in a spreadsheet becomes a hands-off publishing pipeline that scripts, renders and posts vertical video to two platforms on schedule, with error handling for failed renders.",
  },
  {
    id: "rag-agent",
    title: "RAG Knowledge Agent with Live Sync",
    category: "AI Infrastructure · n8n",
    image: ragAgent.url,
    alt: "n8n workflow with a RAG chat agent and three branches syncing Google Drive documents to a vector store",
    shows:
      "Four grouped n8n flows: a chat-triggered RAG Agent, plus New Docs, Delete Docs and File Updated branches that keep a Supabase vector store in sync with a Google Drive folder.",
    build:
      "The agent answers chat messages using an OpenAI chat model, memory and a Supabase Vector Store tool. Three Drive watchers maintain the index: created files are downloaded, embedded and inserted; deleted files remove their rows; updated files delete the stale rows and re-embed the new version — so retrieval always reflects the current documents.",
    tools: ["n8n", "Supabase Vector Store", "OpenAI Embeddings", "Google Drive"],
    problem:
      "Internal answers lived in scattered documents, and any AI assistant built on them went stale the moment a file was edited.",
    result:
      "Staff get grounded answers from company documents through chat, and the knowledge base updates itself on every file create, edit or delete — no re-indexing task and no outdated responses.",
  },
];