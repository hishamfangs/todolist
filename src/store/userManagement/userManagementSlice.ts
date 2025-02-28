import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../store"
import { fetchLogin, fetchLogout } from "./userManagementAPI"

export interface UserManagementSliceState {
  token: string
  username: string
  status: "idle" | "loading" | "failed"
}

const initialState: UserManagementSliceState = {
  token: "",
  username: "",
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userManagement = createAppSlice({
  name: "userManagement",
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

    login: create.asyncThunk(
      async ({
        username,
        password,
      }: {
        username: string
        password: string
      }) => {
        const response = await fetchLogin(username, password)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.token = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    logout: create.asyncThunk(
      async (listId: string) => {
        const response = await fetchLogout(listId)
        // The value we return becomes the `fulfilled` action payload
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.token = ""
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectToken: userManagement => userManagement.token,
    selectStatus: userManagement => userManagement.status,
  },
})

// Action creators are generated for each case reducer function.
export const { login, logout } = userManagement.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectToken } = userManagement.selectors
