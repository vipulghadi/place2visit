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

export default function SubscribeDialog({ planId = 1, planType = "monthly" }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/client/subscriptions/create-quiz-subscription/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxNjExMDc3LCJpYXQiOjE3NDA3NDcwNzcsImp0aSI6ImQwODY0ZjkzOTQyNzQ4ODNhNDY3MjFhMTRlODc1N2MwIiwidXNlcl9pZCI6ImNlOTkwYzM3LWE0YmUtNDcxMy04NzUyLWE3MThlYjA0ZDQ5ZCJ9.JJZlsLJqfGGPX4tedK8xT35I9pdF8G0y6zCaPPj2VKo",
                    "Cookie": "sessionid=s7ihy3shgr8vp6swkhlfyhjp6xy0rayb; temp_user_id=cd99efd8-69cc-4e6d-9540-cc76a4b843be"
                },
                body: JSON.stringify({
                    plan_id: planId,
                    plan_type: planType,
                    payment_method: "card",
                    name: name,
                    email: email
                }),
                credentials: "include"
            });

            if (!response.ok) throw new Error("Failed to create subscription order");
            const data = await response.json();

            setMessage("Order created! Please complete payment in the popup.");
            console.log("Order Response:", data);

            // Reset form and close dialog after a delay
            setName("");
            setEmail("");
            setTimeout(() => setOpen(false), 2000);
        } catch (error) {
            setMessage("Error: " + error.message);
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-600">Subscribe Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Subscribe for More Article Updates</DialogTitle>
                    <DialogDescription>
                        Enter your details to receive updates on new articles via email.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-green-600 hover:bg-green-600">Submit</Button>
                    </DialogFooter>
                </form>
                {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
            </DialogContent>
        </Dialog>
    );
}
