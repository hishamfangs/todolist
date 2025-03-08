import type { ToDoListType, ToDoListItemType } from '../../types'
import { apiURL } from '/src/utils/global'
// Get To Do Lists
class ToDoError extends Error {
	code: number
	constructor(message: string, code: number) {
		super(message)
		this.code = code
	}
}

export async function fetchLists(filter: string = '') {
	try {
		const response = await fetch(`${apiURL}/toDoLists/${filter}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
			},
		})
		if (response.status == 500 || response.status == 404 || response.status == 400) {
			throw new Error('fetchLists(): ' + response.statusText)
		}
		if (response.status == 401) {
			throw new ToDoError('fetchLists(): ' + response.statusText, 401)
		}
		return response.json()
	} catch (e) {
		console.log('fetchLists(): ' + e)
		throw new Error('fetchLists(): ' + e)
	}

	/* return [
		{
			id: '1',
			name: 'Grocery List',
			description: 'My grocery list for the week',
			lastUpdated: new Date().toString(),
			listItems: [],
		},
		{
			id: '2',
			name: 'Work Tasks For 4th Week of March',
			description: 'This is a description for the work Tasks For 4th Week of March',
			lastUpdated: new Date().toString(),
			listItems: [],
		},
	] */
}
// Get To Do List
export async function fetchList(id?: string): Promise<ToDoListType> {
	if (!id) {
		return { id: '', name: '', listItems: [] }
	}
	try {
		const response = await fetch(`${apiURL}/toDoLists/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
			},
		})
		if (response.status == 500 || response.status == 404 || response.status == 400) {
			throw new Error('fetchList(): ' + response.statusText)
		}
		if (response.status == 401) {
			throw new ToDoError('fetchList(): ' + response.statusText, 401)
		}
		const json: ToDoListType[] = await response.json()
		if (json.length > 0) {
			return json[0]
		}
		throw new Error('fetchList(): for ' + id + ' not found')
	} catch (e) {
		console.log('fetchList(): ' + e)
		throw new Error('fetchList(): ' + e)
	}
}
/* export async function fetchListItems(id: string) {
	const response = await fetch(`${apiURL}toDoListItem/${id}`)
	return response.json()
} */
// Add To Do List
export async function putList(list: ToDoListType): Promise<ToDoListType> {
	const response = await fetch(`${apiURL}/toDoLists`, {
		method: 'PUT',
		body: JSON.stringify(list),
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
		},
	})
	if (response.status == 500 || response.status == 404 || response.status == 400) {
		throw new Error('putList(): ' + response.statusText)
	}
	if (response.status == 401) {
		throw new ToDoError('putList(): ' + response.statusText, 401)
	}
	const res = await response.json()
	if (res.length > 0) {
		return res[0]
	}
	throw new Error('putList(): ' + response.statusText)
	//return { ...list, id: Math.random().toString(36).substring(7), lastUpdated: new Date().toString() }
}
// Update To Do List
export async function postList(list: ToDoListType) {
	const response = await fetch(`${apiURL}/toDoLists/${list.id}`, {
		method: 'POST',
		body: JSON.stringify(list),
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
		},

	})
	return response.json()
}
// Delete To Do List
export async function deleteList(id: string) {
	const response = await fetch(`${apiURL}/toDoLists/${id}`, {
		method: 'DELETE',
	})
	return response.json()
}
// Delete To Do List
export async function deleteListItem(id: string, itemId: string): Promise<boolean> {
	const response = await fetch(`${apiURL}/toDoLists/${id}/toDoListItems/${itemId}`, {
		method: 'DELETE',
	})
	return response.json()
}
// Add To Do List Item
export async function putListItem(listId: string, item: ToDoListItemType): Promise<ToDoListItemType> {
	//return { ...item, listId: listId, id: Math.random().toString(36).substring(7), lastUpdated: new Date().toString() }
	const response = await fetch(`${apiURL}/toDoLists/${listId}/toDoListItems/`, {
		method: 'PUT',
		body: JSON.stringify(item),
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
		},
	})
	return await response.json()
}
// Update To Do List Item
export async function postListItem(item: ToDoListItemType) {
	const response = await fetch(`${apiURL}/toDoListItem/${item.listId}/${item.id}`, {
		method: 'POST',
		body: JSON.stringify(item),
	})
	return response.json()
}
