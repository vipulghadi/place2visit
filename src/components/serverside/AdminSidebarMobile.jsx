import React from 'react';
import { Home, FileText, Settings, LogOut } from 'lucide-react'; // Import Lucide icons
import Link from 'next/link'; // Import Next.js Link for navigation

function AdminSidebarMobile() {
  return (
    <div className="w-auto rounded-full bg-green-600 text-white flex p-2">
    
          <Link href="/admin/dashboard" className="block hover:bg-green-900 py-2 px-4 rounded-full">
            <Home size={24} /> {/* Home icon */}
          </Link>
    
        
          <Link href="/admin/blogs" className="block hover:bg-gray-700 py-2 px-4 rounded">
            <FileText size={24} /> {/* FileText icon */}
          </Link>
    
    
          <Link href="/admin/settings" className="block hover:bg-gray-700 py-2 px-4 rounded">
            <Settings size={24} /> {/* Settings icon */}
          </Link>
    
    
          <Link href="/logout" className="block hover:bg-gray-700 py-2 px-4 rounded">
            <LogOut size={24} /> {/* LogOut icon */}
          </Link>
    
     
    </div>
  );
}

export default AdminSidebarMobile;
