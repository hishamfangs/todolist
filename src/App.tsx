
import { ToDoLists } from "./components/ToDoLists"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./components/Login"
import ToDoListPage from "./pages/ToDoListPage"
import LoggedIn from "./pages/LoggedIn"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { ToDoListsPage } from "./pages/ToDoListsPage"

const App = () => {
	// Initialize the theme from local storage
	const [theme] = useLocalStorage("theme","light");

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
					element: <ToDoListsPage />,
				},
				{
					path: 'todolist/:id', 
					element: <ToDoListPage />
				}]
		},{
			
		}
	])
	console.log('App.tsx');
  return (
    <div className={"App " + theme + "theme"}>
			{/* ^ Use the 'theme' var to add a class named dark to the App Container if on dark mode */}
			<Provider store={store}>
				<div id="container">
					<RouterProvider router={routes}/>
				</div>
			</Provider>			
		</div>
  )
}

export default App
