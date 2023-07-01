export interface Board {
	columns: Map<TypedColumns, Column>;
}

interface Column {
	id: TypedColumns;
	todos: Todo[];
}

export type TypedColumn = 'todo' | 'inprogress' | 'done';

interface Todo {
	$id: string;
	$createdAt: string;
	title: string;
	status: TypedColumns;
	image?: string;
}

interface Image {
	bucketId: string;
	fileId: string;
}
