// app/layout.jsx
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="flex  min-h-screen w-full">
      {/* First Section (Empty) - For ads, related blogs, etc. */}
      <section className="sm:w-3/12 sm:block hidden ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Empty for now - Add content like ads or related blogs later */}
          <div className="h-32 sm:h-40 md:h-48 lg:h-56"></div>
        </div>
      </section>

      {/* Second Section (Main Content) - Blog page */}
      <section className="sm:w-6/12 w-full p-4 sm:p-1">
        <div className="w-full">
          {children}
        </div>
      </section>

      {/* Third Section (Empty) - For ads, related blogs, etc. */}
      <section className="sm:w-3/12 sm:block hidden ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Empty for now - Add content like ads or related blogs later */}
          <div className="h-32 sm:h-40 md:h-48 lg:h-56"></div>
        </div>
      </section>
    </main>
  );
};

export default Layout;