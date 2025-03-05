import { NavLink, useNavigate } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppSelector } from "../app/hooks";
import { selectActiveListId, selectBreadCrumbNavigationState } from "../store/userManagement/userManagementSlice";
import type { BreadcrumbNavigationStateType } from "../types";
import { selectList } from "../store/toDoList/toDoSlice";

export default function Breadcrumbs() {
	const navigate = useNavigate();
	//const breadcrumbNavigation: BreadcrumbNavigationStateType = useAppSelector(selectBreadCrumbNavigationState);
	const activeListId: string | undefined = useAppSelector(selectActiveListId);
	const toDoListName = useAppSelector((state) => activeListId ? selectList(state, activeListId)?.name : '');

	function onClick(){ 
		localStorage.removeItem('token');
		navigate('/')
	}

	return (
		<div className="breadcrumbs">
			<div className="container">
				{
					activeListId?
					<NavLink to="/todolists" className="breadcrumb back">
						&lt;-
					</NavLink>
					:
					''
				}
				<NavLink to="/todolists" className="breadcrumb title">
						<h1>{activeListId?toDoListName:'TO DO LISTS'}</h1>
				</NavLink>
				<div className="breadcrumb_icons">
					<NavLink to="/todolists" className="breadcrumb profile">
					</NavLink>
					<div className="breadcrumb logout pointer" onClick={onClick}>
					</div>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	)
}