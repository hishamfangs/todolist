


export interface ToDoListType {
	id: string
	name: string
	description?: string
	lastUpdated?: Date,
	listItems?: ToDoListItemType[]
}
export interface ToDoListItemType {
	id: string
	name: string
	completed: boolean
	lastUpdated?: Date,
	listName?: string,
	listId?: string
}
