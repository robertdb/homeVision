import type { House } from '@/types/house'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface HouseCardProps {
  house: House
}

export const HouseCard = ({ house }: HouseCardProps) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <img
        src={house.photoURL}
        alt=""
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader className="border-b-0 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono text-sm font-semibold p-4">
            {house.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            })}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {house.address}
        </CardTitle>
        <CardDescription>{house.homeowner}</CardDescription>
      </CardHeader>
    </Card>
  )
}
