import type React from 'react';
import {useDroppable} from '@dnd-kit/core';
import './Droppable.css';

export function Droppable(props: {id: string; children: React.ReactNode}) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`droppable ${isOver ? 'droppable-over' : ''}`}
    >
      {props.children}
    </div>
  );
}