import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { leads } from "@/lib/mock-data";
import { Search, Filter, Phone, MapPin, Sparkles, Edit, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Leads · Artur Lead Hub" }] }),
  component: LeadsPage,
});

const filters = ["All", "New", "Under Review", "Valid", "Invalid", "Needs Follow-up", "Bad Data"];

function LeadsPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? leads : leads.filter((l) => l.status === active);

  return (
    <>
      <PageHeader
        title="Leads"
        description="Manage every lead your team has submitted and see its AI validation result."
        action={<Button size="sm">+ New Lead</Button>}
      />

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, phone, or lead ID…" className="pl-9" />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" />Filters</Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${active === f ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visible.map((l) => (
          <Card key={l.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{l.customer}</h3>
                    <span className="text-xs text-muted-foreground">{l.id}</span>
                    <StatusBadge status={l.type} variant="new" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{l.phone}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{l.address}</span>
                  </div>
                </div>
                <StatusBadge status={l.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <KV k="Agent" v={l.agentName} />
                <KV k="Validation" v={l.validation} />
                <KV k="Confidence" v={`${l.confidence}%`} />
                <KV k="Appointment" v={l.appointmentDate ?? "—"} />
              </div>

              <div className="rounded-lg bg-ai-soft/60 border border-ai/20 p-3 text-xs mb-4">
                <div className="flex items-center gap-1 text-ai font-semibold mb-0.5"><Sparkles className="h-3 w-3" />AI says</div>
                <p className="text-foreground/85 leading-snug">{l.aiNotes}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link to="/leads/$leadId" params={{ leadId: l.id }}>
                  <Button size="sm" variant="default" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" />View Details</Button>
                </Link>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Edit className="h-3.5 w-3.5" />Edit</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" />Send to AI</Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-xs"><MessageSquare className="h-3.5 w-3.5" />Add Note</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{k}</div>
      <div className="font-medium text-foreground">{v}</div>
    </div>
  );
}
