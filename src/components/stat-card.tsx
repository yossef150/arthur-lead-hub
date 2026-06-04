import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  insight?: string;
  delta?: { value: string; positive?: boolean };
  icon?: ReactNode;
  tone?: "default" | "success" | "warning" | "info" | "ai";
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "bg-muted text-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
  info: "bg-info/15 text-info",
  ai: "bg-ai-soft text-ai",
};

export function StatCard({ label, value, insight, delta, icon, tone = "default" }: StatCardProps) {
  return (
    <Card className="border-border/70 hover:shadow-sm transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-semibold mt-1.5">{value}</p>
          </div>
          {icon && (
            <div className={`h-9 w-9 rounded-lg grid place-items-center ${toneClasses[tone]}`}>
              {icon}
            </div>
          )}
        </div>
        {(insight || delta) && (
          <div className="mt-3 flex items-center justify-between gap-2">
            {insight && <p className="text-xs text-muted-foreground leading-snug">{insight}</p>}
            {delta && (
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${delta.positive ? "text-success" : "text-destructive"}`}>
                {delta.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {delta.value}
              </span>
            )}
          </div>
        )}
        <button className="mt-3 inline-flex items-center gap-1 text-[11px] text-ai hover:underline">
          <Sparkles className="h-3 w-3" /> Why this?
        </button>
      </CardContent>
    </Card>
  );
}
