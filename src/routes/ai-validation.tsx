import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { AiInsightCard } from "@/components/ai-insight-card";
import { leads } from "@/lib/mock-data";
import { Sparkles, AlertTriangle, HelpCircle, Wrench, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/ai-validation")({
  head: () => ({ meta: [{ title: "AI Validation · Artur Lead Hub" }] }),
  component: AiValidationPage,
});

const filters = ["All", "Qualified", "Unqualified", "Needs Review", "Low Confidence", "Missing Budget", "Missing Timeline", "Missing Area", "Missing Financing"];

function AiValidationPage() {
  const [active, setActive] = useState("All");
  const visible = leads.filter((l) => {
    if (active === "All") return true;
    if (active === "Low Confidence") return l.confidence < 60;
    if (active === "Missing Budget") return l.budget === "—" || l.budget === "Not stated";
    if (active === "Missing Timeline") return l.timeline === "—" || l.timeline === "Not stated";
    if (active === "Missing Area") return l.area === "—" || l.area === "Not stated";
    if (active === "Missing Financing") return l.financing === "—";
    return l.validation === active;
  });

  return (
    <>
      <PageHeader
        title="AI Lead Validation"
        description="Every lead processed by Artur AI. Transparent reasoning, clear next actions."
        action={<Button size="sm" className="gap-2"><RefreshCw className="h-4 w-4" />Re-run all</Button>}
      />

      <AiInsightCard title="AI summary">
        Out of {leads.length} processed leads this week, <strong>{leads.filter((l) => l.validation === "Qualified").length}</strong> were qualified and <strong>{leads.filter((l) => l.validation === "Needs Review").length}</strong> need agent follow-up. The most common gap is missing budget confirmation.
      </AiInsightCard>

      <div className="flex flex-wrap gap-2 my-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${active === f ? "bg-ai text-ai-foreground border-ai" : "bg-card hover:bg-muted"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visible.map((l) => (
          <Card key={l.id} className="border-ai/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{l.customer}</h3>
                    <StatusBadge status={l.type} variant="new" />
                    <StatusBadge status={l.validation} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Agent: {l.agentName} · {l.id}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold">{l.confidence}%</span>
                </div>
                <Progress value={l.confidence} className="h-2" />
              </div>

              {l.issues.length > 0 && (
                <div className="rounded-lg bg-warning/10 border border-warning/30 p-3 mb-3 text-xs">
                  <div className="flex items-center gap-1 text-warning-foreground font-semibold mb-1.5">
                    <AlertTriangle className="h-3 w-3" />Detected issues
                  </div>
                  <ul className="space-y-0.5">
                    {l.issues.map((i) => (
                      <li key={i} className="flex items-start gap-1.5"><span className="h-1 w-1 rounded-full bg-warning mt-1.5 shrink-0" />{i}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-lg bg-ai-soft/60 border border-ai/20 p-3 mb-4 text-xs">
                <div className="flex items-center gap-1 text-ai font-semibold mb-1"><Sparkles className="h-3 w-3" />AI recommendation</div>
                <p className="text-foreground/90 leading-snug">{l.recommendation}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><HelpCircle className="h-3.5 w-3.5" />Why rejected?</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><AlertTriangle className="h-3.5 w-3.5" />What's missing?</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Wrench className="h-3.5 w-3.5" />How to fix?</Button>
                <Link to="/leads/$leadId" params={{ leadId: l.id }}><Button size="sm" variant="ghost" className="text-xs">Open lead</Button></Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
