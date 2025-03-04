import type { ToDoListType } from '../types'

export function removeListItemFromArray(toDoLists: ToDoListType[], listId: string, itemId: string): ToDoListType[] {
  const indexOfList = toDoLists.findIndex(x => x.id === listId)
  if (indexOfList === -1 || !toDoLists[indexOfList]) {
    console.log('Error: Cannot find list with id: ' + listId + ', or list is undefined')
    throw new Error('Error: Cannot find list with id: ' + listId + ', or list is undefined')
  }
  const indexOfItem: number | undefined = toDoLists[indexOfList].listItems?.findIndex(x => x.id === itemId)
  if (indexOfItem === -1 || indexOfItem === undefined) {
    console.log('Error: Cannot find List item with id: ' + itemId + ', in Item List: ' + listId)
    throw new Error('Error: Cannot find List item with id: ' + itemId + ', in Item List: ' + listId)
  }
  toDoLists[indexOfList].listItems?.splice(indexOfItem, 1)
  return toDoLists
}
