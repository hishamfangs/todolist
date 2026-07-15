
import { useParams } from 'react-router';
import type { ToDoListItemType, ToDoListType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	addListItem, getList, removeListItem, updateList, updateListItem,
	selectAddListItemStatus, selectDeleteListItemStatus, selectList, selectListStatus,
} from '../store/toDoList/toDoSlice';
import { useEffect } from 'react';
import { ToDoList } from '../components/ToDoList';
import { setActiveList } from '../store/userManagement/userManagementSlice';
import { AlertOnStatusFailed } from '../components/AlertOnStatusFailed';

export default function ToDoListPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const toDoList: ToDoListType = useAppSelector((state) => selectList(state, id)) as ToDoListType;
	const status = useAppSelector(selectListStatus);
	const addStatus = useAppSelector(selectAddListItemStatus);
	const removeItemStatus = useAppSelector(selectDeleteListItemStatus);

	useEffect(() => {
		if (id) {
			dispatch(setActiveList(id));
			dispatch(getList(id));
		}
	}, [id]);

	function addNewListItem(listId: string, name: string) {
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

	function handleRemoveItem(listId: string, itemId: string) {
		dispatch(removeListItem({ listId, itemId }));
	}

	function handleUpdateDescription(listId: string, description: string) {
		dispatch(updateList({ id: listId, description }));
	}

	function handleToggleItem(listId: string, itemId: string, completed: boolean) {
		dispatch(updateListItem({ id: itemId, listId, completed }));
	}

	function handleReorder(listId: string, orderedItems: ToDoListItemType[]) {
		orderedItems.forEach((item, index) => {
			dispatch(updateListItem({
				id: item.id,
				listId,
				order: index,
				completed: item.completed,
				name: item.name,
				lastUpdated: item.lastUpdated,
				listName: item.listName,
			}));
		});
	}

	return (
		<div id="container">
			<ToDoList
				toDoList={toDoList}
				status={status}
				addStatus={addStatus}
				removeItemStatus={removeItemStatus}
				addNewListItem={addNewListItem}
				onRemoveItem={handleRemoveItem}
				onUpdateDescription={handleUpdateDescription}
				onToggleItem={handleToggleItem}
				onReorder={handleReorder}
			/>
			<AlertOnStatusFailed status={status} message="Failed to get To Do List Items" />
		</div>
	);
}
