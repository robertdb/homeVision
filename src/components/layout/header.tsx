import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuditDialog } from '@/components/audit-history';

const HEADER_DESCRIPTION =
  'Ensure all property details make sense together. Cross-reference the image with the price, owner, and address to approve or reject the entry. Each decision is logged by property ID and can be exported.';

export const Header = () => {
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mb-8 bg-zinc-100/95 py-3">
      <div className="flex flex-col gap-3 px-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 w-full sm:flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            HomeVision Validation Session
          </h1>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {HEADER_DESCRIPTION}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full shrink-0 cursor-pointer border-zinc-900 bg-zinc-900 text-white hover:border-zinc-800 hover:bg-zinc-800 hover:text-white focus-visible:ring-zinc-400 sm:w-auto"
          onClick={() => setAuditDialogOpen(true)}
          aria-label="Open audit history dialog"
        >
          Manage & Export Decisions
        </Button>
      </div>
      <AuditDialog open={auditDialogOpen} onOpenChange={setAuditDialogOpen}/>
    </header>
  );
};
