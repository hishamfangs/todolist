import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"
import { ToDoLists } from "./components/ToDoLists"
import { Breadcrunmbs } from "./Breadcrunmbs"


const App = () => {
  return (
    <div className="App">
			<Breadcrunmbs />
      <ToDoLists />
    </div>
  )
}

export default App
