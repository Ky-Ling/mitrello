'use client';

import { Todo, TypedColumn } from '@/typings';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import {
	DraggableProvidedDraggableProps,
	DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface TodoCardProps {
	todo: Todo;
	index: number;
	id: TypedColumn;
	innerRef: (element: HTMLElement | null) => void;
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: React.FC<TodoCardProps> = ({
	todo,
	index,
	id,
	innerRef,
	draggableProps,
	dragHandleProps,
}) => {
	return (
		<div
			className="bg-white rounded-md space-y-2 drop-shadow-md"
			{...dragHandleProps}
			{...draggableProps}
			ref={innerRef}
		>
			<div className="flex justify-between items-center p-5">
				<p className="">{todo.title}</p>
				<button className=" text-red-500 hover:text-red-600">
					<XCircleIcon className="ml-5 h-8 w-8" />
				</button>
			</div>
		</div>
	);
};

export default TodoCard;
