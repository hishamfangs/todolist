import type React from "react";
import { useEffect, useRef, useState } from "react"
import type { ToDoListItemType, ToDoListType, StoreStatus } from "../types"
import { ToDoListItem } from "./ToDoListItem"
import TextareaAutosize from 'react-textarea-autosize';
import { DateComponent } from "./DateComponent"
import { DndContext, useDndMonitor } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

import { Draggable } from '../dragndrop/Draggable';
import { Droppable } from '../dragndrop/Droppable';
import { Spinner } from './Spinner';

type ToDoListProps = {
	toDoList: ToDoListType
	status: StoreStatus
	addStatus: StoreStatus
	removeItemStatus: StoreStatus
	addNewListItem: (listId: string, name: string) => void
	onRemoveItem: (listId: string, itemId: string) => void
	onUpdateDescription: (listId: string, description: string) => void
	onToggleItem: (listId: string, itemId: string, completed: boolean) => void
	onReorder: (listId: string, orderedItems: ToDoListItemType[]) => void
}

export const ToDoList = ({
	toDoList, status, addStatus, removeItemStatus,
	addNewListItem, onRemoveItem, onUpdateDescription, onToggleItem, onReorder,
}: ToDoListProps) => {
	const [description, setDescription] = useState(toDoList?.description ?? '');
	const [removeItemId, setRemoveItemId] = useState('');
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [overIndex, setOverIndex] = useState<number | null>(null);

	// Insert Functionality
	// Add A Reference to the input element
	const refAdd = useRef<HTMLInputElement>(null);
	const refDescription = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setDescription(toDoList?.description ?? '');
	}, [toDoList?.id, toDoList?.description]);

	// Clear the entry once the add request succeeds
	useEffect(() => {
		if (status === "fulfilled") {
			refAdd.current!.value = "";
		}
	}, [status]);

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			handleAddNewListItem();
		}
	}

	// Add New List Item from the input element
	function handleAddNewListItem() {
		if (!refAdd.current?.value) {
			return;
		}
		addNewListItem(toDoList.id, refAdd.current.value);
		refAdd.current!.value = "";
	}

	function handleRemoveItem(itemId: string) {
		setRemoveItemId(String(itemId).trim());
		onRemoveItem(toDoList.id, itemId);
	}
	function getItemRemoveStatus(itemId: string) {
		return removeItemId === itemId ? removeItemStatus : '';
	}

	function saveDescriptionHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter') {
			onUpdateDescription(toDoList.id, description);
			e.preventDefault();
			e.stopPropagation();
			refDescription.current?.blur();
		}
	}

	function setChecked(itemId: string, checked: boolean) {
		onToggleItem(toDoList.id, itemId, checked);
	}

	const DragMonitor = () => {
		useDndMonitor({
			onDragStart: (event) => {
				setActiveIndex(Number(event.active.id));
			},
			onDragOver: (event) => {
				setOverIndex(event.over ? Number(event.over.id) : null);
			},
			onDragEnd: () => {
				setActiveIndex(null);
				setOverIndex(null);
			},
		});
		return null;
	};

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over || !toDoList.listItems) return;

		const oldIndex = Number(active.id);
		const newIndex = Number(over.id);

		if (oldIndex === newIndex) return;

		const newItems = [...toDoList.listItems];
		const [movedItem] = newItems.splice(oldIndex, 1);
		newItems.splice(newIndex, 0, movedItem);

		onReorder(toDoList.id, newItems);
	}

	return (
		<>
			<div className={"add-item card " + addStatus + " " + status}>
				<input placeholder="Start Typing to insert a new list item..." ref={refAdd} onKeyUp={handleKeyPress} />
				<button type="button" onClick={() => handleAddNewListItem()}>Insert</button>
			</div>
			<div className="todo-list card">
				<div className="description">
					<TextareaAutosize placeholder="Add a description here..." value={description} onChange={(e) => { setDescription(e.target.value) }} onKeyDown={(e) => saveDescriptionHandler(e)} onBlur={() => onUpdateDescription(toDoList.id, description)} ref={refDescription}>{description}</TextareaAutosize>
					<div className="lastUpdated">
						<DateComponent date={toDoList?.lastUpdated ? new Date(toDoList.lastUpdated) : null} />
					</div>
				</div>
				{status === 'pending' ? (
					<Spinner />
				) : (
					<DndContext onDragEnd={handleDragEnd}>
						<DragMonitor />
						<div className="list-items">
							{toDoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => {
								let offset = 0;
								if (activeIndex !== null && overIndex !== null) {
									if (activeIndex < overIndex && index > activeIndex && index <= overIndex) {
										offset = -1;
									} else if (activeIndex > overIndex && index >= overIndex && index < activeIndex) {
										offset = 1;
									}
								}
								return (
									<div key={index} style={{ transform: `translateY(${offset * 80}px)`, transition: 'transform 0.2s ease-out' }}>
										<Droppable id={String(index)}>
											<Draggable id={index}>
												<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} removeItem={handleRemoveItem} removeStatus={getItemRemoveStatus(String(toDoListItem.id))} setChecked={setChecked} />
											</Draggable>
										</Droppable>
									</div>
								);
							})}
						</div>
					</DndContext>
				)}
			</div>
		</>
	)
}
