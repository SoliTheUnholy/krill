import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/landing/section-heading";

const questions = [
  {
    id: "estimate",
    question: "Is the estimator a final quote?",
    answer:
      "No. It is a useful starting range based on scale, capabilities, readiness, motion, and delivery pace. We confirm the scope with you before any deposit is requested.",
  },
  {
    id: "identity",
    question: "What if our brand identity or content is not ready?",
    answer:
      "That is a valid starting point. Select the level of support you need and the estimate will include additional direction for identity, writing, imagery, or content structure.",
  },
  {
    id: "difference",
    question: "How do you stop every Krill website from looking the same?",
    answer:
      "The brief captures the brand premise, audience, category, desired character, references, and functional model before design begins. Those inputs become the creative and implementation constraints—not a reusable visual theme.",
  },
  {
    id: "payment",
    question: "How do payments and delivery work?",
    answer:
      "After scope confirmation, a 20% deposit reserves production. The remaining balance is tied to visible milestones in your private project workspace as the website moves toward release.",
  },
  {
    id: "aftercare",
    question: "Can our team update the website after launch?",
    answer:
      "Yes. When content editing is part of the scope, we build a maintainable content system and provide documentation so your team can operate it confidently.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative z-10 border-t border-border px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <SectionHeading
          eyebrow="Before departure"
          title="The useful questions."
          copy="A little clarity before the first signal makes the whole journey calmer."
        />
        <Accordion className="rounded-[1.75rem] border-border bg-card/45" defaultValue={["estimate"]}>
          {questions.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="px-5 py-5 text-left text-base no-underline hover:no-underline sm:px-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
