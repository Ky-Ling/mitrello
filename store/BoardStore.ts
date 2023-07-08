import { create } from 'zustand';
import { TypedColumn, Todo, Board, Column } from '@/typings';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { databases, storage, ID } from '@/appwrite';
import uploadImage from '@/lib/uploadImage';
import { data } from 'autoprefixer';

interface BoardState {
	loading: boolean;
	board: Board;
	setLoading: (loading: boolean) => void;
	getBoard: () => void;
	setBoardState: (board: Board) => void;
	updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
	newTaskInput: string;
	setNewTaskInput: (input: string) => void;

	newTaskType: TypedColumn;
	setNewTaskType: (columnId: TypedColumn) => void;

	image: File | null;
	setImage: (image: File | null) => void;

	searchString: string;
	setSearchString: (searchString: string) => void;

	deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
	addTask: (todo: string, columnId: TypedColumn, image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
	board: {
		columns: new Map<TypedColumn, Column>(),
	},
	loading: false,
	searchString: '',
	newTaskInput: '',
	newTaskType: 'todo',
	image: null,
	setLoading: (loading) => set({ loading }),
	setSearchString(searchString) {
		set({ searchString });
	},
	getBoard: async () => {
		const board: any = await getTodosGroupedByColumn();
		set({ board });
	},
	setBoardState: (board) => set({ board }),

	deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
		set({ loading: true });
		const newColumns = new Map(get().board.columns);

		// delete todoId from newColumns
		newColumns.get(id)?.todos.splice(taskIndex, 1);

		set({ board: { columns: newColumns } });

		if (todo.image) {
			await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
		}

		await databases.deleteDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			todo.$id
		);
		set({ loading: false });
	},

	setNewTaskInput: (input: string) => set({ newTaskInput: input }),
	setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

	setImage: (image: File | null) => set({ image }),

	updateTodoInDB: async (todo, columnId) => {
		await databases.updateDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			todo.$id,
			{
				title: todo.title,
				status: columnId,
			}
		);
	},

	addTask: async (todo: string, columnId: TypedColumn, image: File | null) => {
		// let file: Image | undefined;
		let file: any | undefined;
		set({ loading: true });

		if (image) {
			const fileUploaded = await uploadImage(image);

			if (fileUploaded) {
				file = {
					bucketId: fileUploaded.bucketId!,
					fileId: fileUploaded.$id,
				};
			}
		}

		const { $id } = await databases.createDocument(
			process.env.NEXT_PUBLIC_DATABASE_ID!,
			process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
			ID.unique(),
			{
				title: todo,
				status: columnId,
				// include image if it is exist
				...(file && { image: JSON.stringify(file) }),
			}
		);

		set({ newTaskInput: '' });
		set((state) => {
			const newColumns = new Map(state.board.columns);

			const newTodo: Todo = {
				$id,
				$createdAt: new Date().toISOString(),
				title: todo,
				status: columnId,
				...(file && { image: file }),
			};

			const column = newColumns.get(columnId);

			if (!column) {
				newColumns.set(columnId, {
					id: columnId,
					todos: [newTodo],
				});
			} else {
				newColumns.get(columnId)?.todos.push(newTodo);
			}

			set({ loading: false });
			return {
				board: {
					columns: newColumns,
				},
			};
		});
	},
}));
