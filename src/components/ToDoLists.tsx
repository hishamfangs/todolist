import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoList } from "./ToDoList"
import Breadcrumbs from "./Breadcrumbs"

export const ToDoLists = () => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus);

	dispatch(getLists()); */

	const toDoLists = [
		{
			id: "1",
			name: "List 1",
			listItems: [
				{
					id: "1",
					name: "Item 1",
					completed: false
				},
				{
					id: "2",
					name: "Item 2",
					completed: true
				},
				{
					id: "3",
					name: "Item 3",
					completed: false
				}
			]
		},
		{
			id: "2",
			name: "List 2",
			listItems: [
				{
					id: "1",
					name: "Item 1",
					completed: false
				},
				{
					id: "2",
					name: "Item 2",
					completed: true
				},
				{
					id: "3",
					name: "Item 3",
					completed: false
				}
			]
		}
	];

  //const [toDoLists, setToDoLists] = useState();

  return (
    <div id="container">
      <div className="todo-lists card">
				<div className="add listButton">
					<div className="container">
						<div className="plus-sign">+</div>
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
