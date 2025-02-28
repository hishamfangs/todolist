import type { AppStore } from "../store"
import { makeStore } from "../store"
import { addList, getList, selectLists, toDoSlice, type ToDoSliceState } from "./toDoSlice"
import { ToDoListType } from "../../types"

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>("To Do List Reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: ToDoSliceState = {
      value: {
        "Sample ToDo": {
          id: "1",
          name: "Sample ToDo",
          description: "This is a sample ToDo list",
          lastUpdated: new Date(),
          listItems: [],
        },
      },
      getListsStatus: "idle",
      getListItemsStatus: "idle",
      addListStatus: "idle",
      addListItemStatus: "idle",
      updateListStatus: "idle",
      updateListItemStatus: "idle",
      removeListStatus: "idle",
      removeListItemStatus: "idle",
    }

    const store = makeStore({ counter: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(toDoSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      value: 0,
      status: "idle",
    })
  })

  it("should handle fetching lists", ({ store }) => {
    expect(selectLists(store.getState())).toBe({
      "list 1": {
        id: "1",
        name: "list 1",
        description: "This is list 1",
        lastUpdated: new Date(),
        listItems: [],
      },
    })
  })

  it("should handle adding lists", ({ store }) => {
    store.dispatch(
      addList({
        id: "2",
        name: "New ToDo",
        description: "This is a new ToDo list",
        lastUpdated: new Date(),
        listItems: [],
      }),
    )
    expect(getList(store.getState())).toBe(getList.length > 0)
  })
})
