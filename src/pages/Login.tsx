import { Suspense, useEffect, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"
import ThemeSwitcher from "../components/ThemeSwitcher"
import { NavLink, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { AppDispatch } from "../store/store"
import { login, selectStatus, selectToken } from "../store/userManagement/userManagementSlice"
import { useLocalStorage } from "@uidotdev/usehooks"

/* 
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/userManagement/toDoSlice"
 */

export const Login = (): JSX.Element => {
	const dispatch: AppDispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const status = useAppSelector(selectStatus);
	const [tokenLocal, setTokenLocal] = useLocalStorage('token', '');
  //const toDoLists: ToDoListType[] = useAppSelector(selectLists)
  //const status = useAppSelector(selectListsStatus);
  //const [toDoLists, setToDoLists] = useState();

	useEffect(() => {
		debugger;
		setTokenLocal(token);
		if (token && token !== '""'){
			navigate('/todolists');
		}
	}, [token]);

	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function onClick(e: React.MouseEvent<HTMLButtonElement>){
		console.log("Login", e);
		dispatch(login({username: username, password: password}));
	}

  return (
    <div id="login" className="card">
				<Suspense fallback={<div>Loading...</div>}>
				<div className="container">
					<div className="title">
								<h1>LOGIN</h1>
								<ThemeSwitcher />
							</div>
							<div className="form">
								<div className="input">
									<label htmlFor="username">Username</label>
									<input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
								</div>
								<div className="input">
									<label htmlFor="password">Password</label>
									<input type="password" id="password" name="password"  value={password} onChange={e => setPassword(e.target.value)} />
								</div>
								<div className="submit">
									<button onClick={onClick} className="pointer">Login</button>
								</div>
							</div>
					</div>
				</Suspense>
    </div>
  )
}
