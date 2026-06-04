import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Variant = "valid" | "invalid" | "review" | "new" | "followup" | "bad" | "neutral" | "success" | "warning";

const map: Record<Variant, string> = {
  valid: "bg-success/15 text-success border-success/30",
  success: "bg-success/15 text-success border-success/30",
  invalid: "bg-destructive/15 text-destructive border-destructive/30",
  review: "bg-warning/25 text-warning-foreground border-warning/40",
  warning: "bg-warning/25 text-warning-foreground border-warning/40",
  new: "bg-info/15 text-info border-info/30",
  followup: "bg-ai-soft text-ai border-ai/30",
  bad: "bg-muted text-muted-foreground border-border",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, variant }: { status: string; variant?: Variant }) {
  const v: Variant = variant ?? inferVariant(status);
  return (
    <Badge variant="outline" className={cn("font-medium rounded-full border", map[v])}>
      {status}
    </Badge>
  );
}

function inferVariant(s: string): Variant {
  const k = s.toLowerCase();
  if (["valid", "qualified", "confirmed", "completed", "approved", "paid"].some((x) => k.includes(x))) return "valid";
  if (["invalid", "unqualified", "canceled", "no-show", "rejected"].some((x) => k.includes(x))) return "invalid";
  if (["review", "pending", "rescheduled"].some((x) => k.includes(x))) return "review";
  if (k.includes("new")) return "new";
  if (k.includes("follow")) return "followup";
  if (k.includes("bad")) return "bad";
  return "neutral";
}
