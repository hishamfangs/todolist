/* import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListsType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store" */

import { useEffect, useState } from "react";
import type { ToDoListItemType } from "../types"
import { useParams } from "react-router";

export const ToDoListItem = (params: { toDoListItem: ToDoListItemType, removeItem: Function, removeStatus: string, setChecked: Function}) => {
  //const dispatch: AppDispatch = useAppDispatch()
  /* const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */

	//dispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();
	// TODO: Make this dynamic connect to store

	const [toDoListItem, setToDoListItem] = useState(params.toDoListItem);

	useEffect(()=>{
		setToDoListItem(params.toDoListItem);
	}, [params.toDoListItem])

	function onRemove(){
		//e.stopPropagation();
		if (!window.confirm("Are you sure you want to delete this list?")) {
			return;
		}
		params.removeItem(params.toDoListItem.id)
	}

	function updateChecked(e: React.ChangeEvent<HTMLInputElement>){
		console.log("Updating checked status");
		params.setChecked(params.toDoListItem.id, e.target.checked);
		setToDoListItem({...toDoListItem, completed: (e.target.checked)})
	}

  return (
		<div className={"list-item " + (toDoListItem.completed?'checked':'') + " " + params.removeStatus}>
			<div className="container">
				<div className="info-container">
					<div className="dragicon">
						<span className="dark"></span>
						<span className="dark"></span>
						<span className="dark"></span>
						<span className="dark"></span>
						<span className="dark"></span>
						<span className="dark"></span>
					</div>
					<div className="checkbox"><input type="checkbox" 
						checked={toDoListItem.completed}
						onChange={e => updateChecked(e)} /></div>
					<div className="text">{toDoListItem.name}</div>
				</div>
				<div className="close" onClick={onRemove}><span>X</span></div>
			</div>
		</div>
  )
}
