// Server Component (no "use client" directive)
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Search, MapPin, Shield, Clock, RefreshCw, Mail, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

// Static FAQ data with added icons
const faqData = [
    {
        question: "What is Place2Visit?",
        answer: "Place2Visit is your go-to resource for travel articles, offering comprehensive guides and inspiring stories about the world's best destinations. We curate content from travel experts and enthusiasts to help you plan your perfect trip.",
        icon: <HelpCircle className="h-5 w-5 text-primary" />
    },
    {
        question: "How do I find articles about places?",
        answer: "You can search by place name, state, or article title to discover relevant travel guides. Our advanced search feature also allows filtering by continent, activity type, and travel season to help you find exactly what you're looking for.",
        icon: <Search className="h-5 w-5 text-primary" />
    },
    {
        question: "How often are new travel articles posted?",
        answer: "We post new travel articles weekly, featuring fresh destinations and tips for your next adventure. Subscribe to our newsletter to get notified when new content is published about your favorite destinations.",
        icon: <Clock className="h-5 w-5 text-primary" />
    },
    {
        question: "Can I contribute my own travel stories?",
        answer: "Yes! You can submit your travel experiences via our 'Contribute' section on the website. We welcome personal stories, photography, and destination tips from travelers around the world. Our editorial team reviews all submissions within 5-7 business days.",
        icon: <MessageCircle className="h-5 w-5 text-primary" />
    },
    {
        question: "Do I need a subscription to access all travel articles?",
        answer: "No subscription is needed for most articles, but premium content and unlimited quiz generation require a monthly or yearly plan. Our premium plans start at just $4.99/month and include ad-free browsing, downloadable travel guides, and exclusive content.",
        icon: <Users className="h-5 w-5 text-primary" />
    },
    {
        question: "How do I search for places near me?",
        answer: "Simply enable location access or enter your latitude/longitude to find the best places nearby. Our proximity search feature can filter results by distance and show you hidden gems in your area that you might not have discovered yet.",
        icon: <MapPin className="h-5 w-5 text-primary" />
    },
    {
        question: "Are the articles updated regularly?",
        answer: "Yes, our travel guides and destination information are frequently updated for accuracy. We review popular destinations quarterly and update information about opening hours, prices, and travel restrictions as they change.",
        icon: <RefreshCw className="h-5 w-5 text-primary" />
    },
    {
        question: "How do I contact support for travel-related queries?",
        answer: "Use the 'Contact Us' form or email support@place2visit.com for assistance. Our support team is available Monday through Friday, 9 AM to 6 PM EST, and typically responds within 24 hours.",
        icon: <Mail className="h-5 w-5 text-primary" />
    },
    {
        question: "Is my data safe when using Place2Visit?",
        answer: "Yes, we prioritize user privacy and do not share personal data with third parties. All your information is encrypted and stored securely according to industry standards. You can review our detailed privacy policy for more information.",
        icon: <Shield className="h-5 w-5 text-primary" />
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
        <div className="container mx-auto py-12 px-4 max-w-5xl">
            <div className="space-y-6">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Frequently Asked Questions</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to the most common questions about using Place2Visit for your travel planning and inspiration.
                    </p>
                    <Separator className="my-6" />
                </div>
                
                <Card className="p-6 bg-card shadow-sm">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqData.map((item, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`} 
                                className="border border-border rounded-lg overflow-hidden"
                            >
                                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-all data-[state=open]:bg-muted/30">
                                    <div className="flex items-center gap-3 text-left">
                                        {item.icon}
                                        <span className="font-medium">{item.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-muted-foreground bg-background/50">
                                    <div className="pl-8">
                                        {item.answer}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Card>
                
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                        Can't find what you're looking for? 
                        <a href="/contact" className="text-primary font-medium ml-1 hover:underline">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}