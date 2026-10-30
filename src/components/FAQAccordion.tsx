import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "../lib/serviceContent";

const homepageFaqs: ServiceFaq[] = [
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "TechyPraxis Digital is focused on startups, SMEs, business owners and growing enterprises looking for digital and technology support.",
  },
  {
    question: "What services does TechyPraxis Digital offer?",
    answer:
      "Our primary service areas are website design and development, digital marketing and SEO, business technology solutions, custom web applications, and AI and business automation.",
  },
  {
    question: "Can I discuss a project before deciding what I need?",
    answer:
      "Yes. A project conversation is a useful way to explain your goals, current challenges and constraints before deciding on a suitable next step.",
  },
  {
    question: "Where is TechyPraxis Digital based?",
    answer: "TechyPraxis Digital is based in Bengaluru, India.",
  },
];

export function FAQAccordion({ items = homepageFaqs }: { items?: ServiceFaq[] }) {
  return (
    <div className="faq-list">
      {items.map((faq) => (
        <details className="faq-item" key={faq.question}>
          <summary>
            <span>{faq.question}</span>
            <ChevronDown aria-hidden="true" size={18} />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
