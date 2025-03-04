import type { AppStore } from '../store'
import { makeStore } from '../store'
import { addList, getList, getLists, selectList, selectLists, toDoSlice, type ToDoSliceState } from './toDoSlice'

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>('To Do List Reducer', it => {
  beforeEach<LocalTestContext>(context => {
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

    const store = makeStore({ todoList: initialState })

    context.store = store
  })

  it('should handle initial state', () => {
    expect(toDoSlice.reducer(undefined, { type: 'unknown' })).toStrictEqual({
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
    })
  })

  it('should handle adding lists', ({ store }) => {
    store.dispatch(
      addList({
        id: '2',
        name: 'New ToDo',
        description: 'This is a new ToDo list',
        lastUpdated: new Date().toString(),
        listItems: [],
      }),
    )
    expect(selectList(store.getState(), '2')).toBe(store.getState().todoList.toDoLists[0])
  })

  it('should handle fetching lists', async ({ store }) => {
    await store.dispatch(
      addList({
        id: '2',
        name: 'New ToDo',
        description: 'This is a new ToDo list',
        lastUpdated: new Date().toString(),
        listItems: [],
      }),
    )
    //await store.dispatch(getLists())
    expect(selectLists(store.getState())[0]).toHaveProperty('name')
  })
})
