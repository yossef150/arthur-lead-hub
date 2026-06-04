import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/stat-card";
import { AiInsightCard } from "@/components/ai-insight-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { agents, callPerformance } from "@/lib/mock-data";
import { PhoneCall, PhoneIncoming, Clock, CalendarCheck, Percent, Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/call-performance")({
  head: () => ({ meta: [{ title: "Call Performance · Artur Lead Hub" }] }),
  component: CallPerformancePage,
});

function CallPerformancePage() {
  return (
    <>
      <PageHeader title="Call Performance" description="Imported from CallTools dialer. Updated every 15 minutes." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Calls" value={callPerformance.totalCalls.toLocaleString()} icon={<PhoneCall className="h-4 w-4" />} tone="info" />
        <StatCard label="Answered Calls" value={callPerformance.answered} insight="42% answer rate" icon={<PhoneIncoming className="h-4 w-4" />} tone="success" />
        <StatCard label="Talk Time" value={callPerformance.talkTime} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Appointments Booked" value={callPerformance.appointmentsBooked} icon={<CalendarCheck className="h-4 w-4" />} tone="success" delta={{ value: "+12%", positive: true }} />
        <StatCard label="Valid Appt. Rate" value={`${callPerformance.validAppointmentRate}%`} icon={<Percent className="h-4 w-4" />} tone="ai" />
        <StatCard label="Calls / Appointment" value={callPerformance.callsPerAppointment} icon={<Target className="h-4 w-4" />} />
        <StatCard label="Conversion Rate" value={`${callPerformance.conversionRate}%`} icon={<TrendingUp className="h-4 w-4" />} tone="success" delta={{ value: "+5%", positive: true }} />
        <StatCard label="Avg Performance" value={79} icon={<TrendingUp className="h-4 w-4" />} tone="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Call volume by day</CardTitle></CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </div>
        <AiInsightCard title="What we're seeing">
          Agents with higher talk time (over 5h/day) are generating <strong>2.3×</strong> more valid appointments this week. Marcus is at 4h 51m — push to 6h to lift his conversion rate.
        </AiInsightCard>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Agent comparison</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-y bg-muted/30">
                <tr>
                  <th className="text-left font-medium px-5 py-2.5">Agent</th>
                  <th className="text-right font-medium px-3 py-2.5">Calls</th>
                  <th className="text-right font-medium px-3 py-2.5">Leads</th>
                  <th className="text-right font-medium px-3 py-2.5">Valid Leads</th>
                  <th className="text-right font-medium px-3 py-2.5">Conversion</th>
                  <th className="text-right font-medium px-3 py-2.5">Talk Time</th>
                  <th className="text-left font-medium px-5 py-2.5">Performance Score</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium">{a.name}</td>
                    <td className="text-right px-3">{a.calls}</td>
                    <td className="text-right px-3">{a.leadsSubmitted}</td>
                    <td className="text-right px-3 text-success font-medium">{a.validLeads}</td>
                    <td className="text-right px-3">{a.conversionRate}%</td>
                    <td className="text-right px-3">{a.talkTime}</td>
                    <td className="px-5 py-3 w-[220px]">
                      <div className="flex items-center gap-3">
                        <Progress value={a.performanceScore} className="h-2 flex-1" />
                        <span className="text-xs font-semibold w-8 text-right">{a.performanceScore}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function BarChart() {
  const days = [
    { d: "Mon", v: 220 }, { d: "Tue", v: 280 }, { d: "Wed", v: 310 },
    { d: "Thu", v: 260 }, { d: "Fri", v: 295 }, { d: "Sat", v: 99 }, { d: "Sun", v: 0 },
  ];
  const max = Math.max(...days.map((d) => d.v));
  return (
    <div className="flex items-end gap-4 h-48 pt-2">
      {days.map((d) => (
        <div key={d.d} className="flex-1 flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground">{d.v}</div>
          <div className="w-full bg-muted rounded-md overflow-hidden flex flex-col justify-end" style={{ height: "140px" }}>
            <div
              className="bg-gradient-to-t from-primary to-info rounded-md transition-all"
              style={{ height: `${(d.v / max) * 100}%` }}
            />
          </div>
          <div className="text-xs font-medium">{d.d}</div>
        </div>
      ))}
    </div>
  );
}
