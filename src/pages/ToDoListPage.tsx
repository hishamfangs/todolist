
import { useParams } from 'react-router';
import type { ToDoListType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getList, selectList, selectListStatus } from '../store/toDoList/toDoSlice';
import { useEffect, useState } from 'react';
import { ToDoList } from '../components/ToDoList';

export default function ToDoListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const toDoList: ToDoListType = useAppSelector((state) => selectList(state, id)) as ToDoListType;
	const status = useAppSelector(selectListStatus);

	const [todoList, setTodoList] = useState(toDoList);


	console.log(id)
	// TODO: Fetch the list from the server
	useEffect(() => {
		dispatch(getList(id));
	}, []);

	useEffect(() => {
		console.log(toDoList);
		setTodoList(toDoList);
	}, [toDoList]);

	return (
		<div>
			<ToDoList toDoList={todoList} status={status} />
		</div>
	);
}