'use client';

import { Todo, TypedColumn } from '@/typings';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
	DraggableProvidedDraggableProps,
	DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import getUrl from '@/lib/getUrl';
import Image from 'next/image';

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
	const [loading, deleteTask] = useBoardStore((state) => [
		state.loading,
		state.deleteTask,
	]);

	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleDeleteTask = () => {
		const deleteToastId = toast.loading('Deleting task...');

		deleteTask(index, todo, id);

		if (!loading)
			toast.success('Delete successfully', {
				id: deleteToastId,
			});
	};

	useEffect(() => {
		if (todo.image) {
			const fetchImage = async () => {
				const url = await getUrl(todo.image!);

				if (url) {
					setImageUrl(url.toString());
				}
			};
			fetchImage();
		}
	}, [todo]);

	return (
		<div
			className="bg-white rounded-md space-y-2 drop-shadow-md"
			{...dragHandleProps}
			{...draggableProps}
			ref={innerRef}
		>
			<div className="flex justify-between items-center p-5">
				<p className="">{todo.title}</p>
				<button
					onClick={handleDeleteTask}
					className=" text-red-500 hover:text-red-600"
				>
					<XCircleIcon className="ml-5 h-8 w-8" />
				</button>
			</div>

			{imageUrl && (
				<div className="h-full w-full rounded-b-md">
					<Image
						src={imageUrl}
						alt="Task image"
						width={400}
						height={200}
						className="w-full object-contain rounded-b-md"
					/>
				</div>
			)}
		</div>
	);
};

export default TodoCard;
