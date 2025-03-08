import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import { useNavigate } from "react-router"
import { DateComponent } from "./DateComponent"
import type { ToDoListType } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeList, removeListItem, selectDeleteListStatus, selectLists } from "../store/toDoList/toDoSlice";
import type { AppDispatch } from "../store/store";

export const ToDoListButton = (params: {toDoList: ToDoListType}) => {
	const dispatch: AppDispatch = useAppDispatch()
  const removeStatus = useAppSelector(selectDeleteListStatus);
	const [removedId, setRemovedId]	= useState('');

	//ispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();.
	const navigate = useNavigate();
	//const [toDoList] = useState(params.toDoList);



	function onClick(e: React.MouseEvent<HTMLDivElement>){
		console.log("ToDoList", e);
		navigate(`/todolists/todolist/${params.toDoList.id}`);
	}

	function onRemove(e: React.MouseEvent<HTMLDivElement>){
		setRemovedId(params.toDoList.id);
		e.stopPropagation();
		console.log("ToDoList", e);
		dispatch(removeList(params.toDoList.id));
	}

  return (
		<div className={"todo-list-button listButton "} onClick={onClick}>
			<div className={"container " + (removedId==params.toDoList.id && removeStatus?removeStatus:'')} >
				<div className="title">
					<div className="text">{params.toDoList.name}</div>
					<div className="description">{params.toDoList.description}</div>
				</div>
				<div className="todolistbutton-rightside">
					<DateComponent date={new Date(params.toDoList.lastUpdated ?? '01/01/1970')} />
					<div className="close" onClick={onRemove}>
						<span>X</span>
					</div>
				</div>
			</div>
		</div>
  )
}
