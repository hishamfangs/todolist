import type React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props: { id: any; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.close') || target.closest('input')) {
      return;
    }
    listeners?.onPointerDown?.(e);
  };

  const style = transform ? {
    transform: `translate3d(0, ${transform.y}px, 0)`,
  } : undefined;

  const filteredListeners = {
    ...listeners,
    onPointerDown: handlePointerDown,
  };

  return (
    <div ref={setNodeRef} style={style} {...filteredListeners} {...attributes}>
      {props.children}
    </div>
  );
}