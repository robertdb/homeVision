import { Badge } from '@/components/ui/badge';

interface Props {
  state: unknown;
}

export const AuditStatusBadge = ({ state }: Props) => {
  if (state === 'pending') {
    return (
      <Badge
        variant="outline"
        className="border-white/40 bg-background/85 text-foreground shadow-sm backdrop-blur-sm"
      >
        Pending
      </Badge>
    );
  }
  if (state === 'approved') {
    return (
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Approved
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
      Rejected
    </Badge>
  );
}