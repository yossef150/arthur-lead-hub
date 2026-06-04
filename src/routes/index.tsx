import { createFileRoute, Link } from "@tanstack/react-router";
import { useRole } from "@/lib/role-context";
import { PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/stat-card";
import { AiInsightCard } from "@/components/ai-insight-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle2, XCircle, PhoneCall, Clock, DollarSign, TrendingUp, Gauge, Target, MessageSquareText, FileText, Sparkles, ArrowRight } from "lucide-react";
import { agents, leads } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Artur Lead Hub" },
      { name: "description", content: "Telemarketing performance, lead validation, and team coaching in one dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { role } = useRole();
  return role === "Admin" ? <AdminDashboard /> : <AgentDashboard />;
}

function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Welcome back, Arthur"
        description="Here's how your telemarketing team is performing this week."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export report</Button>
            <Button size="sm">Run AI review</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Leads" value={63} insight="14% above last week" tone="info" icon={<Users className="h-4 w-4" />} delta={{ value: "+14%", positive: true }} />
        <StatCard label="Valid Appointments" value={39} insight="74% pass AI validation" tone="success" icon={<CheckCircle2 className="h-4 w-4" />} delta={{ value: "+8%", positive: true }} />
        <StatCard label="Invalid Leads" value={11} insight="Mostly missing budget data" tone="warning" icon={<XCircle className="h-4 w-4" />} />
        <StatCard label="Total Calls" value={"1,464"} insight="612 answered (42%)" tone="info" icon={<PhoneCall className="h-4 w-4" />} />
        <StatCard label="Worked Hours" value={180} insight="Across 5 active agents" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Estimated Payroll" value={"$4,182"} insight="Includes $940 in bonuses" icon={<DollarSign className="h-4 w-4" />} tone="success" />
        <StatCard label="Avg Performance" value={"79"} insight="Sofia leads at 92" tone="ai" icon={<Gauge className="h-4 w-4" />} delta={{ value: "+5", positive: true }} />
        <StatCard label="Data Accuracy" value={"78%"} insight="18% disconnected numbers" tone="warning" icon={<Target className="h-4 w-4" />} delta={{ value: "-3%", positive: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Team Performance</CardTitle>
              <Link to="/call-performance"><Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowRight className="h-3 w-3" /></Button></Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground border-y bg-muted/30">
                    <tr>
                      <th className="text-left font-medium px-5 py-2.5">Agent</th>
                      <th className="text-right font-medium px-3 py-2.5">Leads</th>
                      <th className="text-right font-medium px-3 py-2.5">Valid</th>
                      <th className="text-right font-medium px-3 py-2.5">Calls</th>
                      <th className="text-right font-medium px-3 py-2.5">Conv.</th>
                      <th className="text-right font-medium px-3 py-2.5">Hours</th>
                      <th className="text-right font-medium px-5 py-2.5">Est. Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((a) => (
                      <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">{a.initials}</div>
                            <div>
                              <div className="font-medium">{a.name}</div>
                              <div className="text-xs text-muted-foreground">Score {a.performanceScore}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right px-3">{a.leadsSubmitted}</td>
                        <td className="text-right px-3"><span className="text-success font-medium">{a.validLeads}</span></td>
                        <td className="text-right px-3">{a.calls}</td>
                        <td className="text-right px-3">{a.conversionRate}%</td>
                        <td className="text-right px-3">{a.workedHours}h</td>
                        <td className="text-right px-5 font-medium">${(a.workedHours * a.hourlyRate + a.bonus - a.deductions).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <AiInsightCard title="Team insight">
            Ryan submitted 14 leads this week, with 9 passing AI validation. Sofia's qualification rate jumped from 58% to 71% — replicate her discovery script.
          </AiInsightCard>
          <Card>
            <CardHeader><CardTitle className="text-base">This week's targets</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TargetRow label="Valid appointments" value={39} max={50} />
              <TargetRow label="Conversion rate" value={62} max={70} suffix="%" />
              <TargetRow label="Data accuracy" value={78} max={90} suffix="%" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent leads</CardTitle>
          <Link to="/leads"><Button variant="ghost" size="sm" className="gap-1 text-xs">All leads <ArrowRight className="h-3 w-3" /></Button></Link>
        </CardHeader>
        <CardContent className="p-0 divide-y">
          {leads.slice(0, 4).map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center text-xs font-medium">{l.type[0]}</div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{l.customer} <span className="text-xs text-muted-foreground ml-1">· {l.id}</span></div>
                  <div className="text-xs text-muted-foreground truncate">{l.agentName} · {l.type} · {l.updated}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={l.status} />
                <Link to="/leads/$leadId" params={{ leadId: l.id }}>
                  <Button size="sm" variant="ghost">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function TargetRow({ label, value, max, suffix = "" }: { label: string; value: number; max: number; suffix?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}{suffix} <span className="text-muted-foreground font-normal">/ {max}{suffix}</span></span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}

function AgentDashboard() {
  const agent = agents[0];
  return (
    <>
      <PageHeader
        title={`Hey ${agent.name.split(" ")[0]}, here's your day`}
        description="Submit leads, track your conversions, and stay on top of your coaching feedback."
        action={
          <div className="flex gap-2">
            <Link to="/leads"><Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4" />View My Leads</Button></Link>
            <Button size="sm" className="gap-2"><Sparkles className="h-4 w-4" />Submit New Lead</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="My Leads Today" value={4} insight="2 still under review" tone="info" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Valid Appointments" value={9} insight="64% pass rate" tone="success" icon={<CheckCircle2 className="h-4 w-4" />} delta={{ value: "+3", positive: true }} />
        <StatCard label="My Call Count" value={312} insight="6h 42m talk time" icon={<PhoneCall className="h-4 w-4" />} />
        <StatCard label="Conversion Rate" value={"64%"} insight="Team avg is 58%" tone="success" icon={<TrendingUp className="h-4 w-4" />} delta={{ value: "+6%", positive: true }} />
        <StatCard label="Coaching Notes" value={3} insight="1 unread" tone="ai" icon={<MessageSquareText className="h-4 w-4" />} />
        <StatCard label="Estimated Pay" value={"$904"} insight="38h × $18 + $220 bonus" icon={<DollarSign className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AiInsightCard title="You're almost there">
            You're close to your weekly target. Two more valid appointments will put you ahead of the team average and unlock the tier-2 bonus.
          </AiInsightCard>

          <Card>
            <CardHeader><CardTitle className="text-base">Your recent leads</CardTitle></CardHeader>
            <CardContent className="p-0 divide-y">
              {leads.filter((l) => l.agentId === agent.id).concat(leads.slice(0, 3)).slice(0, 5).map((l) => (
                <div key={l.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{l.customer}</div>
                    <div className="text-xs text-muted-foreground">{l.type} · {l.updated}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={l.status} />
                    <Link to="/leads/$leadId" params={{ leadId: l.id }}><Button size="sm" variant="ghost">Open</Button></Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Latest coaching</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">From Arthur · Today</div>
                <p className="text-sm mt-1">Great energy on the intro. Confirm budget and timeline earlier to qualify the lead faster.</p>
                <Link to="/coaching"><Button variant="link" size="sm" className="px-0 h-auto mt-1">Read all notes</Button></Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Today's targets</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TargetRow label="Calls" value={48} max={70} />
              <TargetRow label="Valid leads" value={2} max={4} />
              <TargetRow label="Talk time (min)" value={92} max={150} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
