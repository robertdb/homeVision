import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmAlert } from '@/components/ui/confirm-alert';
import { downloadAuditCsv } from './utils';
import { AuditHistoryTable } from './audit-list';
import { useAuditHistory } from './useAuditHistory';

type AuditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type PendingConfirm = null | 'reset' | 'export';

export function AuditDialog({ open, onOpenChange }: AuditDialogProps) {
  const { history, removeById, resetAll } = useAuditHistory();
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null);

  const handleDialogOpenChange = (next: boolean) => {
    if (!next) setPendingConfirm(null);
    onOpenChange(next);
  };

  const approved = history.filter((r) => r.status === 'approved').length;
  const rejected = history.filter((r) => r.status === 'rejected').length;
  const total = history.length;

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[85vh] min-w-0 w-[min(100%,calc(100vw-2rem))] max-w-lg overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Audit history</DialogTitle>
            <DialogDescription>
              Audit data stays only in this browser for this session export CSV
              before you close or refresh. Undo removes a row and sets that listing
              back to pending.
            </DialogDescription>
          </DialogHeader>

          <p className="text-foreground text-sm font-medium">
            Total processed: {total}{' '}
            <span className="text-muted-foreground font-normal">
              ({approved} OK / {rejected} Error)
            </span>
          </p>

          {total === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              No audited listings yet.
            </p>
          ) : (
            <AuditHistoryTable data={history} removeById={removeById} />
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between sm:gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={total === 0}
              onClick={() => setPendingConfirm('export')}
              aria-label="Export audit history as CSV"
            >
              Export CSV
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={total === 0}
              onClick={() => setPendingConfirm('reset')}
              aria-label="Reset all audit history entries"
            >
              Reset all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {pendingConfirm !== null ? (
        <ConfirmAlert
          open
          onOpenChange={(next) => {
            if (!next) setPendingConfirm(null);
          }}
          title={
            pendingConfirm === 'reset'
              ? 'Clear all audit history?'
              : 'Export audit log as CSV?'
          }
          description={
            pendingConfirm === 'reset'
              ? 'This removes every approved and rejected row from this session. It cannot be undone.'
              : `A CSV file with ${total} row${total === 1 ? '' : 's'} (listing ID and status) will download. Share it with your team so they can analyze the audit results.

When you confirm, this session ends and all audit reviews are removed from this browser.`
          }
          confirmLabel={pendingConfirm === 'reset' ? 'Clear all' : 'Export CSV'}
          cancelLabel="Cancel"
          confirmVariant={pendingConfirm === 'reset' ? 'destructive' : 'default'}
          onConfirm={() => {
            if (pendingConfirm === 'reset') {
              resetAll();
            } else {
              downloadAuditCsv(history);
              resetAll();
              handleDialogOpenChange(false);
            }
          }}
        />
      ) : null}
    </>
  );
}
