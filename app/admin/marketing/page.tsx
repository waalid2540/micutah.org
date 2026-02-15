"use client";

import { useEffect, useState } from "react";
import { 
  Send, MessageSquare, Phone, Users, RefreshCw, Lock,
  CheckCircle, XCircle, AlertCircle, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ADMIN_PASSWORD = "admin123";

interface Status {
  leadCount: number;
  smsConfigured: boolean;
  whatsappConfigured: boolean;
}

export default function MarketingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<"sms" | "whatsapp">("sms");
  const [testPhone, setTestPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Check auth
  useEffect(() => {
    const auth = sessionStorage.getItem("mic_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("mic_admin_auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Fetch status
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/sms");
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStatus();
    }
  }, [isAuthenticated]);

  // Send test message
  const sendTest = async () => {
    if (!testPhone || !message) {
      setResult({ error: "Enter phone number and message" });
      return;
    }
    
    setSending(true);
    setResult(null);
    
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          phone: testPhone,
          message,
          channel,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    }
    
    setSending(false);
  };

  // Send broadcast
  const sendBroadcast = async () => {
    if (!message) {
      setResult({ error: "Enter a message" });
      return;
    }
    
    if (!confirm(`Send "${channel.toUpperCase()}" to ${status?.leadCount} leads?\n\nMessage:\n${message}`)) {
      return;
    }
    
    setSending(true);
    setResult(null);
    
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "broadcast",
          message,
          channel,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    }
    
    setSending(false);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-white text-2xl">Marketing Admin</CardTitle>
            <p className="text-slate-400 text-sm mt-2">SMS & WhatsApp Broadcasts</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                Access Marketing
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">📣 Marketing Dashboard</h1>
          <p className="text-slate-400 mt-1">Send SMS & WhatsApp to your leads</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex items-center gap-4">
              <Users className="h-10 w-10 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Leads</p>
                <p className="text-3xl font-bold">{status?.leadCount || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex items-center gap-4">
              <Phone className={`h-10 w-10 ${status?.smsConfigured ? "text-green-400" : "text-red-400"}`} />
              <div>
                <p className="text-slate-400 text-sm">SMS</p>
                <p className="text-lg font-bold">
                  {status?.smsConfigured ? "✓ Ready" : "✗ Not configured"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 flex items-center gap-4">
              <MessageSquare className={`h-10 w-10 ${status?.whatsappConfigured ? "text-green-400" : "text-yellow-400"}`} />
              <div>
                <p className="text-slate-400 text-sm">WhatsApp</p>
                <p className="text-lg font-bold">
                  {status?.whatsappConfigured ? "✓ Ready" : "⚠ Not configured"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compose Message */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Compose Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Channel Toggle */}
            <div className="flex gap-2">
              <Button
                onClick={() => setChannel("sms")}
                className={channel === "sms" 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-slate-700 hover:bg-slate-600"}
              >
                <Phone className="h-4 w-4 mr-2" />
                SMS
              </Button>
              <Button
                onClick={() => setChannel("whatsapp")}
                className={channel === "whatsapp" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-slate-700 hover:bg-slate-600"}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-slate-400 mb-1 block">
                Message (use {"{name}"} for personalization)
              </label>
              <Textarea
                placeholder="Assalamu Alaikum {name}! 🌙 Ramadan Mubarak from MIC Utah..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500 mt-1">
                {message.length}/160 characters (SMS) • {"{name}"} will be replaced with lead&apos;s name
              </p>
            </div>

            {/* Test First */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-300 mb-3">🧪 Test first (recommended)</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your phone (e.g., 8015551234)"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white flex-1"
                />
                <Button 
                  onClick={sendTest}
                  disabled={sending}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {sending ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Send Test"}
                </Button>
              </div>
            </div>

            {/* Broadcast Button */}
            <Button
              onClick={sendBroadcast}
              disabled={sending || !message || (status?.leadCount || 0) === 0}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6"
            >
              {sending ? (
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Send className="h-5 w-5 mr-2" />
              )}
              Send to {status?.leadCount || 0} Leads
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={`border-0 ${result.error ? "bg-red-900/50" : "bg-green-900/50"}`}>
            <CardContent className="p-6">
              {result.error ? (
                <div className="flex items-center gap-3 text-red-300">
                  <XCircle className="h-6 w-6" />
                  <span>{result.error}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle className="h-6 w-6" />
                  <span>
                    {result.sent !== undefined 
                      ? `Sent to ${result.sent}/${result.total} leads (${result.failed} failed)`
                      : result.message || "Message sent!"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Setup Instructions */}
        {(!status?.smsConfigured || !status?.whatsappConfigured) && (
          <Card className="bg-amber-900/30 border-amber-700 mt-6">
            <CardHeader>
              <CardTitle className="text-amber-300 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Setup Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-100 text-sm space-y-2">
              <p>Add these to your <code className="bg-black/30 px-1 rounded">.env</code> file:</p>
              <pre className="bg-black/30 p-3 rounded text-xs overflow-x-auto">
{`TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886`}
              </pre>
              <p className="text-amber-300">
                Get credentials at <a href="https://twilio.com" target="_blank" className="underline">twilio.com</a>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          MIC Utah Admin • Marketing Dashboard
        </p>
      </div>
    </div>
  );
}
