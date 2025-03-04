import { Suspense, useEffect, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListItemType, ToDoListType } from "../types"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus,
	toDoSlice,
	removeListItem
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import { ToDoListItem } from "./ToDoListItem"
import getMonthByNumber from "../utils/getMonthByNumber"
import { useNavigate } from "react-router"

export const ToDoList = (params: {toDoList: ToDoListType, status: String}) => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */


	const dispatch: AppDispatch = useAppDispatch()
/* 	useEffect(()=>{
		
	}); */
	//ispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();.
	const navigate = useNavigate();
	const [todoList, setToDoList] = useState(params.toDoList);

	useEffect(() => {
		setToDoList(params.toDoList);
	}, [params.toDoList]);

	/* function onClick(e: React.MouseEvent<HTMLDivElement>){
		console.log("ToDoList", e);
		navigate(`/todolists/todolist/${todoList.id}`);
	}
 */
	function removeItemFromList(itemId: string){
		dispatch(removeListItem({listId: params.toDoList.id, itemId: itemId}))
	}

  return (
		<div className="todo-list card">
			<div className="name">{todoList?.name}</div>
			<div className="description">{todoList?.description}</div> 
			<div className="lastUpdated">{todoList?.lastUpdated}</div>
			<div className="list-items">
				{todoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => (
					<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} removeItem={removeItemFromList} />
				))}
			</div>
		</div>
  )
}
