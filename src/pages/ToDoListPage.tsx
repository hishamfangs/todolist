
import { ToDoListItem } from '../components/ToDoListItem';
import { useParams } from 'react-router';
import type { ToDoListItemType } from '../types';

export default function ToDoListPage() {
	const { id } = useParams();

	// TODO: Fetch the list from the server
	const toDoList = {
		id: "1",
		name: "Grocery List",
		listItems: [
			{
				id: "1",
				name: "Milk",
				completed: false
			},
			{
				id: "2",
				name: "Eggs",
				completed: true
			},
			{
				id: "3",
				name: "Bread",
				completed: false
			}
		]
	};
	return (
		<div>
			<div className="list-items">
				{toDoList.listItems.map((toDoListItem: ToDoListItemType, index: number) => (
					<ToDoListItem key={index} toDoListItem={toDoListItem} />
				))}
			</div>
		</div>
	);
}