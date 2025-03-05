import { Suspense, useEffect, useRef, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"
import { ToDoListButton } from "./ToDoListButton";

export const ToDoLists = (params: { toDoLists: ToDoListType[]; addNewList: Function; addStatus: string }) => {
	// Get the toDoLists from the parameters
	const [toDoLists, setToDoLists] = useState(params.toDoLists);

	// Reorder list by Last Updated
	useEffect(() => {
		const todoNew = params.toDoLists.toSorted((a: ToDoListType, b: ToDoListType) => {
			return new Date(String(b.lastUpdated)).getTime() - new Date(String(a.lastUpdated)).getTime();
		});
		console.log(todoNew); 
		setToDoLists(todoNew);
	}, [params.toDoLists]);

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
		if (params.addStatus === "fulfilled"){
			ref.current!.value = "";
		}
	}, [params.addStatus]);

	// Add New List Function to add a new list from the input element
	function addNewList(){
		console.log("Adding a new list");
		if (!ref.current?.value){
			return;
		}
		params.addNewList(ref.current?.value);
	}

  return (
		<div className="todo-lists card">
			<div className={"add listButton " + params.addStatus}>
				<div className="container ">
					<div className="plus-sign" onClick={addNewList}>+</div>
					<div className="add-text"><input placeholder="Type to add a new list..." ref={ref}></input></div>
				</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				{
					toDoLists.map((toDoList: ToDoListType) => (
						<ToDoListButton key={toDoList.id} toDoList={toDoList} />
					))
				}
			</Suspense>
		</div>
  )
}
