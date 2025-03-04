import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageCircle, Search, MapPin, Shield, Clock, RefreshCw, Mail, Users, ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: "What is Place2Visit?",
    answer: "Place2Visit is your go-to resource for travel articles, offering comprehensive guides and inspiring stories about the world's best destinations.",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    question: "How do I find articles about places?",
    answer: "You can search by place name, state, or article title to discover relevant travel guides.",
    icon: <Search className="h-5 w-5" />
  },
  {
    question: "How often are new travel articles posted?",
    answer: "We post new travel articles weekly, featuring fresh destinations and tips for your next adventure.",
    icon: <Clock className="h-5 w-5" />
  }
];

const FAQItem = ({ item, index, isOpen, toggleAccordion }) => {
  return (
    <motion.div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
      <div className={`flex justify-between items-center p-5 cursor-pointer ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => toggleAccordion(index)}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{item.icon}</div>
          <h3 className="font-medium text-lg text-gray-800">{item.question}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className={`h-5 w-5 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="p-5 pt-0">
            <div className="pl-10 pr-4 py-4 text-gray-600 bg-gray-50 rounded-lg">{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} index={index} isOpen={openIndex === index} toggleAccordion={toggleAccordion} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
