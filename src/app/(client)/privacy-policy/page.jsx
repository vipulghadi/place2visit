"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }))

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: {currentDate}</p>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-2xl  p-8 md:p-10 mb-12">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Place2Visit! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><span className="font-medium">Personal Information:</span> We collect your email when you subscribe to our newsletter.</li>
                <li><span className="font-medium">Non-Personal Information:</span> We use cookies and local storage to enhance your experience, such as saving your dark mode preference and storing your location (with your permission) to suggest nearby places.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To improve your experience on our website.</li>
                <li>To provide personalized content and recommendations.</li>
                <li>To send you newsletters if you subscribe (you can unsubscribe anytime).</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing & Security</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We never share your personal information with third parties.</li>
                <li>Your data is securely stored and used only to enhance your experience.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You can opt out of cookies via your browser settings.</li>
                <li>You can unsubscribe from our newsletter anytime.</li>
                <li>You can request deletion of your stored data.</li>
              </ul>
            </div>
          </div>
        </div>
        
    

      </div>
    </div>
  )
}
