import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, CalendarCheck, PhoneCall, Sparkles, MessageSquareText, Database, Wallet, Settings, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck },
  { to: "/call-performance", label: "Call Performance", icon: PhoneCall },
  { to: "/ai-validation", label: "AI Validation", icon: Sparkles },
  { to: "/coaching", label: "Coaching Notes", icon: MessageSquareText },
  { to: "/data-quality", label: "Data Quality", icon: Database },
  { to: "/payroll", label: "Payroll", icon: Wallet },
  { to: "/ai-chat", label: "AI Assistant", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-5 h-16 border-b">
        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">A</div>
        <div className="leading-tight">
          <div className="font-semibold text-sm">Artur Lead Hub</div>
          <div className="text-[11px] text-muted-foreground">Telemarketing OS</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t">
        <div className="rounded-lg bg-ai-soft text-ai-foreground p-3 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-ai">
            <Sparkles className="h-3.5 w-3.5" /> AI Insight
          </div>
          <p className="mt-1 text-muted-foreground leading-snug">
            Sofia's qualification rate is up 12% this week. Share her L-1042 call as a training example.
          </p>
        </div>
      </div>
    </aside>
  );
}
