import { useEffect } from "react"
import { ToDoLists } from "../components/ToDoLists"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	getLists, addList, removeList,
	selectLists, selectListsStatus, selectAddListStatus, selectDeleteListStatus,
} from "../store/toDoList/toDoSlice"
import { setActiveList } from "../store/userManagement/userManagementSlice"

export const ToDoListsPage = () => {
	const dispatch = useAppDispatch()
	const toDoLists = useAppSelector(selectLists)
	const status = useAppSelector(selectListsStatus)
	const addStatus = useAppSelector(selectAddListStatus)
	const removeStatus = useAppSelector(selectDeleteListStatus)

	useEffect(() => {
		dispatch(setActiveList(''))
		dispatch(getLists())
	}, [])

	function handleAddList(name: string) {
		dispatch(addList({ name, id: '', listItems: [] }))
	}

	function handleRemoveList(listId: string) {
		dispatch(removeList(listId))
	}

	return (
		<div id="container">
			<ToDoLists
				toDoLists={toDoLists}
				status={status}
				addStatus={addStatus}
				removeStatus={removeStatus}
				onAddList={handleAddList}
				onRemoveList={handleRemoveList}
			/>
		</div>
	)
}
