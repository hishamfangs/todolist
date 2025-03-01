
import { ToDoListItem } from '../components/ToDoListItem';
import { Outlet, useParams } from 'react-router';
import type { ToDoListItemType } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LoggedIn() {
	const { id } = useParams();

	return (
		<div>
			<Breadcrumbs />
			<Outlet />
		</div>
	);
}