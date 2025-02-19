import React from 'react'
import Link from 'next/link'
function Footer() {
    <section className="bg-[#f2f2f2] text-black py-16 px-4 text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="text-lg mb-8">
        We're passionate about helping travelers discover the world's most amazing destinations. 
        Our expert team curates the best travel experiences and provides valuable insights for your journey.
      </p>
      <Link
        href="/about"
        className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:-translate-y-1 transition-transform"
      >
        Learn More
      </Link>
    </div>
  </section>
}

export default Footer