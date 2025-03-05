
import { useParams } from 'react-router';
import type { BreadcrumbNavigationStateType, ToDoListType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addListItem, getList, selectList, selectListStatus } from '../store/toDoList/toDoSlice';
import { useEffect, useState } from 'react';
import { ToDoList } from '../components/ToDoList';
import { selectBreadCrumbNavigationState, setActiveList } from '../store/userManagement/userManagementSlice';

export default function ToDoListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const toDoList: ToDoListType = useAppSelector((state) => selectList(state, id)) as ToDoListType;
	const status = useAppSelector(selectListStatus);

	const [todoList, setTodoList] = useState(toDoList);

	useEffect(() => {
		if (id){
			dispatch(setActiveList(id));
		}
	}, []);

	console.log(id)

	useEffect(() => {
		dispatch(getList(id));
	}, []);

	useEffect(() => {
		console.log(toDoList);
		setTodoList(toDoList);
	}, [toDoList]);

	function addNewListItem(listId:string, name: string){
		console.log("Adding a new list item");
		dispatch(addListItem({
			listId: listId,
			listItem: {
				name: name,
				id: '',
				completed: false,
				lastUpdated: new Date().toISOString()
			}
		}));
	}
	return (
		<div>
			<ToDoList toDoList={todoList} status={status} addNewListItem={addNewListItem} />
		</div>
	);
}