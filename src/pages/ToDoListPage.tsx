
import { ToDoListItem } from '../components/ToDoListItem';
import { useParams } from 'react-router';
import type { ToDoListItemType, ToDoListType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getList, selectList, selectListStatus } from '../store/toDoList/toDoSlice';
import { useEffect, useState } from 'react';

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
			{todoList?.name}
			{todoList?.description}
			{todoList?.lastUpdated}
			{todoList?.listItems?.length}
			
			<div className="list-items">
				{todoList?.listItems?.map((toDoListItem: ToDoListItemType, index: number) => (
					<ToDoListItem key={toDoListItem.id} toDoListItem={toDoListItem} />
				))}
			</div>
		</div>
	);
}