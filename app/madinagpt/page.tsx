"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, BookOpen, Moon, Heart, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  { text: "How do I perform Wudu?", icon: "💧" },
  { text: "What is the reward of fasting?", icon: "🌙" },
  { text: "Tell me about Laylatul Qadr", icon: "✨" },
  { text: "Dua for breaking fast", icon: "🤲" },
  { text: "How to pray Salah?", icon: "🕌" },
  { text: "What are the pillars of Islam?", icon: "📖" },
  { text: "Benefits of reading Quran", icon: "📿" },
  { text: "Who are the Prophets?", icon: "🌟" },
];

export default function MadinaGPTPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create placeholder for streaming response
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + text }
                : msg
            )
          );
        }
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: "Assalamu alaikum, I'm having a moment of difficulty. Please try again 🤲" }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-emerald-950 via-emerald-900 to-black overflow-auto">
      {/* Header */}
      <div className="border-b border-emerald-800/50 bg-emerald-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-3">
            <span className="text-4xl">🕌</span>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Madina<span className="text-emerald-400">GPT</span>
              </h1>
              <p className="text-emerald-300/80 text-sm">
                Authentic Islamic Knowledge • Quran & Sahih Hadith
              </p>
            </div>
            </div>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome State */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-6">
                <span className="text-5xl">📖</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Assalamu Alaikum! 🌙
              </h2>
              <p className="text-emerald-200/80 max-w-xl mx-auto text-lg">
                Welcome! I&apos;m here to share the beauty of Islam with you 💚 Ask me anything 
                about the <strong>Quran</strong>, <strong>Hadith</strong>, prayer times, 
                or life at MIC Utah. Let&apos;s learn together!
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700/30">
                <BookOpen className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Quran & Hadith</h3>
                <p className="text-emerald-300/60 text-sm">Authentic sources only</p>
              </div>
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700/30">
                <Moon className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Sunni Scholarship</h3>
                <p className="text-emerald-300/60 text-sm">4 Madhabs respected</p>
              </div>
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700/30">
                <Heart className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">MIC Utah</h3>
                <p className="text-emerald-300/60 text-sm">Prayer times & events</p>
              </div>
            </div>

            {/* Suggested Questions */}
            <div>
              <p className="text-emerald-400 text-sm font-medium mb-4">Try asking:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => handleSuggestedQuestion(q.text)}
                    className="flex items-center gap-2 bg-emerald-800/40 hover:bg-emerald-700/50 text-emerald-100 px-4 py-2 rounded-full text-sm transition-colors border border-emerald-700/30"
                  >
                    <span>{q.icon}</span>
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-6 pb-32">
            {messages.filter(m => m.content || m.role === "user").map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-lg">🕌</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${
                    message.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-sm"
                      : "bg-emerald-900/50 text-emerald-50 rounded-bl-sm border border-emerald-700/30"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-lg">👤</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <span className="text-lg">🕌</span>
                </div>
                <div className="bg-emerald-900/50 rounded-2xl rounded-bl-sm px-5 py-4 border border-emerald-700/30">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
                    <span className="text-emerald-300">Bismillah... ✨</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-gradient-to-t from-emerald-950 via-emerald-950 to-transparent pt-8 pb-6 pb-safe">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Islam, Quran, Hadith, or MIC Utah..."
              className="flex-1 h-14 rounded-full bg-emerald-900/50 border-emerald-700/50 text-white placeholder:text-emerald-400/50 px-6 text-lg focus:border-emerald-500 focus:ring-emerald-500"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="text-center text-emerald-600 text-xs mt-3">
            📖 Quran & Sahih Hadith only • Ahl as-Sunnah • Consult Imam for fatawa
          </p>
        </div>
      </div>
    </div>
  );
}
