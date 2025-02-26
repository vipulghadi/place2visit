import React from 'react';
import { Clipboard, Edit, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin/dashboard',
      icon: Clipboard,
      label: 'Dashboard'
    },
    {
      href: '/admin/blogs',
      icon: Edit,
      label: 'Blogs'
    },
    {
      href: '/admin/settings',
      icon: Settings,
      label: 'Settings'
    },
    {
      href: '/admin/generate-blog',
      icon: LogOut,
      label: 'Generate Blog'
    }
  ];

  return (
    <Card className="h-full w-64  rounded-none">
      <CardContent className="p-0">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block"
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-accent"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}

export default AdminSidebar;