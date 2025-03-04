// app/layout.jsx
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="flex  w-full mt-16">


    

          {children}


      
    </main>
  );
};

export default Layout;