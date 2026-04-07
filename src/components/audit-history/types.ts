import type { House } from '@/features/house';

export type AuditDecision = 'approved' | 'rejected';

export type AuditHouseRecord = House & {
  status: AuditDecision;
  updatedAt: string;
};

export type AuditState = 'pending' | 'approved' | 'rejected';
