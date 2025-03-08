import { KeyboardEventHandler, Suspense, useEffect, useRef, useState } from "react"
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
import getMonthByNumber from "../utils/getMonthByNumber"
import { useNavigate } from "react-router"
import { DateComponent } from "./DateComponent"

export const ToDoList = (params: { toDoList: ToDoListType, status: String, addStatus: string, addNewListItem: Function }) => {

	const dispatch: AppDispatch = useAppDispatch()

	const navigate = useNavigate();
	const [todoList, setToDoList] = useState(params.toDoList);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const removeStatus = useAppSelector(selectDeleteListItemStatus);
	const [removeItemId, setRemoveItemId] = useState('');


	useEffect(() => {
		console.log("To Do list:", params.toDoList)
		setToDoList(params.toDoList);
	}, [params.toDoList]);

	useEffect(() => {
		setDescription(params.toDoList?.description ?? '');
	}, [params.toDoList?.description]);

	// Insert Functionality
	// Add A Reference to the input element
	const refAdd = useRef<HTMLInputElement>(null);
	const refDescription = useRef<HTMLInputElement>(null);

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

	function saveDescriptionHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			saveDescription(todoList.id, description);
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
	return (
		<>
			<div className={"add-item card " + params.addStatus + " " + params.status}>
				<input placeholder="Start Typing to insert a new list item..." ref={refAdd} onKeyUp={handleKeyPress} />
				<button type="button" onClick={() => addNewListItem()}>Insert</button>
			</div>
			<div className="todo-list card">
				<div className="description">
					<input placeholder="Add a description here..." value={description} onChange={(e) => { setDescription(e.target.value) }} onKeyUp={(e) => saveDescriptionHandler(e)} onBlur={(e) => saveDescription(todoList.id, description)} ref={refDescription}></input>
					<div className="lastUpdated">
						<DateComponent date={todoList?.lastUpdated ? new Date(todoList.lastUpdated) : null} />
					</div>
				</div>
				<div className="list-items">
					{todoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => (
						<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} removeItem={removeItemFromList} removeStatus={getStatus(String(toDoListItem.id))} setChecked={setChecked} />
					))}
				</div>
			</div>
		</>
	)
}
