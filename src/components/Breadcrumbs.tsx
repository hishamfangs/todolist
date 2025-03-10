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
	const [token, setToken] = useLocalStorage('token', '')
	const refName = useRef<HTMLTextAreaElement>(null);
	const [toDoListName, setToDolistName] = useState(listName);
	
	function onClick(){
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/');
		/* setTimeout(() => {
			navigate('/');
		}, 1000); */
		//navigate('/');
	}
	useEffect(() => {
		if (activeListId) {
			setToDolistName(listName);
		}
	}, [listName]);
	
	function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
/* 		console.log(event)
		if (event.code === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			//debugger;
			refName.current?.blur();
			updateName();
		} */
	}
		
	function handleKeyDownPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
		console.log(event)
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