


export interface ToDoListType {
	id: string
	name: string
	description?: string
	lastUpdated?: string,
	listItems?: ToDoListItemType[]
}
export interface ToDoListItemType {
	id: string
	name: string
	completed: boolean
	lastUpdated?: string,
	listName?: string,
	listId?: string
}

export interface BreadcrumbNavigationStateType {
	activeListId?: string,
	activeListItemId?: string,
	backButton?: boolean
}

export type StoreStatus = 'idle' | 'loading' | 'fulfilled' | 'failed'
