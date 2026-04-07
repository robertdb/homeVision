import { useAuditHistoryStore } from './useAuditHistory';

const house = {
  id: 1,
  address: '1 Main St',
  homeowner: 'A',
  price: 100000,
  photoURL: 'https://example.com/x.jpg',
};

describe('useAuditHistoryStore', () => {
  beforeEach(() => {
    useAuditHistoryStore.setState({ history: [] });
  });

  it('starts empty with pending audit state for unknown ids', () => {
    expect(useAuditHistoryStore.getState().history).toEqual([]);
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('pending');
    expect(useAuditHistoryStore.getState().getAuditState(99)).toBe('pending');
  });

  it('records approve and exposes approved state', () => {
    useAuditHistoryStore.getState().decide(house, 'approved');
    expect(useAuditHistoryStore.getState().history).toHaveLength(1);
    expect(useAuditHistoryStore.getState().history[0]).toMatchObject({
      id: 1,
      status: 'approved',
    });
    expect(useAuditHistoryStore.getState().history[0].updatedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T/,
    );
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('approved');
  });

  it('records reject and exposes rejected state', () => {
    useAuditHistoryStore.getState().decide(house, 'rejected');
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('rejected');
  });

  it('replaces the row when deciding again for the same house id', () => {
    useAuditHistoryStore.getState().decide(house, 'approved');
    useAuditHistoryStore.getState().decide(house, 'rejected');
    expect(useAuditHistoryStore.getState().history).toHaveLength(1);
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('rejected');
  });

  it('removeById drops the record and state returns to pending', () => {
    useAuditHistoryStore.getState().decide(house, 'approved');
    useAuditHistoryStore.getState().removeById(1);
    expect(useAuditHistoryStore.getState().history).toEqual([]);
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('pending');
  });

  it('resetAll clears history', () => {
    useAuditHistoryStore.getState().decide(house, 'approved');
    useAuditHistoryStore.getState().decide(
      { ...house, id: 2 },
      'rejected',
    );
    useAuditHistoryStore.getState().resetAll();
    expect(useAuditHistoryStore.getState().history).toEqual([]);
    expect(useAuditHistoryStore.getState().getAuditState(1)).toBe('pending');
  });
});
