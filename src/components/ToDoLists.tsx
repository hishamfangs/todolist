import { Suspense, useEffect, useRef, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"
import { ToDoListButton } from "./ToDoListButton";
import type { AppDispatch } from "../store/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addList, getLists, selectAddListStatus, selectLists, selectListsStatus } from "../store/toDoList/toDoSlice";
import { setActiveList } from "../store/userManagement/userManagementSlice";
import { AlertOnStatusFailed } from "./AlertOnStatusFailed";

export const ToDoLists = () => {
	// Get the toDoLists from the parameters
	const dispatch: AppDispatch = useAppDispatch()
	const toDoLists: ToDoListType[] = useAppSelector(selectLists)
	const status = useAppSelector(selectListsStatus);
	const addStatus = useAppSelector(selectAddListStatus);
	const [orderedLists, setOrderedLists] = useState(toDoLists);

	useEffect(() => {
		console.log('called')
		dispatch(setActiveList(''));
		dispatch(getLists());
	}, []);


	console.log(toDoLists);


	// Reorder list by Last Updated
	useEffect(() => {
		const todoNew = toDoLists.toSorted((a: ToDoListType, b: ToDoListType) => {
			return new Date(String(b.lastUpdated)).getTime() - new Date(String(a.lastUpdated)).getTime();
		});
		console.log(todoNew);
		setOrderedLists(todoNew);
	}, [toDoLists]);

	// Add a new
	// Add A Reference to the input element
	const ref = useRef<HTMLInputElement>(null);

	// Add an event listener to the input element to listen for the Enter key and submit
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				addNewList();
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
		if (addStatus === "fulfilled") {
			ref.current!.value = "";
		}
	}, [addStatus]);

	// Add New List Function to add a new list from the input element
	function addNewList() {
		console.log("Adding a new list");
		if (!ref.current?.value) {
			return;
		}
		console.log("Adding a new list");
		dispatch(addList({
			name: ref.current?.value,
			id: "",
			listItems: []
		}));
	}

	return (
		<div className="todo-lists card">
			<div className={"add listButton " + addStatus}>
				<div className="container ">
					<div className="plus-sign" onClick={addNewList}>+</div>
					<div className="add-text"><input placeholder="Type to add a new list..." ref={ref}></input></div>
				</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				{
					orderedLists.map((list: ToDoListType) => (
						<ToDoListButton key={list.id} toDoList={list} />
					))
				}
			</Suspense>
			<AlertOnStatusFailed status={status} message="Failed to get To Do Lists" />
		</div>
	)
}
