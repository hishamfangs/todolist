import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"
import ThemeSwitcher from "./ThemeSwitcher"
import { NavLink, useNavigate } from "react-router"

/* 
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getLists, getList, selectLists, selectListsStatus
} from "../store/userManagement/toDoSlice"
 */

export const Login = (): JSX.Element => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus);
	dispatch(getLists()); */
  //const [toDoLists, setToDoLists] = useState();
	const navigate = useNavigate();


	function onClick(e: React.MouseEvent<HTMLButtonElement>){
		console.log("Login", e);
		navigate(`/todolists`);
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
									<input type="text" id="username" name="username" />
								</div>
								<div className="input">
									<label htmlFor="password">Password</label>
									<input type="password" id="password" name="password" />
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
