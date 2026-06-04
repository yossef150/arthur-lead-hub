import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Artur Lead Hub" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace, team, and AI preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        <Card>
          <CardHeader><CardTitle className="text-base">Workspace</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Workspace name</Label>
              <Input defaultValue="Artur Lead Hub" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Time zone</Label>
              <Input defaultValue="America/Chicago (CDT)" className="mt-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">AI preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Row label="Auto-validate new leads" desc="Run AI validation as soon as a lead is submitted." defaultChecked />
            <Row label="Surface coaching opportunities" desc="Get nudges when an agent's calls show a pattern." defaultChecked />
            <Row label="Daily team summary" desc="Email Arthur a morning recap at 8:00 AM." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Dialer integration</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="font-medium">CallTools</div>
                <div className="text-xs text-muted-foreground">Connected · Last sync 12 min ago</div>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="font-medium">Other dialer</div>
                <div className="text-xs text-muted-foreground">Add a custom webhook integration</div>
              </div>
              <Button size="sm" variant="outline">Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Payroll</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Default hourly rate</Label>
              <Input defaultValue="$18.00" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Per valid appointment bonus</Label>
              <Input defaultValue="$25.00" className="mt-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Row({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
