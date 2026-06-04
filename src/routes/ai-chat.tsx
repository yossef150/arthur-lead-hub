import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({ meta: [{ title: "AI Assistant · Artur Lead Hub" }] }),
  component: AiChatPage,
});

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "ai", text: "Hi Arthur — I have full context on this week's leads, agent performance, coaching notes, and dialer data. What would you like to explore?" },
  { role: "user", text: "Why was lead L-1039 marked invalid?" },
  { role: "ai", text: "Lead L-1039 (Trevor Kim) was marked invalid because no budget, area, or timeline were captured during the 3-minute call. Confidence was 38%. I'd recommend moving him to the nurture campaign and coaching Marcus to confirm at least 3 of the 4 qualifiers before booking." },
];

const suggestions = [
  "Which agent needs coaching this week?",
  "What caused the drop in valid appointments?",
  "How can we improve data quality?",
  "How was Sofia's payroll calculated?",
];

function AiChatPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "Looking at your data… (this is a prototype response — the AI assistant will pull live insights from leads, calls, coaching, and payroll in production.)" },
    ]);
    setInput("");
  }

  return (
    <>
      <PageHeader
        title="AI Assistant"
        description="Context-aware. Ask anything about your team, leads, calls, or payroll."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
          <CardContent className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-lg shrink-0 grid place-items-center ${m.role === "ai" ? "bg-ai text-ai-foreground" : "bg-accent text-accent-foreground"}`}>
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[80%] ${m.role === "ai" ? "bg-ai-soft/60 border border-ai/20" : "bg-primary text-primary-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about leads, agents, payroll, data quality…"
            />
            <Button onClick={() => send(input)} className="gap-1.5"><Send className="h-4 w-4" />Send</Button>
          </div>
        </Card>

        <div className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Try asking</div>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="w-full text-left rounded-lg border bg-card hover:bg-muted/40 p-3 text-sm transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-ai inline mr-1.5" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
