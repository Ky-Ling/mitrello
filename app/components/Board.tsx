import React from 'react';
import { DragDropContext, Droppable, DraggableId } from 'react-beautiful-dnd';

const Board: React.FC = () => {
	return (
		<DragDropContext>
			<Droppable droppableId="board" direction="horizontal" type='column'>
        {  (provided) => (
          <div>
            
          </div>
        )}
      </Droppable>
		</DragDropContext>
	);
};

export default Board;
