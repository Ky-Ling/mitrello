'use client';

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DraggableId } from 'react-beautiful-dnd';

const Board: React.FC = () => {
	const getBoard = useBoardStore((state) => state.getBoard);

	useEffect(() => {
		getBoard();
	}, [getBoard]);
	return (
		<h1>sss</h1>
		// <DragDropContext>
		// 	<Droppable droppableId="board" direction="horizontal" type="column">
		// 		{(provided) => <div></div>}
		// 	</Droppable>
		// </DragDropContext>
	);
};

export default Board;
