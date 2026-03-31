"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ResolvedSkill } from "@/lib/skill-registry";

type SkillUsedCardProps = {
  skills: ResolvedSkill[];
  onViewDetails: () => void;
  onInstall: () => void;
};

function SkillFacts({ s }: { s: ResolvedSkill }) {
  const tools = s.sourceToolNames.join(", ");

  return (
    <dl className="text-muted-foreground mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
      <dt className="text-muted-foreground/90 shrink-0">Skill package</dt>
      <dd className="min-w-0 font-mono text-[13px] text-foreground/90">
        {s.agentsSkillPackage}
      </dd>
      <dt className="text-muted-foreground/90 shrink-0">Tools used</dt>
      <dd className="min-w-0 font-mono text-[13px] text-foreground/90 break-all">
        {tools}
      </dd>
      <dt className="text-muted-foreground/90 shrink-0">MCP</dt>
      <dd className="min-w-0 text-[13px] text-foreground/90">
        <span className="font-mono">{s.mcpServerKey}</span>
        <span className="text-muted-foreground"> · </span>
        <span className="break-all font-mono">{s.mcpEndpointUrl}</span>
      </dd>
    </dl>
  );
}

export function SkillUsedCard({
  skills,
  onViewDetails,
  onInstall,
}: SkillUsedCardProps) {
  if (skills.length === 0) return null;

  return (
    <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span className="text-muted-foreground shrink-0">Skills used:</span>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <Badge
              key={s.skillId}
              variant="secondary"
              className="font-mono text-xs font-normal"
            >
              {s.displayName}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-3 border-t border-border/40 pt-2">
        {skills.map((s) => (
          <div key={s.skillId}>
            {skills.length > 1 ? (
              <p className="text-muted-foreground mb-1 text-xs font-medium">
                {s.displayName}
              </p>
            ) : null}
            <SkillFacts s={s} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-border/40 pt-2">
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-xs text-blue-400"
          onClick={onViewDetails}
        >
          View details
        </Button>
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-xs text-blue-400"
          onClick={onInstall}
        >
          Install in my Agent
        </Button>
      </div>
    </div>
  );
}
