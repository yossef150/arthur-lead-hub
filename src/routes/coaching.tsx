import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coachingNotes } from "@/lib/mock-data";
import { Plus, Send, Sparkles, ThumbsUp, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/coaching")({
  head: () => ({ meta: [{ title: "Coaching Notes · Artur Lead Hub" }] }),
  component: CoachingPage,
});

const categories = ["All", "Pitch", "Discovery", "Objection", "Closing"];

function CoachingPage() {
  const [cat, setCat] = useState("All");
  const visible = cat === "All" ? coachingNotes : coachingNotes.filter((n) => n.category === cat);

  return (
    <>
      <PageHeader
        title="Coaching Notes"
        description="Share targeted, actionable feedback with your agents."
        action={<Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add Coaching Note</Button>}
      />

      <div className="flex flex-wrap gap-3 mb-5">
        <Input placeholder="Filter by agent…" className="max-w-xs" />
        <Input type="date" className="max-w-[180px]" />
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visible.map((n) => (
          <Card key={n.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground grid place-items-center font-semibold text-sm">
                    {n.agentName.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{n.agentName}</div>
                    <div className="text-xs text-muted-foreground">From {n.coachName} · {n.date} · {n.related}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={n.category} variant="new" />
                  {n.shared ? <StatusBadge status="Shared" variant="success" /> : <StatusBadge status="Draft" variant="neutral" />}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="rounded-lg border border-success/30 bg-success/10 p-3">
                  <div className="text-xs font-semibold text-success flex items-center gap-1 mb-1"><ThumbsUp className="h-3 w-3" />Strengths</div>
                  <p className="text-sm">{n.strengths}</p>
                </div>
                <div className="rounded-lg border border-warning/30 bg-warning/10 p-3">
                  <div className="text-xs font-semibold text-warning-foreground flex items-center gap-1 mb-1"><AlertCircle className="h-3 w-3" />Areas to improve</div>
                  <p className="text-sm">{n.improve}</p>
                </div>
              </div>

              {n.script !== "—" && (
                <div className="rounded-lg bg-muted/50 border border-dashed p-3 mb-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Suggested script</div>
                  <p className="text-sm italic leading-relaxed">"{n.script}"</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-1.5 text-xs"><Send className="h-3.5 w-3.5" />Send to Agent</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" />Discuss with AI</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
