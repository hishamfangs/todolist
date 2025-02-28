import type { ToDoListType, ToDoListItemType } from "../../types"

// Get To Do Lists
export async function fetchLists(filter: string = "") {
  const response = await fetch(`https://urlfornow/toDoLists/${filter}`)
  return response.json()
}
// Get To Do List
export async function fetchList(id: string) {
  const response = await fetch(`https://urlfornow/toDoList/${id}`)
  return response.json()
}
/* export async function fetchListItems(id: string) {
  const response = await fetch(`https://urlfornow/toDoListItem/${id}`)
  return response.json()
} */
// Add To Do List
export async function putList(list: ToDoListType): Promise<ToDoListType> {
  const response = await fetch(`https://urlfornow/toDoList`, {
    method: "PUT",
    body: JSON.stringify(list),
  })
  return response.json()
}
// Update To Do List
export async function postList(list: ToDoListType) {
  const response = await fetch(`https://urlfornow/toDoList/${list.id}`, {
    method: "POST",
    body: JSON.stringify(list),
  })
  return response.json()
}
// Delete To Do List
export async function deleteList(id: string) {
  const response = await fetch(`https://urlfornow/toDoList/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
// Delete To Do List
export async function deleteListItem(id: string): Promise<boolean> {
  const response = await fetch(`https://urlfornow/toDoListItem/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
// Add To Do List Item
export async function putListItem(item: ToDoListItemType): Promise<string> {
  const response = await fetch(`https://urlfornow/toDoListItem/`, {
    method: "PUT",
    body: JSON.stringify(item),
  })
  return response.json()
}
// Update To Do List Item
export async function postListItem(item: ToDoListItemType) {
  const response = await fetch(
    `https://urlfornow/toDoListItem/${item.listId}/${item.id}`,
    {
      method: "POST",
      body: JSON.stringify(item),
    },
  )
  return response.json()
}
