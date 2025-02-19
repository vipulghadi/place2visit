'use client';

import { Toaster } from 'react-hot-toast';
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import AdminSidebarMobile from "../../components/AdminSidebarMobile";

export default function RootLayout({ children }) {
  return (
    <main className="flex w-screen relative">
      {/* Add Toaster for toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <AdminNavbar />

      <div className="sm:hidden absolute left-0 bottom-3 z-50 flex justify-center items-center w-screen">
        <AdminSidebarMobile />
      </div>

      <div className="flex w-screen mt-16 h-[calc(100vh-50px)]">
        <div className="sm:w-2/12 sm:block hidden bg-green-600 text-white  h-full overflow-y-auto border-r-2">
          <AdminSidebar />
        </div>

        <div className="sm:w-10/12 w-full overflow-y-scroll">
          {children}
        </div>
      </div>
    </main>
  );
}
