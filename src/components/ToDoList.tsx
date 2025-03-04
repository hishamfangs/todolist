import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListItemType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus,
	toDoSlice
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoListItem } from "./ToDoListItem"
import getMonthByNumber from "../utils/getMonthByNumber"
import { useNavigate } from "react-router"

export const ToDoList = (params: any) => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */

	//ispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();.
	const navigate = useNavigate();
	const [toDoList] = useState(params.toDoList);

	function onClick(e: React.MouseEvent<HTMLDivElement>){
		console.log("ToDoList", e);
		navigate(`/todolists/todolist/${toDoList.id}`);
	}

  return (
		<div className="todo-list listButton" onClick={onClick}>
			<div className="container">
				<div className="title">
					<div className="text">{toDoList.name}</div>
					<div className="description">{toDoList.description}</div>
				</div>
				<div className="date"><span className="day">{new Date(toDoList.lastUpdated).getDate()}</span><span className="month">{getMonthByNumber(new Date(toDoList.lastUpdated).getMonth())}</span></div>
			</div>
		</div>
  )
}
