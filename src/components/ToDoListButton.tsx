import { useState } from "react"
import { useNavigate } from "react-router"
import { DateComponent } from "./DateComponent"
import type { ToDoListType, StoreStatus } from "../types";

type ToDoListButtonProps = {
	toDoList: ToDoListType
	removeStatus: StoreStatus
	onRemove: (listId: string) => void
}

export const ToDoListButton = ({ toDoList, removeStatus, onRemove }: ToDoListButtonProps) => {
	const [removedId, setRemovedId] = useState('');
	const navigate = useNavigate();

	function onClick(){
		navigate(`/todolists/todolist/${toDoList.id}`);
	}

	function onRemoveClick(e: React.MouseEvent<HTMLDivElement>){
		e.stopPropagation();
		if (!window.confirm("Are you sure you want to delete this list?")) {
			return;
		}
		setRemovedId(toDoList.id);
		onRemove(toDoList.id);
	}

  return (
		<div className={"todo-list-button listButton "} onClick={onClick}>
			<div className={"container " + (removedId===toDoList.id && removeStatus?removeStatus:'')} >
				<div className="title">
					<div className="text">{toDoList.name}</div>
					<div className="description">{toDoList.description}</div>
				</div>
				<div className="todolistbutton-rightside">
					<DateComponent date={new Date(toDoList.lastUpdated ?? '01/01/1970')} />
					<div className="close" onClick={onRemoveClick}>
						<span>X</span>
					</div>
				</div>
			</div>
		</div>
  )
}
