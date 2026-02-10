"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Check } from "lucide-react";

export default function SMSSignup() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", phone, name }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <Check className="h-12 w-12 text-green-500 mx-auto mb-3" />
        <h3 className="font-semibold text-green-800">You&apos;re subscribed!</h3>
        <p className="text-green-600 text-sm">You&apos;ll receive updates from MIC Utah</p>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-8 w-8 text-primary" />
        <div>
          <h3 className="font-semibold">Get SMS Updates</h3>
          <p className="text-sm text-gray-600">Prayer times, events & announcements</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="(801) 555-1234"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing..." : "Subscribe to SMS"}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Msg & data rates may apply. Reply STOP to unsubscribe.
      </p>
    </div>
  );
}
