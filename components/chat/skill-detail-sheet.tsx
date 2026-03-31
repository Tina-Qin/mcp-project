"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSkillDetail, type ResolvedSkill } from "@/lib/skill-registry";
import { cn } from "@/lib/utils";

type SkillDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: ResolvedSkill[];
};

function DetailBody({ detailKey }: { detailKey: string }) {
  const d = getSkillDetail(detailKey);
  if (!d) {
    return (
      <p className="text-muted-foreground text-sm">No detail config for this Skill.</p>
    );
  }
  return (
    <div className="space-y-4 text-sm">
      <p className="text-foreground/90 leading-relaxed">{d.description}</p>
      <section>
        <h4 className="mb-1.5 font-medium text-foreground">Inputs</h4>
        <ul className="text-muted-foreground list-inside list-disc space-y-1">
          {d.inputs.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-1.5 font-medium text-foreground">Outputs</h4>
        <ul className="text-muted-foreground list-inside list-disc space-y-1">
          {d.outputs.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-1.5 font-medium text-foreground">Data sources</h4>
        <ul className="text-muted-foreground list-inside list-disc space-y-1">
          {d.dataSources.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-1.5 font-medium text-foreground">Sample MCP config</h4>
        <pre
          className={cn(
            "max-h-48 overflow-auto rounded-md border border-border/60 bg-muted/50 p-3 font-mono text-xs leading-relaxed",
          )}
        >
          {d.mcpSnippet}
        </pre>
      </section>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {d.repositoryUrl ? (
          <Link
            href={d.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline-offset-4 hover:underline"
          >
            Repository
          </Link>
        ) : null}
        {d.documentationUrl ? (
          <Link
            href={d.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline-offset-4 hover:underline"
          >
            Docs / site
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function SkillDetailSheet({
  open,
  onOpenChange,
  skills,
}: SkillDetailSheetProps) {
  const firstId = skills[0]?.skillId ?? "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-lg"
      >
        <SheetHeader className="text-left">
          <SheetTitle>Skill details</SheetTitle>
          <SheetDescription>
            Capability summary and MCP install snippet; full docs are linked below.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-6">
          {skills.length <= 1 ? (
            <DetailBody detailKey={skills[0]?.detailKey ?? ""} />
          ) : (
            <Tabs defaultValue={firstId} className="w-full">
              <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1">
                {skills.map((s) => (
                  <TabsTrigger
                    key={s.skillId}
                    value={s.skillId}
                    className="text-xs"
                  >
                    {s.displayName}
                  </TabsTrigger>
                ))}
              </TabsList>
              {skills.map((s) => (
                <TabsContent key={s.skillId} value={s.skillId}>
                  <DetailBody detailKey={s.detailKey} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
