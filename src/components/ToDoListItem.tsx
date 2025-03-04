/* import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListsType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store" */

import { useState } from "react";
import type { ToDoListItemType } from "../types"
import { useParams } from "react-router";

export const ToDoListItem = (params: any) => {
  //const dispatch: AppDispatch = useAppDispatch()
  /* const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */

	//dispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();
	// TODO: Make this dynamic connect to store

	const [toDoListItem, setToDoListItem] = useState(params.toDoListItem);

  return (
    <div>TESTSTST
      <div className="todo-item">
				<div className="container">
					<div className="checkbox">{toDoListItem.completed}</div>
					<div className="text">{toDoListItem.name}</div>
					<div className="close"><span>X</span></div>
				</div>
			</div>
		</div>
  )
}
