import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiInsightCard } from "@/components/ai-insight-card";
import { dataQuality } from "@/lib/mock-data";
import { Database, PhoneOff, AlertTriangle, ShieldAlert, Copy, Gauge, Download, Wrench, Eye } from "lucide-react";

export const Route = createFileRoute("/data-quality")({
  head: () => ({ meta: [{ title: "Data Quality · Artur Lead Hub" }] }),
  component: DataQualityPage,
});

function DataQualityPage() {
  const d = dataQuality;
  return (
    <>
      <PageHeader
        title="Data Quality"
        description="Imported from your dialer. See how clean your telemarketing data really is."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export Report</Button>
            <Button size="sm" className="gap-2"><Wrench className="h-4 w-4" />Improve Data Quality</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Dialed" value={d.totalDialed.toLocaleString()} icon={<Database className="h-4 w-4" />} tone="info" />
        <StatCard label="Bad Numbers" value={d.badNumbers} insight="Marked invalid by dialer" icon={<PhoneOff className="h-4 w-4" />} tone="warning" />
        <StatCard label="Wrong Numbers" value={d.wrongNumbers} icon={<AlertTriangle className="h-4 w-4" />} tone="warning" />
        <StatCard label="Disconnected" value={d.disconnected.toLocaleString()} insight="Largest source of bad data" icon={<PhoneOff className="h-4 w-4" />} />
        <StatCard label="DNC Contacts" value={d.dnc} icon={<ShieldAlert className="h-4 w-4" />} />
        <StatCard label="Duplicates" value={d.duplicates} icon={<Copy className="h-4 w-4" />} />
        <StatCard label="Contact Accuracy" value={`${d.contactAccuracy}%`} icon={<Gauge className="h-4 w-4" />} tone="success" />
        <StatCard label="Lead Quality" value={`${d.leadQuality}%`} icon={<Gauge className="h-4 w-4" />} tone="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Data quality breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Segment label="Good Data" value={d.breakdown.good} color="bg-success" />
              <Segment label="Bad Data" value={d.breakdown.bad} color="bg-destructive" />
              <Segment label="Needs Cleaning" value={d.breakdown.cleaning} color="bg-warning" />
              <Segment label="Unknown" value={d.breakdown.unknown} color="bg-muted-foreground/60" />
            </div>
            <div className="mt-6 flex h-3 rounded-full overflow-hidden">
              <div className="bg-success" style={{ width: `${d.breakdown.good}%` }} />
              <div className="bg-destructive" style={{ width: `${d.breakdown.bad}%` }} />
              <div className="bg-warning" style={{ width: `${d.breakdown.cleaning}%` }} />
              <div className="bg-muted-foreground/60" style={{ width: `${d.breakdown.unknown}%` }} />
            </div>
          </CardContent>
        </Card>

        <AiInsightCard title="What's happening">
          18% of your uploaded data appears inaccurate, mostly due to disconnected and wrong numbers. Cleaning this list would lift your contact accuracy from 78% to an estimated 91%.
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs"><Eye className="h-3.5 w-3.5" />View Bad Data</Button>
          </div>
        </AiInsightCard>
      </div>
    </>
  );
}

function Segment({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-sm ${color}`} />
          <span>{label}</span>
        </div>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`${color} h-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
