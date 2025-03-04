import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../app/createAppSlice'
import { fetchLogin, fetchLogout } from './userManagementAPI'
import type { BreadcrumbNavigationStateType, StoreStatus } from '../../types'

export interface UserManagementSliceState {
  token: string
  username: string
  password: string
  breadcrumbNavigationState: BreadcrumbNavigationStateType
  status: StoreStatus
}

const initialState: UserManagementSliceState = {
  token: '',
  username: '',
  breadcrumbNavigationState: {},
  status: 'idle',
  password: '',
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userManagement = createAppSlice({
  name: 'userManagement',
  // `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // When the user clicks on a list, we want to set the active list in the breadcrumb
    setActiveList: create.reducer((state, action: PayloadAction<string>) => {
      state.breadcrumbNavigationState.activeListId = action.payload
    }),

    // Login to the To Do Lists App
    login: create.asyncThunk(
      async ({ username, password }: { username: string; password: string }) => {
        const response = await fetchLogin(username, password)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'fulfilled'
          state.token = action.payload
        },
        rejected: state => {
          state.status = 'failed'
        },
      },
    ),
    logout: create.asyncThunk(
      async (listId: string) => {
        const response = await fetchLogout(listId)
        return response
      },
      {
        pending: state => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'fulfilled'
          state.token = ''
        },
        rejected: state => {
          state.status = 'failed'
        },
      },
    ),
  }),
  // Selectors
  selectors: {
    selectToken: userManagement => userManagement.token,
    selectStatus: userManagement => userManagement.status,
    selectBreadCrumbNavigationState: userManagement => userManagement.breadcrumbNavigationState,
  },
})

// Action creators are generated for each case reducer function.
export const { login, logout } = userManagement.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectToken, selectBreadCrumbNavigationState } = userManagement.selectors
