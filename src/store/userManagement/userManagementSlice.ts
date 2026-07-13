import type { PayloadAction, StateFromReducersMapObject } from '@reduxjs/toolkit'
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
      async ({ username, password }: { username: string; password: string }, thunkApi) => {
        console.log('Login thunk started for username:', username)
        try {
          const response = await fetchLogin(username, password)
          console.log('Login response:', response)
          console.log('Extracted token:', response.token)
          return response.token
        } catch (error) {
          console.error('Login error in thunk:', error)
          throw error
        }
      },
      {
        pending: state => {
          console.log('Login pending')
          state.status = 'pending'
        },
        fulfilled: (state, action) => {
          console.log('Login fulfilled with token:', action.payload)
          state.status = 'fulfilled'
          state.token = action.payload
        },
        rejected: (state, action) => {
          console.log('Login rejected:', action.error)
          state.status = 'failed'
        },
      },
    ),
    logout: create.reducer(state => {
      state.token = ''
    }),
    /* 
    logout: create.asyncThunk(
      async (undefined, { getState }) => {
        const userManagement: UserManagementSliceState = getState() as StateFromReducersMapObject<UserManagementSliceState>
        const response = await fetchLogout(userManagement.username)
        return response
      },
      {
        pending: state => {
          state.status = 'pending'
        },
        fulfilled: (state, action) => {
          state.status = 'fulfilled'
          state.token = ''
        },
        rejected: state => {
          console.log('rejected')
          state.status = 'failed'
        },
      },
    ), */
  }),
  // Selectors
  selectors: {
    selectToken: userManagement => userManagement.token,
    selectStatus: userManagement => userManagement.status,
    selectBreadCrumbNavigationState: userManagement => userManagement.breadcrumbNavigationState,
    selectActiveListId: userManagement => userManagement.breadcrumbNavigationState.activeListId,
  },
})

// Action creators are generated for each case reducer function.
export const { login, logout, setActiveList } = userManagement.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectToken, selectBreadCrumbNavigationState, selectActiveListId } = userManagement.selectors
