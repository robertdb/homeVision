import type { AuditHouseRecord, AuditState } from './types';

export function getAuditStateFromRecords(
  records: AuditHouseRecord[],
  id: number,
): AuditState {
  const row = records.find((r) => r.id === id);
  if (row == null) return 'pending';
  return row.status === 'approved' ? 'approved' : 'rejected';
}

export function buildAuditCsv(history: AuditHouseRecord[]): string {
  const lines = ['id,status,updated_at'];
  for (const r of history) {
    lines.push(`${r.id},${r.status},${r.updatedAt}`);
  }
  return lines.join('\n');
}

export function downloadAuditCsv(history: AuditHouseRecord[]): void {
  if (typeof document === 'undefined') return;

  const body = `\uFEFF${buildAuditCsv(history)}`;
  const blob = new Blob([body], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `hv-audit-export-${new Date().toISOString().slice(0, 10)}.csv`;
  a.rel = 'noopener';
  a.click();
  
  URL.revokeObjectURL(url);
}
