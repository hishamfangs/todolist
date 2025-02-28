// import { Suspense, useState } from "react"
// import { ToDoList } from "./ToDoList"
// import { ToDoListsType, ToDoListType } from "../types"

// import { useAppDispatch, useAppSelector } from "../app/hooks"
// import {
//   getLists, getListItems, selectToDoLists, selectToDoListsStatus,
// 	selectListsStatus,
// } from "../store/toDoList/toDoSlice"

// export const ToDoLists = () => {
//   const dispatch = useAppDispatch()
//   const toDoLists: ToDoListsType = useAppSelector(selectToDoLists)
//   const status = useAppSelector(selectListsStatus)
//   const [toDoLists, setToDoLists] = useState();

//   return (
//     <div>
//       <div className="todo-lists">
// 				<div className="add">
// 					<div className="container">
// 						<div className="plus-sign"></div>
// 						<div className="add-text">Add a new list...</div>
// 					</div>
// 				</div>
// 				<Suspense fallback={<div>Loading...</div>}>
// 					{toDoLists.map((toDoList: ToDoListType) => (
// 						<ToDoList key={toDoList.id} toDoList={toDoList} />
// 					))}
// 				</Suspense>
//       </div>
//     </div>
//   )
// }
