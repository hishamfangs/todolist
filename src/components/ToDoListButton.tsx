import { Suspense, useState } from "react"
//import { ToDoList } from "./ToDoList"
import { useNavigate } from "react-router"
import { DateComponent } from "./DateComponent"

export const ToDoListButton = (params: any) => {
/*   const dispatch: AppDispatch = useAppDispatch()
  const toDoLists: ToDoListsType[] = useAppSelector(selectLists)
  const status = useAppSelector(selectListsStatus); */

	//ispatch(getLists());
  //const [toDoLists, setToDoLists] = useState();.
	const navigate = useNavigate();
	const [toDoList] = useState(params.toDoList);

	function onClick(e: React.MouseEvent<HTMLDivElement>){
		console.log("ToDoList", e);
		navigate(`/todolists/todolist/${toDoList.id}`);
	}

  return (
		<div className="todo-list-button listButton" onClick={onClick}>
			<div className="container">
				<div className="title">
					<div className="text">{toDoList.name}</div>
					<div className="description">{toDoList.description}</div>
				</div>
				<DateComponent date={new Date(toDoList.lastUpdated)} />
			</div>
		</div>
  )
}
