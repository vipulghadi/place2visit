"use client";

import React, { useState } from "react";
import { Eye, BarChart, Calendar, FileText } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Example data
const totalViews = 12500;
const monthViews = 3400;
const dailyAvgClicks = (monthViews / 30).toFixed(2);
const totalBlogs = 120;
const monthBlogs = 8;

const viewData = [
  { month: "Jan", views: 1500 },
  { month: "Feb", views: 1800 },
  { month: "Mar", views: 2200 },
  { month: "Apr", views: 2600 },
  { month: "May", views: 3000 },
  { month: "Jun", views: 3400 },
];

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

function StatsCard({ icon: Icon, label, value, color }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          icon={Eye}
          label="Total Blog Views"
          value={totalViews.toLocaleString()}
          color="bg-blue-500"
        />
        <StatsCard 
          icon={Calendar}
          label="This Month's Views"
          value={monthViews.toLocaleString()}
          color="bg-green-500"
        />
        <StatsCard 
          icon={BarChart}
          label="Daily Avg Clicks"
          value={dailyAvgClicks}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatsCard 
          icon={FileText}
          label="Total Blogs"
          value={totalBlogs}
          color="bg-purple-500"
        />
        <StatsCard 
          icon={FileText}
          label="Blogs Written This Month"
          value={monthBlogs}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Month</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Views Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-muted" 
                />
                <XAxis 
                  dataKey="month" 
                  className="text-sm" 
                />
                <YAxis 
                  className="text-sm"
                  width={40}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{
                    fill: "hsl(var(--primary))",
                    strokeWidth: 2
                  }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;