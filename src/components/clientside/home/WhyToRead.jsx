"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Globe, Heart, Share2, Star, ThumbsUp, TrendingUp, Award, Coffee, Compass, Lightbulb, Map, Sparkles } from "lucide-react";

export const metadata = {
  title: "Why Read Our Articles | Your Website Name",
  description:
    "Discover why our articles are worth your time - expert insights, travel recommendations, and curated content to enhance your knowledge.",
  openGraph: {
    title: "Why Read Our Articles | Your Website Name",
    description:
      "Discover why our articles are worth your time - expert insights, travel recommendations, and curated content to enhance your knowledge.",
    type: "website",
  },
};

export default function WhyToRead() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Expert Insights",
      description: "Content written by industry experts and passionate enthusiasts",
      details: "Our articles are crafted by professionals with years of experience, ensuring you get accurate and valuable information on every topic.",
      color: "from-amber-500 to-orange-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving Curation",
      description: "Carefully selected content that respects your time",
      details: "We filter through the noise to bring you only the most relevant and high-quality content, saving you hours of research.",
      color: "from-purple-500 to-indigo-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-600"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Reader-Focused",
      description: "Content designed with your needs in mind",
      details: "Our articles are written to address your questions, concerns, and interests, making them relevant to your life and goals.",
      color: "from-red-500 to-pink-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600"
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Unique Destinations",
      description: "Discover places off the beaten path",
      details: "We highlight lesser-known destinations that offer authentic experiences away from typical tourist crowds.",
      color: "from-emerald-500 to-teal-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Practical Tips",
      description: "Actionable advice you can use immediately",
      details: "Every article includes practical tips and recommendations that you can apply to enhance your travel experiences.",
      color: "from-blue-500 to-cyan-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-600"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Thoroughly researched and fact-checked content",
      details: "We maintain high editorial standards with rigorous fact-checking to ensure the information we provide is accurate and reliable.",
      color: "from-fuchsia-500 to-pink-600",
      hoverClass: "hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-pink-600"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Why Our Travel Content Stands Out
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover expert insights, travel recommendations, and curated content that will expand your horizons and
            inspire your next adventure.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className={`h-full transition-all duration-500 hover:shadow-xl group ${feature.hoverClass} hover:text-white border border-gray-200`}>
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-transparent group-hover:bg-clip-text`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-white transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="group-hover:text-white/80 transition-colors">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                    {feature.details}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore the World?</h3>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of travelers who rely on our expert guides and recommendations to create unforgettable journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}