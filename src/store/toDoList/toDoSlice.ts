import { createAppSlice } from '../../app/createAppSlice'
import { deleteList, deleteListItem, fetchList, fetchLists, putList, putListItem, postList, postListItem } from './toDoAPI'
import type { StoreStatus, ToDoListItemType, ToDoListType } from '../../types'
import { removeListItemFromArray } from '../../utils/list'

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

// If you are not using async thunks you can use the standalone `createSlice`.
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
          state.getListsStatus = 'loading'
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
      async (listId?: string) => {
        const response: ToDoListType = await fetchList(listId)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.getListStatus = 'loading'
        },
        fulfilled: (state, action) => {
          state.getListStatus = 'fulfilled'
          let found = false
          for (let list of state.toDoLists) {
            if (list.id === action.payload.id) {
              Object.assign(list, action.payload)
              found = true
            }
          }
          if (!found) {
            state.toDoLists.push(action.payload)
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
          state.addListStatus = 'loading'
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
    /* getListItems: create.asyncThunk(
      async (listId: string) => {
        const response = await fetchListItems(listId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.getListItemsStatus = "loading"
        },
        fulfilled: (state, action) => {
          state.getListItemsStatus = "idle"
          state.value[action.payload.name] = action.payload
        },
        rejected: state => {
          state.getListItemsStatus = "failed"
        },
      },
    ), */
    addListItem: create.asyncThunk(
      async (listItem: ToDoListItemType): Promise<string> => {
        const response = await putListItem(listItem)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.addListItemStatus = 'loading'
        },
        fulfilled: (state, action) => {
          state.addListItemStatus = 'fulfilled'
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
          state.updateListStatus = 'loading'
        },
        fulfilled: (state, action) => {
          state.updateListStatus = 'fulfilled'
          state.toDoLists[action.payload.name] = action.payload
        },
        rejected: state => {
          state.updateListStatus = 'failed'
        },
      },
    ),
    updateListItem: create.asyncThunk(
      async (listItem: ToDoListItemType) => {
        const response = await postListItem(listItem)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.updateListItemStatus = 'loading'
        },
        fulfilled: (state, action) => {
          state.updateListItemStatus = 'fulfilled'
          state.toDoLists[action.payload.listName] = action.payload
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
          state.removeListStatus = 'loading'
        },
        fulfilled: (state, action) => {
          state.removeListStatus = 'fulfilled'
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
          state.removeListItemStatus = 'loading'
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
      console.log(toDo, listId)
      const ret = toDo.toDoLists.find(list => {
        return list.id === listId
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

// Action creators are generated for each case reducer function.
export const { getLists, getList, addList, addListItem, removeListItem, removeList, updateList, updateListItem } = toDoSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectLists, selectListsStatus, selectList, selectListStatus, selectAddListStatus, selectAddListItemStatus, selectDeleteListItemStatus, selectDeleteListStatus, selectListItemsStatus, selectUpdateListItemStatus, selectUpdateListStatus } = toDoSlice.selectors
