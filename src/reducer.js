/************ Action types ***************************************************/
export const TOGGLE_USER_LOGGED = "toggle_user_logged";


/************ Reducer ********************************************************/
const initialState = {
    isUserLogged: false
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_USER_LOGGED: {
            console.log("chegou aqui")
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
  