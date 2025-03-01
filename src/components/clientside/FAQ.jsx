// Server Component (no "use client" directive)
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

// Static FAQ data (could be fetched from an API in a real scenario)
const faqData = [
    {
        question: "What is Place2Visit?",
        answer: "Place2Visit is your go-to resource for travel articles, offering guides and stories about the world’s best destinations."
    },
    {
        question: "How do I find articles about places?",
        answer: "You can search by place name, state, or article title to discover relevant travel guides."
    },
    {
        question: "How often are new travel articles posted?",
        answer: "We post new travel articles weekly, featuring fresh destinations and tips for your next adventure."
    },
    {
        question: "Can I contribute my own travel stories?",
        answer: "Yes! You can submit your travel experiences via our 'Contribute' section on the website."
    },
    {
        question: "Do I need a subscription to access all travel articles?",
        answer: "No subscription is needed for most articles, but premium content and unlimited quiz generation require a monthly or yearly plan."
    },
    {
        question: "How do I search for places near me?",
        answer: "Simply enable location access or enter your latitude/longitude to find the best places nearby."
    },
    {
        question: "Are the articles updated regularly?",
        answer: "Yes, our travel guides and destination information are frequently updated for accuracy."
    },
    {
        question: "How do I contact support for travel-related queries?",
        answer: "Use the 'Contact Us' form or email support@place2visit.com for assistance."
    },
    {
        question: "Is my data safe when using Place2Visit?",
        answer: "Yes, we prioritize user privacy and do not share personal data with third parties."
    }
];

// Metadata for SEO (exported for page-level use)
export const metadata = {
    title: "Frequently Asked Questions | Place2Visit",
    description: "Find answers to common questions about Place2Visit, your resource for travel articles and destination guides.",
    keywords: "travel FAQs, Place2Visit, destination guides, travel articles, quiz subscription"
};

export default function FAQ() {
    return (
        <div className="w-full mx-auto py-8 sm:px-20 px-3 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((item, index) => (
                    <AccordionItem 
                        key={index} 
                        value={`item-${index}`} 
                        className="border rounded-lg shadow-sm"
                    >
                        <AccordionTrigger className="text-lg font-medium text-left px-4 py-3 hover:bg-gray-50">
                            <span className="flex items-center">
                                <ChevronDown className="mr-2 h-5 w-5" />
                                {item.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-2 text-gray-600">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
