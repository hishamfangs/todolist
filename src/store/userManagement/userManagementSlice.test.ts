import type { AppStore } from '../store'
import { makeStore } from '../store'
import type { UserManagementSliceState } from './userManagementSlice'
import { login, userManagement } from './userManagementSlice'
import {} from './userManagementSlice'

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>('Setup User Management Store', it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: UserManagementSliceState = {
      token: '',
      username: '',
      password: '',
      breadcrumbNavigationState: {
        /* initialize with appropriate properties */
      },
      status: 'idle',
    }

    const store = makeStore({ userManagement: initialState })

    context.store = store
  })

  it('should handle initial state', () => {
    expect(userManagement.reducer(undefined, { type: 'unknown' })).toStrictEqual({
      token: '',
      username: '',
      password: '',
      breadcrumbNavigationState: {
        /* initialize with appropriate properties */
      },
      status: 'idle',
    })
  })

  it('should handle User Login', ({ store }) => {
    expect(login({ username: 'test', password: '1234' }).length).toBeGreaterThan(1)
  })
})
