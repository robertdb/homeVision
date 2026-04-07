import { buildAuditCsv, getAuditStateFromRecords } from './utils';

const row = {
  id: 1,
  address: '1 Main',
  homeowner: 'A',
  price: 1,
  photoURL: 'x',
  status: 'approved' as const,
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('auditHelpers', () => {
  describe('getAuditStateFromRecords', () => {
    it('returns pending when id is missing', () => {
      expect(getAuditStateFromRecords([], 1)).toBe('pending');
      expect(getAuditStateFromRecords([row], 99)).toBe('pending');
    });

    it('returns approved or rejected', () => {
      expect(getAuditStateFromRecords([row], 1)).toBe('approved');
      expect(
        getAuditStateFromRecords([{ ...row, id: 2, status: 'rejected' }], 2),
      ).toBe('rejected');
    });
  });

  describe('buildAuditCsv', () => {
    it('builds header and one row per record', () => {
      expect(buildAuditCsv([])).toBe('id,status,updated_at');
      expect(buildAuditCsv([row])).toBe(
        'id,status,updated_at\n1,approved,2026-01-01T00:00:00.000Z',
      );
    });
  });
});
