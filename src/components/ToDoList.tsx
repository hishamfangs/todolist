import type React from "react";
import {  useEffect, useRef, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListItemType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	removeListItem,
	selectDeleteListItemStatus,
	updateList,
	updateListItem
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoListItem } from "./ToDoListItem"
import TextareaAutosize from 'react-textarea-autosize';
import { DateComponent } from "./DateComponent"
import {DndContext} from '@dnd-kit/core';
import type { DragEndEvent , UniqueIdentifier} from '@dnd-kit/core';
	
import {Droppable} from '../dragndrop/Droppable';
import {Draggable} from '../dragndrop/Draggable';

export const ToDoList = (params: { toDoList: ToDoListType, status: String, addStatus: string, addNewListItem: Function }) => {

	const dispatch: AppDispatch = useAppDispatch()
	const [todoList, setToDoList] = useState(params.toDoList);
	const [description, setDescription] = useState('');
	const removeStatus = useAppSelector(selectDeleteListItemStatus);
	const [removeItemId, setRemoveItemId] = useState('');
	const [parent, setParent] = useState<UniqueIdentifier | null>(null);

	useEffect(() => {
		console.log("To Do list:", params.toDoList)
		setToDoList(params.toDoList);
		setupSorting();
	}, [params.toDoList]);

	useEffect(() => {
		setDescription(params.toDoList?.description ?? '');
	}, [params.toDoList?.description]);

	// Insert Functionality
	// Add A Reference to the input element
	const refAdd = useRef<HTMLInputElement>(null);
	const refDescription = useRef<HTMLTextAreaElement>(null);

	// Delete the entry if the item is added successfully
	useEffect(() => {
		if (params.status === "fulfilled") {
			refAdd.current!.value = "";
		}
	}, [params.status]);

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			addNewListItem();
		}
	}

	// Add New List Function to add a new list from the input element
	function addNewListItem() {
		console.log("Adding a new list item: " + params.toDoList);
		if (!refAdd.current?.value) {
			return;
		}
		console.log("Adding a new list");
		params.addNewListItem(todoList.id, refAdd.current?.value);
		refAdd.current!.value = "";
	}

	function removeItemFromList(itemId: string) {
		setRemoveItemId(String(itemId).trim());
		dispatch(removeListItem({ listId: params.toDoList.id, itemId: itemId }))
	}
	function getStatus(itemId: string) {
		return removeItemId === itemId ? removeStatus : '';
	}

	function saveDescriptionHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter') {

			saveDescription(todoList.id, description);
			e.preventDefault();
			e.stopPropagation();
			refDescription.current?.blur();
		}
	}

	function saveDescription(id: string, description: string) {
		console.log("Saving Description: " + description);
		dispatch(updateList({
			id, description: description,
		}));
	}

	function setChecked(itemId: string, checked: boolean) {
		dispatch(updateListItem({
			id: itemId,
			completed: checked, 
			listId: todoList.id
		}))
	}

	function setupSorting(){

	}


	function handleDragEnd(event: DragEndEvent) {
		const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
		if (over) {
			dispatch(updateListItem({
				id: String(event.active.id),
				order: todoList.listItems?todoList.listItems.findIndex((item) => item.id === String(over.id)):undefined,
				listId: todoList.id
			}))
			setParent(over ? over.id : null);
		}
  }

	return (
		<>
			<div className={"add-item card " + params.addStatus + " " + params.status}>
				<input placeholder="Start Typing to insert a new list item..." ref={refAdd} onKeyUp={handleKeyPress} />
				<button type="button" onClick={() => addNewListItem()}>Insert</button>
			</div>
			<div className="todo-list card">
				<div className="description">
					<TextareaAutosize placeholder="Add a description here..." value={description} onChange={(e) => { setDescription(e.target.value) }} onKeyDown={(e) => saveDescriptionHandler(e)} onBlur={(e) => saveDescription(todoList.id, description)} ref={refDescription}>{description}</TextareaAutosize>
					<div className="lastUpdated">
						<DateComponent date={todoList?.lastUpdated ? new Date(todoList.lastUpdated) : null} />
					</div>
				</div>
				<DndContext onDragEnd={handleDragEnd}>
					<div className="list-items">
						{todoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => (
							<>
								<Droppable key={'drop-'+index} id={String(index)}>
									TESTING
									{index===parent?<span>TEST</span>:''}
								</Droppable>
								<Draggable key={index} id={index}>
									{index!==parent?<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} removeItem={removeItemFromList} removeStatus={getStatus(String(toDoListItem.id))} setChecked={setChecked} />:null}
								</Draggable>
							</>
						))}
					</div>
				</DndContext>
			</div>
		</>
	)
}
