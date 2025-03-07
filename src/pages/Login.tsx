import { Suspense, useEffect, useState } from "react"
//import { ToDoList } from "./ToDoList"
import type { ToDoListType } from "../types"
import ThemeSwitcher from "../components/ThemeSwitcher"
import { NavLink, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { AppDispatch } from "../store/store"
import { login, selectStatus, selectToken } from "../store/userManagement/userManagementSlice"
import { useLocalStorage } from "@uidotdev/usehooks"

export const Login = (): JSX.Element => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('user1');
	const [password, setPassword] = useState('123456');

	// Loading the store
	const dispatch: AppDispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const status = useAppSelector(selectStatus);
	const [tokenLocal, setTokenLocal] = useLocalStorage('token', '');

	// if the localToken is set, navigate to the Todolists page
	useEffect(() => {
		setTokenLocal(token);
		if (token && token !== '""'){
			navigate('/todolists');
		}
	}, [token]);

	function doLogin(){
		console.log("Login Initiated");
		// Login & Set the Token when Button is clicked
		dispatch(login({username: username, password: password}));
	}

	function onClick(e: React.MouseEvent<HTMLButtonElement>){
		doLogin();
	}

	function onEnter(e: React.KeyboardEvent<HTMLInputElement>){
		if (e.key === 'Enter') {
			doLogin();
		}
	}

  return (
		<div id="container" className="login">
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
										<input type="password" id="password" name="password"  value={password} onChange={e => setPassword(e.target.value)} onKeyUp={onEnter} />
									</div>
									<div className={"submit " + status}>
										<button onClick={onClick} className="pointer">Login</button>
									</div>
								</div>
						</div>
					</Suspense>
			</div>
		</div>
  )
}
