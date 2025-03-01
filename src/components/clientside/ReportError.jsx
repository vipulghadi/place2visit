"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ReportErrorDialog() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [blogName, setBlogName] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage("Submitting...");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/client/report-error/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    message: message,
                    blog_name: blogName
                })
            });

            if (!response.ok) throw new Error("Failed to submit error report");
            const data = await response.json();

            setResponseMessage("Error report submitted successfully!");
            console.log("Report Response:", data);

            // Reset form and close dialog after a delay
            setEmail("");
            setMessage("");
            setBlogName("");
            setTimeout(() => setOpen(false), 2000);
        } catch (error) {
            setResponseMessage("Error: " + error.message);
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-red-600 bg-red-100">Report Error</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Report an Error</DialogTitle>
                    <DialogDescription>
                        Let us know about any issues you encountered.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="reportEmail" className="text-sm font-medium">Email</label>
                            <Input
                                id="reportEmail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="blogName" className="text-sm font-medium">Blog Name</label>
                            <Input
                                id="blogName"
                                value={blogName}
                                onChange={(e) => setBlogName(e.target.value)}
                                placeholder="e.g., Place2Visit"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Describe the error..."
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
                {responseMessage && <p className="mt-2 text-sm text-gray-600">{responseMessage}</p>}
            </DialogContent>
        </Dialog>
    );
}