"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function CookiesPolicy() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cookies Policy</h1>
          <p className="text-gray-600">Last Updated: {currentDate}</p>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-12">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              At Place2Vist, we use cookies and local storage to improve your experience.
            </p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700">Cookies are small files stored on your device to enhance functionality, such as saving your preferences.</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies & Local Storage</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To remember your dark mode preference.</li>
                <li>To store your location coordinates (only with your permission) to recommend places near you.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Managing Cookies</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You can disable cookies in your browser settings.</li>
                <li>Local storage data (like location) can be cleared in your browser settings.</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact Us</h2>
              <p className="text-gray-700">For any concerns, contact us at <a href="mailto:[Your Email]" className="text-blue-600 hover:underline">[vipulvijayghadi@gmail.com]</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}