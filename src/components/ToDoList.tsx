import { Suspense, useEffect, useRef, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListItemType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	removeListItem
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoListItem } from "./ToDoListItem"
import getMonthByNumber from "../utils/getMonthByNumber"
import { useNavigate } from "react-router"
import { DateComponent } from "./DateComponent"

export const ToDoList = (params: {toDoList: ToDoListType, status: String, addNewListItem: Function}) => {

	const dispatch: AppDispatch = useAppDispatch()

	const navigate = useNavigate();
	const [todoList, setToDoList] = useState(params.toDoList);

	useEffect(() => {
		setToDoList(params.toDoList);
	}, [params.toDoList]);

	// Insert Functionality
	// Add A Reference to the input element
	const ref = useRef<HTMLInputElement>(null);

	// Add an event listener to the input element to listen for the Enter key and submit
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				addNewListItem();
			}
		};

		const inputElement = ref.current;
		inputElement?.addEventListener('keypress', handleKeyPress);

		return () => {
			inputElement?.removeEventListener('keypress', handleKeyPress);
		};
	}, []);

	// Delete the entry if the item is added successfully
	useEffect(() => {
		if (params.status === "fulfilled"){
			ref.current!.value = "";
		}
	}, [params.status]);

	// Add New List Function to add a new list from the input element
	function addNewListItem(){
		if (!ref.current?.value){
			return;
		}
		console.log("Adding a new list");
		params.addNewListItem(params.toDoList.id, ref.current?.value);
		ref.current!.value = "";
	}

	function removeItemFromList(itemId: string){
		dispatch(removeListItem({listId: params.toDoList.id, itemId: itemId}))
	}

  return (
		<>
			<div className="add-item card">
				<input placeholder="Start Typing to insert a new list item..." ref={ref} />
				<button type="button" onClick={addNewListItem}>Insert</button>
			</div>
			<div className="todo-list card">
				<div className="description">
					<input value={todoList?.description} onChange={(e)=>{setToDoList({...todoList, description: e.target.value})}}></input>
					<div className="lastUpdated">
						<DateComponent date={new Date(todoList?.lastUpdated ?? '')} />
					</div>
				</div> 
				<div className="list-items">
					{todoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => (
						<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} removeItem={removeItemFromList} />
					))}
				</div>
			</div>
		</>
  )
}
