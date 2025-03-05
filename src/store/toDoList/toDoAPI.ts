import type { ToDoListType, ToDoListItemType } from '../../types'
import { apiURL } from '/src/utils/global'
// Get To Do Lists
export async function fetchLists(filter: string = '') {
  /*   const response = await fetch(`${apiURL}toDoLists/${filter}`)
  return response.json() */
  return [
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
  ]
}
// Get To Do List
export async function fetchList(id?: string): Promise<ToDoListType> {
  if (!id) {
    return { id: '', name: '', listItems: [] }
  }
  const todo: ToDoListType = {
    id: '1',
    name: 'Grocery List',
    description: 'My grocery list for the week',
    lastUpdated: new Date().toString(),
    listItems: [
      {
        id: '1',
        name: 'Milk',
        completed: false,
      },
      {
        id: '2',
        name: 'Eggs',
        completed: true,
      },
      {
        id: '3',
        name: 'Bread',
        completed: false,
      },
    ],
  }
  return todo
  /*   const response = await fetch(`${apiURL}toDoList/${id}`)
  return response.json() */
}
/* export async function fetchListItems(id: string) {
  const response = await fetch(`${apiURL}toDoListItem/${id}`)
  return response.json()
} */
// Add To Do List
export async function putList(list: ToDoListType): Promise<ToDoListType> {
  /*   const response = await fetch(`${apiURL}toDoList`, {
    method: 'PUT',
    body: JSON.stringify(list),
  })
  return response.json() */
  return { ...list, id: Math.random().toString(36).substring(7), lastUpdated: new Date().toString() }
}
// Update To Do List
export async function postList(list: ToDoListType) {
  const response = await fetch(`${apiURL}toDoList/${list.id}`, {
    method: 'POST',
    body: JSON.stringify(list),
  })
  return response.json()
}
// Delete To Do List
export async function deleteList(id: string) {
  const response = await fetch(`${apiURL}toDoList/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
// Delete To Do List
export async function deleteListItem(id: string, itemId: string): Promise<boolean> {
  /*  const response = await fetch(`${apiURL}toDoListItem/${id}/${itemId}`, {
    method: 'DELETE',
  })
  return response.json() */
  return true
}
// Add To Do List Item
export async function putListItem(listId: string, item: ToDoListItemType): Promise<ToDoListItemType> {
  return { ...item, listId: listId, id: Math.random().toString(36).substring(7), lastUpdated: new Date().toString() }
  /* const response = await fetch(`${apiURL}toDoListItem/`, {
    method: 'PUT',
    body: JSON.stringify(item),
  })
  return response.json() */
}
// Update To Do List Item
export async function postListItem(item: ToDoListItemType) {
  const response = await fetch(`${apiURL}toDoListItem/${item.listId}/${item.id}`, {
    method: 'POST',
    body: JSON.stringify(item),
  })
  return response.json()
}
