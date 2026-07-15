import { Suspense, useEffect, useMemo, useRef } from "react"
import type { ToDoListType, StoreStatus } from "../types"
import { ToDoListButton } from "./ToDoListButton";
import { AlertOnStatusFailed } from "./AlertOnStatusFailed";
import { Spinner } from "./Spinner";

type ToDoListsProps = {
	toDoLists: ToDoListType[]
	status: StoreStatus
	addStatus: StoreStatus
	removeStatus: StoreStatus
	onAddList: (name: string) => void
	onRemoveList: (listId: string) => void
}

export const ToDoLists = ({ toDoLists, status, addStatus, removeStatus, onAddList, onRemoveList }: ToDoListsProps) => {
	// Order by Last Updated — a pure derivation of props, not a store read
	const orderedLists = useMemo(() => {
		return [...toDoLists].toSorted((a: ToDoListType, b: ToDoListType) => {
			return new Date(String(b.lastUpdated)).getTime() - new Date(String(a.lastUpdated)).getTime();
		});
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

	// Clear the input once the add request succeeds
	useEffect(() => {
		if (addStatus === "fulfilled") {
			ref.current!.value = "";
		}
	}, [addStatus]);

	// Add New List Function to add a new list from the input element
	function addNewList() {
		if (!ref.current?.value) {
			return;
		}
		onAddList(ref.current.value);
		ref.current!.value = "";
	}

	return (
		<div className="todo-lists card">
			<div className={"add listButton " + addStatus}>
				<div className="container ">
					<div className="plus-sign" onClick={addNewList}>+</div>
					<div className="add-text"><input placeholder="Type to add a new list..." ref={ref}></input></div>
				</div>
			</div>
			{status === 'pending' ? (
				<Spinner />
			) : (
				<Suspense fallback={<div>Loading...</div>}>
					{
						orderedLists.map((list: ToDoListType) => (
							<ToDoListButton key={list.id} toDoList={list} removeStatus={removeStatus} onRemove={onRemoveList} />
						))
					}
				</Suspense>
			)}
			<AlertOnStatusFailed status={status} message="Failed to get To Do Lists" />
		</div>
	)
}
