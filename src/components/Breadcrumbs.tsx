import { NavLink, useNavigate } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectActiveListId, selectBreadCrumbNavigationState } from "../store/userManagement/userManagementSlice";
import type { BreadcrumbNavigationStateType } from "../types";
import { selectList, updateList } from "../store/toDoList/toDoSlice";
import { useLocalStorage } from "@uidotdev/usehooks"
import { useRef, useState } from "react";

export default function Breadcrumbs() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const activeListId: string | undefined = useAppSelector(selectActiveListId);
	const listName = useAppSelector((state) => activeListId ? selectList(state, activeListId)?.name : '');
	const [token, setToken] = useLocalStorage('token', '')
	const refName = useRef<HTMLInputElement>(null);
	const [toDoListName, setToDolistName] = useState(listName);
	
	function onClick(){
		dispatch(logout());
		setToken('');
		navigate('/');
	}

	function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			refName.current?.blur();
			updateName();
		}
	}
	function updateName(): void{
		if (activeListId) {
			dispatch(updateList({name: refName.current?.value, id:activeListId}));
		}
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
				<h1>
					{
						activeListId?
						<input ref={refName} onKeyUp={handleKeyPress} value={toDoListName} onChange={(e)=>setToDolistName(e.currentTarget.value)} onBlur={updateName} />
						:
						'TO DO LISTS'
					}
				</h1>

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