import type { ToDoListType, ToDoListItemType } from '../../types'
import { apiURL } from '/src/utils/global'
import { handleApiResponse, ApiError } from '../../utils/apiResponse'
import { sortListItems } from '../../utils/list'

function getheaders(): { 'Content-Type': string; authorization: string } {
  return {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('token')?.replaceAll('"', '') || '',
  }
}

export async function fetchLists(filter: string = '') {
  const response = await fetch(`${apiURL}/toDoLists/${filter}`, {
    method: 'GET',
    headers: getheaders(),
  })
  const lists = await handleApiResponse<ToDoListType[]>(response)
  return lists.map(list => sortListItems(list))
}
// Get To Do List
export async function fetchList(id?: string): Promise<ToDoListType> {
  if (!id) {
    return { id: '', name: '', listItems: [] }
  }
  const response = await fetch(`${apiURL}/toDoLists/${id}`, {
    method: 'GET',
    headers: getheaders(),
  })
  const lists = await handleApiResponse<ToDoListType[]>(response)
  if (lists.length > 0) {
    return sortListItems(lists[0])
  }
  throw new Error('fetchList(): for ' + id + ' not found')
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
    headers: getheaders(),
  })
  return handleApiResponse<ToDoListType>(response)
}
// Update To Do List
export async function postList(list: ToDoListType) {
  const response = await fetch(`${apiURL}/toDoLists/${list.id}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: getheaders(),
  })
  return handleApiResponse<null>(response)
}
// Delete To Do List
export async function deleteList(id: string) {
  const response = await fetch(`${apiURL}/toDoLists/${id}`, {
    method: 'DELETE',
    headers: getheaders(),
  })
  return handleApiResponse<null>(response)
}
// Delete To Do List Item
export async function deleteListItem(id: string, itemId: string): Promise<null> {
  const response = await fetch(`${apiURL}/toDoLists/${id}/toDoListItems/${itemId}`, {
    method: 'DELETE',
    headers: getheaders(),
  })
  return handleApiResponse<null>(response)
}
// Add To Do List Item
export async function putListItem(listId: string, item: ToDoListItemType): Promise<ToDoListItemType> {
  const response = await fetch(`${apiURL}/toDoLists/${listId}/toDoListItems/`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: getheaders(),
  })
  return handleApiResponse<ToDoListItemType>(response)
}
// Update To Do List Item
export async function postListItem(item: ToDoListItemType) {
  let completed = 0
  if (item.completed) {
    completed = 1
  } else {
    completed = 0
  }
  const response = await fetch(`${apiURL}/toDoLists/${item.listId}/toDoListItems/${item.id}`, {
    method: 'POST',
    body: JSON.stringify({ ...item, completed: completed }),
    headers: getheaders(),
  })
  return handleApiResponse<null>(response)
}
