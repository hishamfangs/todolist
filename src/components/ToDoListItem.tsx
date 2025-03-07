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

export const ToDoListItem = (params: { toDoListItem: ToDoListItemType, removeItem: Function, removeStatus: string}) => {
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
		params.removeItem(params.toDoListItem.id)
	}

  return (
		<div className={"list-item " + (toDoListItem.completed?'checked':'') + " " + params.removeStatus}>
			<div className="container">
				<div className="info-container">
					<div className="checkbox"><input type="checkbox" 
						checked={toDoListItem.completed}
						onChange={e => {
						setToDoListItem({...toDoListItem, completed: (e.target.checked)})
				}} /></div>
					<div className="text">{toDoListItem.name}</div>
				</div>
				<div className="close" onClick={onRemove}><span>X</span></div>
			</div>
		</div>
  )
}
