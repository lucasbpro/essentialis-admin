/************ Action types ***************************************************/
export const TOGGLE_USER_LOGGED = "toggle_user_logged";
export const SET_USER_TOKEN = "set_user_token";
export const SET_RECIPE_LIST = "set_recipe_list";
export const SET_CUSTOMERS_LIST = "set_customers_list";
export const SET_ORDERS_LIST = "set_orders_list";


/************ Reducer ********************************************************/
const initialState = {
    isUserLogged: true,
    userToken: "",
    recipeList: [],
    customerList: [],
    orderList: []
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_USER_LOGGED: {
            return {
                ...state,
                isUserLogged: !state.isUserLogged
            };
        }

        case SET_USER_TOKEN: {
            return {
                ...state,
                userToken: action.payload
            };
        }

        case SET_RECIPE_LIST: {
            return {
                ...state,
                recipeList: action.payload
            };
        }

        case SET_CUSTOMERS_LIST: {
            return {
                ...state,
                customerList: action.payload
            };
        }

        case SET_ORDERS_LIST: {
            return {
                ...state,
                orderList: action.payload
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
  
export function setUserToken(token) {
    return {
        type: SET_USER_TOKEN,
        payload: token
    };
}

export function setRecipeList(recipeList) {
    return {
        type: SET_RECIPE_LIST,
        payload: recipeList
    };
}

export function setCustomerList(customerList) {
    return {
        type: SET_CUSTOMERS_LIST,
        payload: customerList
    };
}

export function setOrderList(orderList) {
    return {
        type: SET_ORDERS_LIST,
        payload: orderList
    };
}