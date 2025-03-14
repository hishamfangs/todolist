import type React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props: { id: any; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(0, ${transform.y}px, 0)`,
  } : undefined;

  
  // return (
  //   <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
  //     {props.children}
  //   </button>
  // );
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}