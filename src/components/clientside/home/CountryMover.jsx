"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function CountryMover() {
  const [rotation, setRotation] = useState(0);
  
  const countries = [
    {
      name: "USA",
      flag: "https://images.unsplash.com/photo-1508323297387-39d73789839f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-blue-500"
    },
    {
      name: "Japan",
      flag: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-red-500"
    },
    {
      name: "France",
      flag: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-indigo-500"
    },
    {
      name: "Italy",
      flag: "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-green-500"
    },
    {
      name: "Australia",
      flag: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-yellow-500"
    },
    {
      name: "Brazil",
      flag: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-emerald-500"
    },
    {
      name: "India",
      flag: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-orange-500"
    },
    {
      name: "Thailand",
      flag: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      color: "bg-purple-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-20 px-6 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Countries Around the World</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations across continents with our comprehensive travel guides
          </p>
        </div>

        <div className="relative h-[500px] w-full">
          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-black shadow-xl flex items-center justify-center z-10 ">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Explorer
            </div>
          </div>

          {/* Orbiting countries */}
          {countries.map((country, index) => {
            const angle = (index * (360 / countries.length) + rotation) * (Math.PI / 180);
            const radius = 200; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={country.name}
                className={`absolute left-1/2 top-1/2 w-20 h-20 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${country.color} hover:scale-110 cursor-pointer`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: Math.sin(angle) > 0 ? 5 : 1, // Items moving forward appear on top
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white group">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{country.name}</span>
                  </div>
                </div>
                
                {/* Pulsing effect */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white" 
                     style={{animationDuration: '3s', animationDelay: `${index * 0.5}s`}}></div>
              </div>
            );
          })}
          
          {/* Decorative orbit paths */}
          <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] border border-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-1/2 w-[410px] h-[410px] border border-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on any country to explore detailed travel guides, local tips, and must-visit attractions
          </p>
        </div>
      </div>
    </div>
  );
}