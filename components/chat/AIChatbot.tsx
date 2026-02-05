"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What are today's prayer times?",
  "How do I get to the masjid?",
  "Is the masjid open 24/7?",
  "How can I sponsor an Iftar?",
];

// Simple response generator (would use AI API in production)
function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("prayer") && (q.includes("time") || q.includes("when"))) {
    return "Prayer times vary daily based on the sun's position. You can view the current schedule on our Prayer Times page. Today's approximate times are: Fajr 6:15 AM, Dhuhr 1:00 PM, Asr 4:15 PM, Maghrib 6:00 PM, Isha 7:30 PM. Visit /prayer-times for the exact times.";
  }

  if (q.includes("direction") || q.includes("location") || q.includes("address") || q.includes("where")) {
    return "Masjid Madina is located at 1773 West North Temple, Salt Lake City, UT 84116. We're near the SLC Airport and right off I-80. Click 'Get Directions' on our homepage or visit our Contact page for navigation links.";
  }

  if (q.includes("24") || q.includes("open") || q.includes("hour")) {
    return "Yes! Masjid Madina is open 24 hours a day, 7 days a week. Whether you're a local or a traveler passing through, you can always come in for prayers. Our office has regular hours (Mon-Fri 9am-5pm), but the prayer hall is always accessible.";
  }

  if (q.includes("iftar") || q.includes("sponsor")) {
    return "You can sponsor an Iftar during Ramadan for $150, which provides a complete meal for 50+ community members. Visit our Ramadan > Iftar Sponsorship page to select a date and make your contribution. Your name can be announced at Iftar or you can remain anonymous.";
  }

  if (q.includes("ramadan")) {
    return "Our Ramadan programs include daily Iftar, Taraweeh prayers (20 rakaat) at 9:00 PM, and special Qiyam ul-Layl during the last 10 nights. You can also sponsor an Iftar or make Ramadan donations through our website. Visit /ramadan for more details.";
  }

  if (q.includes("donate") || q.includes("donation") || q.includes("zakat")) {
    return "We accept various types of donations including Zakat, Sadaqah, and general contributions. You can donate online through our Donate page (/donate), in person, or by mail. All donations are tax-deductible. We also have special Ramadan donation campaigns.";
  }

  if (q.includes("parking") || q.includes("truck")) {
    return "Yes! We have a large parking lot that can accommodate big rigs and commercial vehicles. Many truck drivers stop here while traveling on I-80. We're conveniently located near Love's Truck Stop.";
  }

  if (q.includes("jummah") || q.includes("friday")) {
    return "Jummah (Friday) prayers are held at 1:00 PM and 2:00 PM. The khutbah (sermon) starts about 30 minutes before each prayer. We recommend arriving early to get a spot, as Jummah can be well-attended.";
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("email")) {
    return "You can reach us by phone at (801) 555-1234 (office hours: 9am-5pm) or email at info@masjidmadina.org. For general inquiries, you can also use the contact form on our Contact page.";
  }

  return "Thank you for your question! For specific inquiries, I recommend visiting our relevant pages or contacting the masjid directly at (801) 555-1234 or info@masjidmadina.org. You can also visit our Contact page to send a message. Is there anything else I can help with?";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Assalamu Alaikum! I'm here to help you with questions about Masjid Madina. You can ask about prayer times, directions, events, donations, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = generateResponse(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isOpen
            ? "bg-gray-500 hover:bg-gray-600"
            : "bg-primary hover:bg-primary-light"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] shadow-xl">
          <CardHeader className="bg-primary text-white rounded-t-xl py-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              Masjid Madina Assistant
            </CardTitle>
            <p className="text-sm text-white/70">
              Ask me anything about our masjid
            </p>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-cream hover:bg-cream-dark px-3 py-1.5 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                For specific Islamic rulings, please consult our Imam directly.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
