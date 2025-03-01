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

export const ToDoList = (params: any) => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */

	//ispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();
	const [toDoList] = useState(params.toDoList);
  return (
		<div className="todo-list listButton">
			<div className="container">
				<div className="title">
					<div className="text">Grocery List</div>
					<div className="description">Description</div>
				</div>
				<div className="date"><span className="day">19</span><span className="month">Sep</span></div>
			</div>
		</div>
  )
}
