import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { appointments } from "@/lib/mock-data";
import { Copy, Edit, CheckCircle2, Eye, Calendar, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/appointments")({
  head: () => ({ meta: [{ title: "Appointments · Artur Lead Hub" }] }),
  component: AppointmentsPage,
});

const tabs = ["All", "Confirmed", "Pending Confirmation", "Rescheduled", "Completed", "Canceled", "No-show"];

function AppointmentsPage() {
  const [tab, setTab] = useState("All");
  const visible = tab === "All" ? appointments : appointments.filter((a) => a.status === tab);

  return (
    <>
      <PageHeader
        title="Appointments"
        description="Track every qualified real-estate appointment from booking to close."
        action={<Button size="sm">+ New Appointment</Button>}
      />

      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visible.map((a) => (
          <Card key={a.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.customer}</h3>
                    <StatusBadge status={a.type} variant="new" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{a.phone}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.address}</span>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>

              <div className="rounded-lg bg-muted/40 p-3 mb-3 text-xs flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{a.date}</span>
                <span className="text-muted-foreground">· {a.appointmentType}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <Field k="Property Interest" v={a.propertyInterest} />
                <Field k="Budget" v={a.budget} />
                <Field k="Location" v={a.location} />
                <Field k="Timeline" v={a.timeline} />
                <Field k="Financing" v={a.financing} />
                <Field k="Agent" v={a.agentName} />
              </div>

              {a.notes && <p className="text-xs text-muted-foreground italic mb-4">"{a.notes}"</p>}

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Copy className="h-3.5 w-3.5" />Copy Card</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Edit className="h-3.5 w-3.5" />Edit</Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"><CheckCircle2 className="h-3.5 w-3.5" />Mark Confirmed</Button>
                <Button size="sm" variant="ghost" className="gap-1.5 text-xs"><Eye className="h-3.5 w-3.5" />View Lead</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{k}</div>
      <div className="font-medium text-foreground">{v}</div>
    </div>
  );
}
