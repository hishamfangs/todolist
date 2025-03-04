import type { ToDoListType, ToDoListItemType } from '../../types'

// Get To Do Lists
export async function fetchLists(filter: string = '') {
  /*   const response = await fetch(`https://urlfornow/toDoLists/${filter}`)
  return response.json() */
  return [
    {
      id: '1',
      name: 'To Do List 1',
      description: 'This is a description for To Do List 1',
      lastUpdated: new Date().toString(),
      listItems: [
        {
          id: '1',
          name: 'To Do List Item 1',
          completed: false,
          lastUpdated: new Date().toString(),
          listName: 'To Do List 1',
          listId: '1',
        },
      ],
    },
    {
      id: '2',
      name: 'To Do List 2',
      description: 'This is a description for To Do List 2',
      lastUpdated: new Date().toString(),
      listItems: [
        {
          id: '1',
          name: 'To Do List Item 1',
          completed: false,
          lastUpdated: new Date().toString(),
          listName: 'To Do List 1',
          listId: '2',
        },
        {
          id: '2',
          name: 'To Do List Item 2',
          completed: false,
          lastUpdated: new Date().toString(),
          listName: 'To Do List 2',
          listId: '2',
        },
      ],
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
  /*   const response = await fetch(`https://urlfornow/toDoList/${id}`)
  return response.json() */
}
/* export async function fetchListItems(id: string) {
  const response = await fetch(`https://urlfornow/toDoListItem/${id}`)
  return response.json()
} */
// Add To Do List
export async function putList(list: ToDoListType): Promise<ToDoListType> {
  /*   const response = await fetch(`https://urlfornow/toDoList`, {
    method: 'PUT',
    body: JSON.stringify(list),
  })
  return response.json() */
  return { ...list, id: Math.random().toString(36).substring(7), lastUpdated: new Date().toString() }
}
// Update To Do List
export async function postList(list: ToDoListType) {
  const response = await fetch(`https://urlfornow/toDoList/${list.id}`, {
    method: 'POST',
    body: JSON.stringify(list),
  })
  return response.json()
}
// Delete To Do List
export async function deleteList(id: string) {
  const response = await fetch(`https://urlfornow/toDoList/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
// Delete To Do List
export async function deleteListItem(id: string): Promise<boolean> {
  const response = await fetch(`https://urlfornow/toDoListItem/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
// Add To Do List Item
export async function putListItem(item: ToDoListItemType): Promise<string> {
  const response = await fetch(`https://urlfornow/toDoListItem/`, {
    method: 'PUT',
    body: JSON.stringify(item),
  })
  return response.json()
}
// Update To Do List Item
export async function postListItem(item: ToDoListItemType) {
  const response = await fetch(`https://urlfornow/toDoListItem/${item.listId}/${item.id}`, {
    method: 'POST',
    body: JSON.stringify(item),
  })
  return response.json()
}
