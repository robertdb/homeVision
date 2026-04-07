import { useState } from 'react';
import type { AuditState } from '@/components/audit-history/types';
import type { House } from '@/features/house';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AuditStatusBadge } from './audit-status-badge';

const priceFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

interface HouseCardProps {
  house: House;
  auditState: AuditState;
  onApprove: () => void;
  onReject: () => void;
}

export const HouseCard = ({ 
  house, 
  auditState,
  onApprove,
  onReject
}: HouseCardProps) => {
  const [photoFailed, setPhotoFailed] = useState(false);
  const isPending = auditState === 'pending';

  return (
    <Card className="h-full min-w-0 w-full pt-0">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-xl">
      {photoFailed ? (
        <div
          className="bg-muted text-muted-foreground flex aspect-4/3 w-full items-center justify-center text-sm"
          role="img"
          aria-label="Photo unavailable"
        >
          No photo
        </div>
      ) : (
        <img
          src={house.photoURL}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-4/3 w-full object-cover"
          onError={() => setPhotoFailed(true)}
        />
      )}
      
      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex flex-col justify-between p-2',
          isPending && 'pb-0',
        )}
        >
        <div className="pointer-events-auto flex flex-wrap gap-2 self-start">
          <AuditStatusBadge state={auditState} />
        </div>
        {isPending ? (
            <div className="pointer-events-auto -mx-2 -mb-px mt-auto flex flex-wrap gap-2 rounded-b-xl bg-gradient-to-t from-black/80 via-black/50 to-transparent px-2 pb-2 pt-10">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="shadow-md"
                onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="shadow-md"
                onClick={onReject}
              >
                Reject
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <CardHeader className="border-b-0 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-sm font-semibold p-4">
            {priceFmt.format(house.price)}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 min-h-11 text-base leading-snug">
          {house.address}
        </CardTitle>
        <CardDescription>{house.homeowner}</CardDescription>
      </CardHeader>
    </Card>
  );
};
