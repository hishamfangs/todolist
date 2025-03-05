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

export const ToDoListsPage = () => {

	//const [toDoLists] = useState(params.toDoList);
	const dispatch: AppDispatch = useAppDispatch()
	const toDoLists: ToDoListType[] = useAppSelector(selectLists)
	const status = useAppSelector(selectListsStatus);
	const addStatus = useAppSelector(selectAddListStatus);
	
	useEffect(() => {
		console.log('called')
		dispatch(setActiveList(''));
		dispatch(getLists());
	}, []);

	function addNewList(name: string){
		console.log("Adding a new list");
		dispatch(addList({
			name: name,
			id: "",
			listItems: []
		}));
	}

	console.log(toDoLists);

  return (
    <div id="container">
      <ToDoLists toDoLists={toDoLists} addNewList={addNewList} addStatus={addStatus} />
    </div>
  )
}
