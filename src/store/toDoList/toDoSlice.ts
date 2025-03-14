import { createAppSlice } from '../../app/createAppSlice'
import { deleteList, deleteListItem, fetchList, fetchLists, putList, putListItem, postList, postListItem } from './toDoAPI'
import type { StoreStatus, ToDoListItemType, ToDoListType } from '../../types'
import { removeListItemFromArray } from '../../utils/list'

/**
 * The `toDoSlice` is a Redux slice for managing the state of a to-do list application.
 * It includes various asynchronous thunks for performing CRUD operations on to-do lists and their items.
 *
 * @property {string} name - The name of the slice.
 * @property {object} initialState - The initial state of the slice.
 * @property {object} reducers - The reducers and associated actions for the slice.
 *
 * @method getLists - Fetches the list of to-do lists, with optional filtering.
 * @method getList - Fetches a specific to-do list by its ID.
 * @method addList - Adds a new to-do list.
 * @method addListItem - Adds a new item to a specific to-do list.
 * @method updateList - Updates an existing to-do list.
 * @method updateListItem - Updates an existing item in a to-do list.
 * @method removeList - Removes a to-do list by its ID.
 * @method removeListItem - Removes an item from a specific to-do list by its ID.
 *
 * @property {object} selectors - The selectors for accessing the state of the slice.
 * @method selectLists - Selects all to-do lists.
 * @method selectListsStatus - Selects the status of the getLists operation.
 * @method selectList - Selects a specific to-do list by its ID.
 * @method selectListStatus - Selects the status of the getList operation.
 * @method selectListItemsStatus - Selects the status of the getListItems operation.
 * @method selectAddListStatus - Selects the status of the addList operation.
 * @method selectAddListItemStatus - Selects the status of the addListItem operation.
 * @method selectUpdateListStatus - Selects the status of the updateList operation.
 * @method selectUpdateListItemStatus - Selects the status of the updateListItem operation.
 * @method selectDeleteListStatus - Selects the status of the removeList operation.
 * @method selectDeleteListItemStatus - Selects the status of the removeListItem operation.
 */
export interface ToDoSliceState {
  toDoLists: Array<ToDoListType>
  getListsStatus: StoreStatus
  getListStatus: StoreStatus
  getListItemsStatus: StoreStatus
  addListStatus: StoreStatus
  addListItemStatus: StoreStatus
  updateListStatus: StoreStatus
  updateListItemStatus: StoreStatus
  removeListStatus: StoreStatus
  removeListItemStatus: StoreStatus
}

const initialState: ToDoSliceState = {
  toDoLists: [],
  getListsStatus: 'idle',
  getListStatus: 'idle',
  getListItemsStatus: 'idle',
  addListStatus: 'idle',
  addListItemStatus: 'idle',
  updateListStatus: 'idle',
  updateListItemStatus: 'idle',
  removeListStatus: 'idle',
  removeListItemStatus: 'idle',
}

export const toDoSlice = createAppSlice({
  name: 'todoList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    /* increment: create.reducer(state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1
		}),
		decrement: create.reducer(state => {
			state.value -= 1
		}),
		// Use the `PayloadAction` type to declare the contents of `action.payload`
		incrementByAmount: create.reducer(
			(state, action: PayloadAction<number>) => {
				state.value += action.payload
			},
		), */
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.

    getLists: create.asyncThunk(
      async (filter?: string) => {
        const response = await fetchLists(filter)
        // The value we return becomes the `fulfilled` action payload
        console.log('Response', response)
        return response
      },
      {
        pending: state => {
          state.getListsStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.getListsStatus = 'fulfilled'
          state.toDoLists = action.payload
        },
        rejected: state => {
          state.getListsStatus = 'failed'
        },
      },
    ),
    getList: create.asyncThunk(
      async (listId: string) => {
        const response: ToDoListType = await fetchList(listId)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.getListStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.getListStatus = 'fulfilled'
          let found = false
          for (let l in state.toDoLists) {
            const list = state.toDoLists[l]
            if (String(list.id) === String(action.meta.arg)) {
              state.toDoLists[l] = { ...action.payload, id: String(action.payload.id) }
              found = true
              break
            }
          }
          if (!found) {
            state.toDoLists.push(action.payload)
          }
          // Sort the list items by Order
          for (let l in state.toDoLists) {
            sortListItems(state.toDoLists[l])
          }
        },
        rejected: state => {
          state.getListStatus = 'failed'
        },
      },
    ),
    addList: create.asyncThunk(
      async (list: ToDoListType): Promise<ToDoListType> => {
        const response = await putList(list)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.addListStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.addListStatus = 'fulfilled'
          state.toDoLists.push(action.payload)
        },
        rejected: state => {
          state.addListStatus = 'failed'
        },
      },
    ),
    addListItem: create.asyncThunk(
      async ({ listId, listItem }: { listId: string; listItem: ToDoListItemType }): Promise<ToDoListItemType> => {
        const response: ToDoListItemType = await putListItem(listId, listItem)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.addListItemStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.addListItemStatus = 'fulfilled'
          //state.toDoLists.push(action.payload)
          if (state.toDoLists.length > 0) {
            const found: number = state.toDoLists.findIndex(list => String(list.id).trim() === String(action.meta.arg.listId).trim())
            state.toDoLists[found]?.listItems?.push(action.payload)
            //selectList({ todoList: state }, action.payload.listId).push(action.payload)
          }
          //state.value = action.payload
        },
        rejected: state => {
          state.addListItemStatus = 'failed'
        },
      },
    ),
    updateList: create.asyncThunk(
      async (list: ToDoListType) => {
        const response = await postList(list)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.updateListStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.updateListStatus = 'fulfilled'
          // Update the state
          const index: number = state.toDoLists.findIndex(list => String(list.id).trim() === String(action.meta.arg.id).trim())
          state.toDoLists[index] = { ...state.toDoLists[index], ...action.meta.arg }
        },
        rejected: state => {
          state.updateListStatus = 'failed'
        },
      },
    ),
    updateListItem: create.asyncThunk(
      async (listItem: ToDoListItemType, { getState }) => {
        const state = getState() as ToDoSliceState
        // Update the state first so the UI is updated instantly
        const index: number = state.toDoLists.findIndex(list => String(list.id).trim() === String(listItem.listId).trim())
        // Find the index of the list item to be updated
        const itemsIndex: number | undefined = state.toDoLists[index].listItems?.findIndex(list => String(list.id).trim() === String(listItem.id).trim())
        // Ensure the listItems array exists before attempting to update
        if (itemsIndex === undefined || !state.toDoLists[index].listItems) {
          throw new Error('Item not found')
        } else {
          // Update the ListItems with the new values
          // action.meta.arg is the new listItem argument passed to the action
          state.toDoLists[index].listItems[itemsIndex] = { ...state.toDoLists[index].listItems[itemsIndex], ...listItem }
          //sortListItems(state.toDoLists[index]);
        }

        // Retroactively update the DB
        const response = await postListItem(listItem)
        return response.data
      },
      {
        pending: state => {
          state.updateListItemStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.updateListItemStatus = 'fulfilled'

          // Update the state
          const index: number = state.toDoLists.findIndex(list => String(list.id).trim() === String(action.meta.arg.listId).trim())
          // Find the index of the list item to be updated
          const itemsIndex: number | undefined = state.toDoLists[index].listItems?.findIndex(list => String(list.id).trim() === String(action.meta.arg.id).trim())
          // Ensure the listItems array exists before attempting to update
          if (itemsIndex === undefined || !state.toDoLists[index].listItems) {
            throw new Error('Item not found')
          } else {
            // Update the ListItems with the new values
            // action.meta.arg is the new listItem argument passed to the action
            state.toDoLists[index].listItems[itemsIndex] = { ...state.toDoLists[index].listItems[itemsIndex], ...action.meta.arg }
            //sortListItems(state.toDoLists[index]);
          }
        },
        rejected: state => {
          state.updateListItemStatus = 'failed'
        },
      },
    ),
    removeList: create.asyncThunk(
      async (listId: string) => {
        const response = await deleteList(listId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.removeListStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.removeListStatus = 'fulfilled'
          state.toDoLists = state.toDoLists.filter(list => String(list.id).trim() !== String(action.meta.arg).trim())
          //state.value = action.payload
        },
        rejected: state => {
          state.removeListStatus = 'failed'
        },
      },
    ),
    removeListItem: create.asyncThunk(
      async ({ listId, itemId }: { listId: string; itemId: string }) => {
        const response: boolean = await deleteListItem(listId, itemId)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.removeListItemStatus = 'pending'
        },
        fulfilled: (state, action) => {
          state.removeListItemStatus = 'fulfilled'
          state.toDoLists = removeListItemFromArray(state.toDoLists, action.meta.arg.listId, action.meta.arg.itemId)
        },
        rejected: state => {
          state.removeListItemStatus = 'failed'
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectLists: toDo => toDo.toDoLists,
    selectListsStatus: toDo => toDo.getListsStatus,
    selectList: (toDo, listId?: string) => {
      console.log('In Store: Select List has been called: for ' + listId)
      const ret = toDo.toDoLists.find(list => {
        return String(list.id).trim() === listId
      })
      console.log(ret)
      return ret
    },
    selectListStatus: toDo => toDo.getListStatus,
    selectListItemsStatus: toDo => toDo.getListItemsStatus,
    selectAddListStatus: toDo => toDo.addListStatus,
    selectAddListItemStatus: toDo => toDo.addListItemStatus,
    selectUpdateListStatus: toDo => toDo.updateListStatus,
    selectUpdateListItemStatus: toDo => toDo.updateListItemStatus,
    selectDeleteListStatus: toDo => toDo.removeListStatus,
    selectDeleteListItemStatus: toDo => toDo.removeListItemStatus,
  },
})

function sortListItems(list: ToDoListType) {
  if (list.listItems) {
    list.listItems.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order
      }
      return 0
    })
  }
}
// Action creators are generated for each case reducer function.
export const { getLists, getList, addList, addListItem, removeListItem, removeList, updateList, updateListItem } = toDoSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectLists, selectListsStatus, selectList, selectListStatus, selectAddListStatus, selectAddListItemStatus, selectDeleteListItemStatus, selectDeleteListStatus, selectListItemsStatus, selectUpdateListItemStatus, selectUpdateListStatus } = toDoSlice.selectors
