
import { ToDoLists } from "./components/ToDoLists"
import Breadcrumbs from "./components/Breadcrumbs"
import { createBrowserRouter, matchPath, RouterProvider, useMatch } from "react-router-dom"
import { Login } from "./components/Login"
import { ToDoList } from "./components/ToDoList"
import ToDoListPage from "./pages/ToDoListPage"
import LoggedIn from "./pages/LoggedIn"

const App = () => {

	// Setup React Router
	const routes = createBrowserRouter([
		{
			path: '/', 
			element: <Login />
		},{
			path: '/todolists', 
			element: <LoggedIn />,
			children: [
				{
					path: '', 
					element: <ToDoLists />,
				},
				{
					path: 'todolist/:id', 
					element: <ToDoListPage />
				}]
		},{
			
		}
	])

  return (
    <div className="App">
			<div id="container">
				<RouterProvider router={routes}/>
			</div>
		</div>
  )
}

export default App
