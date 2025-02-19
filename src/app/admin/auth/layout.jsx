
import { Inter } from "next/font/google";
import "../../globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Place2Visit - Discover Amazing Destinations",
  description: "Explore the world's most beautiful destinations with Place2Visit",
};

export default function RootLayout({
  children,
}
) {
  return (
    <main>
      
    
        {children}


      
    
    </main>
  );
}