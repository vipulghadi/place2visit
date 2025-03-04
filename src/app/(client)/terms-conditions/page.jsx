"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'

export default function TermsConditions() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last Updated: {currentDate}</p>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-2xl  p-8 md:p-10 mb-12">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              By accessing Place2Visit, you agree to these terms.
            </p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Website</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Our website provides articles and travel-related information.</li>
                <li>Users can browse content without signing up.</li>
                <li>Subscription to our newsletter is optional.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You must be at least 13 years old to use our services.</li>
                <li>You agree not to misuse our website, such as by posting harmful content.</li>
                <li>You are responsible for maintaining the confidentiality of your account information.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All articles and content are owned by Place2Visit.</li>
                <li>You may not copy or distribute our content without permission.</li>
                <li>Our logo, design, and branding elements are protected by copyright laws.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We strive for accuracy, but we do not guarantee the completeness of our content.</li>
                <li>We are not responsible for decisions made based on the information provided on our website.</li>
                <li>We reserve the right to modify or discontinue any part of our service without notice.</li>
              </ul>
            </div>
          </div>
        </div>
        
    
        

      </div>
    </div>
  )
}
