import { Reveal } from "@/components/portfolio/Reveal";

// Marcus's review, word for word apart from one typo ("do develop" to "to develop").
// The pull quote on the left is a line taken from it.
const REVIEW = {
  name: "Marcus Bawden",
  company: "Focus Banners",
  pull: "He is naturally talented at bridging the gap between AI and us users.",
  paragraphs: [
    "I highly recommend Ken to people starting out in the world of AI and automation. We hired Ken to develop a scraping program to review all our competitors websites and give us up-to-date information on their sales volumes, products sold, categories, etc. It wouldn't work for every business but it works brilliantly for us. Now instead of guessing what to buy we know exactly what sells, how quickly and how much for. The intelligence couldn't be better.",
    "Ken has also finished off a project of ours to combine a quoting application, proofing application (for our printing business) and Twenty CRM. We will add integrations with Slack and Xero. It is a complicated build and Ken has done a great job which will reduce a great deal of friction and double work. I wouldn't call Ken an expert but he can make things happen and he is naturally talented at bridging the gap between AI and us users.",
  ],
};

export function Review() {
  return (
    <Reveal>
      <figure className="grid gap-10 rounded-sm border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <span aria-hidden className="block font-display text-6xl leading-none text-primary">
              &ldquo;
            </span>
            <p className="mt-2 text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
              {REVIEW.pull}
            </p>
          </div>
          <figcaption className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cta-hover font-mono text-sm text-foreground"
            >
              MB
            </span>
            <span>
              <span className="block font-semibold">{REVIEW.name}</span>
              <span className="block text-sm text-muted-foreground">{REVIEW.company}</span>
            </span>
          </figcaption>
        </div>
        <blockquote className="space-y-5 border-t border-border pt-8 text-base leading-relaxed text-muted-foreground lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          {REVIEW.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </blockquote>
      </figure>
    </Reveal>
  );
}
