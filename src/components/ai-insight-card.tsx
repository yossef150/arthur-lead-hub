import { Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type ReactNode } from "react";

export function AiInsightCard({ title = "AI Insight", children, action }: { title?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card className="border-ai/30 bg-ai-soft/60">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-ai text-ai-foreground grid place-items-center shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm text-ai">{title}</h3>
              <button className="text-xs text-ai inline-flex items-center hover:underline">
                Discuss with AI <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-1.5 text-sm text-foreground/90 leading-relaxed">{children}</div>
            {action && <div className="mt-3">{action}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
