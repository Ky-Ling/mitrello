import { create } from 'zustand';
import { TypedColumns, Board, Column } from '@/typings';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';

interface BoardState {
	board: Board;
	getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
	board: {
		columns: new Map<TypedColumns, Column>(),
	},
	getBoard: async () => {
		const board: any = await getTodosGroupedByColumn();
		set({ board });
	},
}));
