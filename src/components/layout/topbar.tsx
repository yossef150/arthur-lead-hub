import { Bell, Plus, Calendar } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const { role, setRole } = useRole();
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="md:hidden h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">A</div>
        <h1 className="text-base md:text-lg font-semibold tracking-tight">Artur Lead Hub</h1>
        <div className="hidden md:flex items-center gap-1 ml-2 rounded-full border bg-muted/50 p-0.5 text-xs">
          <button
            onClick={() => setRole("Admin")}
            className={`px-3 py-1 rounded-full transition-colors ${role === "Admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Admin View
          </button>
          <button
            onClick={() => setRole("Agent")}
            className={`px-3 py-1 rounded-full transition-colors ${role === "Agent" ? "bg-success text-success-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Agent View
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Calendar className="h-4 w-4" />
              This week
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Date range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>This week</DropdownMenuItem>
            <DropdownMenuItem>This month</DropdownMenuItem>
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Custom range…</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add Lead
        </Button>
        <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">
          {role === "Admin" ? "AR" : "RM"}
        </div>
      </div>
    </header>
  );
}
