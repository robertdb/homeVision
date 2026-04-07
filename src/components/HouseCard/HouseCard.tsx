import { useState } from 'react';
import type { House } from '@/features/house';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const priceFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

interface HouseCardProps {
  house: House;
}

export const HouseCard = ({ house }: HouseCardProps) => {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
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
