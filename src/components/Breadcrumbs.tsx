import { NavLink, useNavigate } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectActiveListId, selectBreadCrumbNavigationState } from "../store/userManagement/userManagementSlice";
import type { BreadcrumbNavigationStateType } from "../types";
import { selectList } from "../store/toDoList/toDoSlice";
import { useLocalStorage } from "@uidotdev/usehooks"

export default function Breadcrumbs() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const activeListId: string | undefined = useAppSelector(selectActiveListId);
	const toDoListName = useAppSelector((state) => activeListId ? selectList(state, activeListId)?.name : '');
	const [token, setToken] = useLocalStorage('token', '')

	function onClick(){
		dispatch(logout());
		setToken('');
		navigate('/');
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