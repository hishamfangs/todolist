import { useEffect } from "react"
import { ToDoLists } from "../components/ToDoLists"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus,
	addList,
	selectAddListStatus
} from "../store/toDoList/toDoSlice"
import type { AppDispatch } from "../store/store"
import type { ToDoListType } from "../types"
import { setActiveList } from "../store/userManagement/userManagementSlice"
import { AlertOnStatusFailed } from "../components/AlertOnStatusFailed"

export const ToDoListsPage = () => {

	//const [toDoLists] = useState(params.toDoList);
	
  return (
    <div id="container">
      <ToDoLists />
    </div>
  )
}
