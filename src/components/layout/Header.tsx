import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuditDialog } from '@/components/audit-history';

const HEADER_DESCRIPTION =
  'Manually verify each property: check the image against price, owner, and address, then approve or reject. Your calls are tracked per listing ID for export and downstream review.';

export const Header = () => {
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mb-8 bg-zinc-100/95 py-3">
      <div className="flex flex-col gap-3 px-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 w-full sm:flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            HomeVision Audit Pipeline
          </h1>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {HEADER_DESCRIPTION}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full shrink-0 sm:w-auto"
          onClick={() => setAuditDialogOpen(true)}
        >
          Review & export decisions
        </Button>
      </div>
      <AuditDialog open={auditDialogOpen} onOpenChange={setAuditDialogOpen}/>
    </header>
  );
};
