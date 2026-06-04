import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { agents } from "@/lib/mock-data";
import { DollarSign, Trophy, Clock, CheckCircle2, Edit, Download } from "lucide-react";

export const Route = createFileRoute("/payroll")({
  head: () => ({ meta: [{ title: "Payroll · Artur Lead Hub" }] }),
  component: PayrollPage,
});

function PayrollPage() {
  const totals = agents.reduce(
    (acc, a) => {
      const total = a.workedHours * a.hourlyRate + a.bonus - a.deductions;
      return { total: acc.total + total, hours: acc.hours + a.workedHours, bonus: acc.bonus + a.bonus };
    },
    { total: 0, hours: 0, bonus: 0 },
  );
  const top = [...agents].sort((a, b) => b.workedHours * b.hourlyRate + b.bonus - (a.workedHours * a.hourlyRate + a.bonus))[0];

  return (
    <>
      <PageHeader
        title="Payroll"
        description="Total Pay = Worked Hours × Hourly Rate + Bonus − Deductions"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export Payroll</Button>
            <Button size="sm" className="gap-2"><CheckCircle2 className="h-4 w-4" />Approve All</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Payroll" value={`$${totals.total.toLocaleString()}`} icon={<DollarSign className="h-4 w-4" />} tone="success" />
        <StatCard label="Highest Paid" value={top.name.split(" ")[0]} insight={`$${(top.workedHours * top.hourlyRate + top.bonus - top.deductions).toLocaleString()}`} icon={<Trophy className="h-4 w-4" />} tone="ai" />
        <StatCard label="Pending Payments" value={3} icon={<Clock className="h-4 w-4" />} tone="warning" />
        <StatCard label="Approved Payments" value={2} icon={<CheckCircle2 className="h-4 w-4" />} tone="success" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Agent payroll this week</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-y bg-muted/30">
                <tr>
                  <th className="text-left font-medium px-5 py-2.5">Agent</th>
                  <th className="text-right font-medium px-3 py-2.5">Hours</th>
                  <th className="text-right font-medium px-3 py-2.5">Rate</th>
                  <th className="text-right font-medium px-3 py-2.5">Bonus</th>
                  <th className="text-right font-medium px-3 py-2.5">Deductions</th>
                  <th className="text-right font-medium px-3 py-2.5">Total Pay</th>
                  <th className="text-center font-medium px-3 py-2.5">Status</th>
                  <th className="text-right font-medium px-5 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a, i) => {
                  const total = a.workedHours * a.hourlyRate + a.bonus - a.deductions;
                  const status = i < 2 ? "Paid" : i < 3 ? "Approved" : "Pending";
                  return (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">{a.initials}</div>
                          <span className="font-medium">{a.name}</span>
                        </div>
                      </td>
                      <td className="text-right px-3">{a.workedHours}h</td>
                      <td className="text-right px-3">${a.hourlyRate}/h</td>
                      <td className="text-right px-3 text-success">+${a.bonus}</td>
                      <td className="text-right px-3 text-destructive">{a.deductions ? `-$${a.deductions}` : "—"}</td>
                      <td className="text-right px-3 font-semibold">${total.toLocaleString()}</td>
                      <td className="text-center px-3"><StatusBadge status={status} variant={status === "Paid" ? "success" : status === "Approved" ? "new" : "warning"} /></td>
                      <td className="text-right px-5">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2">Approve</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/30">
        <CardContent className="p-5 text-sm text-muted-foreground">
          <strong className="text-foreground">Formula:</strong> Total Pay = Worked Hours × Hourly Rate + Bonus − Deductions.
          Hours are imported from the time-tracking system. Bonuses are calculated from valid appointments × $25 plus monthly performance tier.
        </CardContent>
      </Card>
    </>
  );
}
