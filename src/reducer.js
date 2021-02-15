/************ Action types ***************************************************/
export const TOGGLE_USER_LOGGED = "toggle_user_logged";


/************ Reducer ********************************************************/
const initialState = {
    isUserLogged: true
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_USER_LOGGED: {
            return {
                ...state,
                isUserLogged: !state.isUserLogged
            };
        }

        default:
            return state;
    }
}

/************ Actions ********************************************************/
export function toggleUserLogged() {
    return {
      type: TOGGLE_USER_LOGGED
    };
  }
  