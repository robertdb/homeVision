import type { AuditHouseRecord } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function RowThumb({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="size-12 shrink-0 rounded-md object-cover"
      loading="lazy"
      decoding="async"
    />
  );
}

function StatusBadge({ status }: { status: 'approved' | 'rejected' }) {
  return status === 'approved' ? (
    <Badge className="border-0 bg-green-600/15 text-green-800 dark:bg-green-500/20 dark:text-green-200">
      Approved
    </Badge>
  ) : (
    <Badge className="border-0 bg-red-600/90 text-white dark:bg-red-600 dark:text-white">
      Rejected
    </Badge>
  );
}

type AuditHistoryTableProps = {
  data: AuditHouseRecord[];
  removeById: (id: number) => void;
};

export function AuditHistoryTable({ data, removeById }: AuditHistoryTableProps) {
  if (!data.length) {
    return null;
  }

  return (
    <ul
      className="max-h-[min(50vh,360px)] min-w-0 divide-y divide-border overflow-y-auto rounded-md border border-border"
      role="list"
    >
      {data.map((row) => (
        <li key={row.id} className="flex gap-3 p-3" role="listitem">
          <RowThumb src={row.photoURL} />
          <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <p className="min-w-0 flex-1 break-words text-sm leading-snug font-medium md:py-0.5">
              {row.address}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:shrink-0">
              <StatusBadge status={row.status} />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => removeById(row.id)}
              >
                Undo
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
