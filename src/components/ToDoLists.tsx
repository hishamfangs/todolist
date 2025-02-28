import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoList } from "./ToDoList"

export const ToDoLists = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus);

	dispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();

  return (
    <div>
      <div className="todo-lists">
				<div className="add">
					<div className="container">
						<div className="plus-sign"></div>
						<div className="add-text">Add a new list...</div>
					</div>
				</div>
				<Suspense fallback={<div>Loading...</div>}>

					{toDoLists.map((toDoList: ToDoListType, index: number) => (
						<ToDoList key={index} toDoList={toDoList} />
					))}
				</Suspense>
      </div>
    </div>
  )
}
