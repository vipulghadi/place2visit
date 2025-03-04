"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Search, Clock, ChevronDown, MapPin, Shield, RefreshCw, Users } from 'lucide-react';



const faqData = [
  {
    question: "What is Place2Visit?",
    answer: "Place2Visit is your ultimate travel companion, offering curated guides and inspiring stories about destinations worldwide. Our platform helps travelers discover hidden gems, plan their trips efficiently, and make unforgettable memories.",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    question: "How do I find specific destinations?",
    answer: "Our intelligent search system allows you to find destinations by name, region, or activity type. You can also use filters to discover places based on your interests, budget, and travel season.",
    icon: <Search className="h-5 w-5" />
  },
  {
    question: "How often is content updated?",
    answer: "We refresh our content daily with new destinations, travel tips, and user experiences. Our team of travel experts constantly reviews and updates existing guides to ensure accuracy.",
    icon: <Clock className="h-5 w-5" />
  },
  {
    question: "Are the travel guides verified?",
    answer: "Yes, all our travel guides are thoroughly verified by our expert team and updated regularly with real traveler feedback to maintain accuracy and relevance.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    question: "Can I contribute my travel experiences?",
    answer: "Absolutely! We welcome travel stories from our community. You can submit your experiences, photos, and tips through our contribution portal.",
    icon: <Users className="h-5 w-5" />
  }
];



const FAQItem = ({ item, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 last:border-none"
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-6 px-4 md:px-6 focus:outline-none group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-full transition-colors duration-200 ${
              isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
            }`}>
              {item.icon}
            </div>
            <h3 className="font-semibold text-base md:text-lg text-gray-800">{item.question}</h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`flex-shrink-0 ml-4 ${isOpen ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-6 pt-0">
              <div className="ml-16 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Place2Visit. Can't find what you're looking for?
            Contact our support team.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Get in touch with our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;