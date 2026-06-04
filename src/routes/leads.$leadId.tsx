import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { leads } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { AiInsightCard } from "@/components/ai-insight-card";
import { ArrowLeft, Phone, MapPin, CheckCircle2, XCircle, MessageSquare, Sparkles, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/leads/$leadId")({
  head: ({ params }) => ({ meta: [{ title: `Lead ${params.leadId} · Artur Lead Hub` }] }),
  loader: ({ params }) => {
    const lead = leads.find((l) => l.id === params.leadId);
    if (!lead) throw notFound();
    return { lead };
  },
  component: LeadDetailsPage,
});

function LeadDetailsPage() {
  const { lead } = Route.useLoaderData();
  return (
    <>
      <Link to="/leads" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to leads
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-semibold tracking-tight">{lead.customer}</h2>
            <StatusBadge status={lead.status} />
            <StatusBadge status={lead.type} variant="new" />
          </div>
          <div className="text-sm text-muted-foreground mt-2 flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{lead.phone}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{lead.address}</span>
            <span>Lead {lead.id} · Updated {lead.updated}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2"><XCircle className="h-4 w-4" />Reject</Button>
          <Button variant="outline" size="sm" className="gap-2"><MessageSquare className="h-4 w-4" />Request Follow-up</Button>
          <Button size="sm" className="gap-2"><CheckCircle2 className="h-4 w-4" />Approve Lead</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Lead Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
              <Field k="Lead Type" v={lead.type} />
              <Field k="Property Interest" v={lead.propertyInterest} />
              <Field k="Budget Range" v={lead.budget} />
              <Field k="Preferred Area" v={lead.area} />
              <Field k="Timeline" v={lead.timeline} />
              <Field k="Financing" v={lead.financing} />
              <Field k="Motivation" v={lead.motivation} />
              <Field k="Appointment Type" v={lead.appointmentType} />
              <Field k="Assigned Agent" v={lead.agentName} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Agent Notes</CardTitle></CardHeader>
              <CardContent className="text-sm text-foreground/90 leading-relaxed">{lead.agentNotes}</CardContent>
            </Card>
            <Card className="border-ai/30 bg-ai-soft/40">
              <CardHeader><CardTitle className="text-base text-ai flex items-center gap-1.5"><Sparkles className="h-4 w-4" />AI Notes</CardTitle></CardHeader>
              <CardContent className="text-sm text-foreground/90 leading-relaxed">{lead.aiNotes}</CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">Call Summary</CardTitle></CardHeader>
            <CardContent className="text-sm text-foreground/90">{lead.callSummary}</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Coaching Feedback</CardTitle></CardHeader>
            <CardContent className="text-sm text-foreground/90">{lead.coaching}</CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-ai/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ai" />AI Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground">Validation Status</div>
                <div className="mt-1"><StatusBadge status={lead.validation} /></div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="font-semibold">{lead.confidence}%</span>
                </div>
                <Progress value={lead.confidence} className="h-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Reasoning</div>
                <p className="text-sm leading-snug">{lead.aiNotes}</p>
              </div>
              {lead.issues.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />Potential Issues</div>
                  <ul className="space-y-1">
                    {lead.issues.map((i: string) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning mt-1.5 shrink-0" />{i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <div className="text-xs text-muted-foreground mb-1">Recommended Action</div>
                <p className="text-sm leading-snug">{lead.recommendation}</p>
              </div>
            </CardContent>
          </Card>

          <AiInsightCard title="Discuss with AI">
            Ask follow-up questions about this lead — for example, "what's missing to qualify?" or "what should the agent improve?"
          </AiInsightCard>
        </div>
      </div>
    </>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{k}</div>
      <div className="font-medium mt-0.5">{v}</div>
    </div>
  );
}
