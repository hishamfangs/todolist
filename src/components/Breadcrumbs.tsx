import { NavLink, useNavigate } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectActiveListId } from "../store/userManagement/userManagementSlice";
import { selectList, updateList } from "../store/toDoList/toDoSlice";
import { useLocalStorage } from "@uidotdev/usehooks"
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useRef, useState } from "react";

export default function Breadcrumbs() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const activeListId: string | undefined = useAppSelector(selectActiveListId);
	const listName = useAppSelector((state) => activeListId ? selectList(state, activeListId)?.name : '');
	const [, setToken] = useLocalStorage('token', '')
	const refName = useRef<HTMLTextAreaElement>(null);
	const [toDoListName, setToDolistName] = useState(listName);

	function onClick(){
		dispatch(logout());
		// Go through the hook's own setter (not a raw localStorage write) so every
		// `useLocalStorage('token', ...)` instance — including the one App.tsx
		// uses for ProtectedRoute — is notified the token changed.
		setToken('');
		navigate('/');
	}
	useEffect(() => {
		if (activeListId) {
			setToDolistName(listName);
		}
	}, [listName]);

	function handleKeyDownPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (event.code === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			//debugger;
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
						<TextareaAutosize ref={refName} onKeyDown={handleKeyDownPress} value={toDoListName} onChange={(e)=>setToDolistName(e.currentTarget.value)} onBlur={updateName} >{toDoListName}</TextareaAutosize >
						:
						'TO DO LISTS'
					}
				</h1>

				<div className="breadcrumb_icons">
					<div className="breadcrumb logout pointer" onClick={onClick}>
					</div>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	)
}