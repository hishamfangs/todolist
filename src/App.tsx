
import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/Login"
import ToDoListPage from "./pages/ToDoListPage"
import LoggedIn from "./pages/LoggedIn"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Provider } from "react-redux"
import { makeStore } from "./store/store"
import { ToDoListsPage } from "./pages/ToDoListsPage"
import { ProtectedRoute } from "./components/ProtectedRoute"


const App = () => {
	// Each mount of App gets its own store instance — no shared module-level
	// singleton, so two instances of this app on one page stay independent.
	const [store] = useState(() => makeStore());
	// Initialize the theme from local storage
	const [theme] = useLocalStorage("theme","light");
	//const dispatch = useAppDispatch();
	const [token] = useLocalStorage("token", "");

	// Setup React Router
	const routes = createBrowserRouter([
		{
			path: '/', 
			element: <Login />
		},{
			path: '/todolists', 
			element: 
				<ProtectedRoute token={token}>
					<LoggedIn />
				</ProtectedRoute>,
			children: [
				{
					path: '', 
					element: <ToDoListsPage />,
				},
				{
					path: 'todolist/:id', 
					element: <ToDoListPage />
				}]
		},{
			
		}
	])
	
  return (
    <div className={"App " + theme + "theme"}>
			{/* ^ Use the 'theme' var to add a class named dark to the App Container if on dark mode */}
			<div className="background"></div>
			<Provider store={store}>
				<RouterProvider router={routes}/>
			</Provider>
			<span className="loadfont"></span>			
		</div>
  )
}

export default App
