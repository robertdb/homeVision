import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { House } from '@/features/house';
import type { AuditDecision, AuditHouseRecord, AuditState } from './types';
import { getAuditStateFromRecords } from './utils';

type AuditHistoryState = {
  history: AuditHouseRecord[];
  getAuditState: (id: number) => AuditState;
  decide: (house: House, status: AuditDecision) => void;
  removeById: (id: number) => void;
  resetAll: () => void;
};

const useAuditHistoryStore = create<AuditHistoryState>((set, get) => ({
  history: [],
  getAuditState: (id) => getAuditStateFromRecords(get().history, id),
  decide: (house, status) => {
    const updatedAt = new Date().toISOString();
    set((state) => {
      const next = state.history.filter((r) => r.id !== house.id);
      next.push({ ...house, status, updatedAt });
      return { history: next };
    });
  },
  removeById: (id) =>
    set((state) => ({
      history: state.history.filter((r) => r.id !== id),
    })),
  resetAll: () => set({ history: [] }),
}));

export function useAuditHistory() {
  return useAuditHistoryStore(
    useShallow((state) => ({
      history: state.history,
      getAuditState: state.getAuditState,
      decide: state.decide,
      removeById: state.removeById,
      resetAll: state.resetAll,
    })),
  );
}
