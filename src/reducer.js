/************ Action types ***************************************************/
export const TOGGLE_USER_LOGGED = "toggle_user_logged";
export const TOGGLE_MODAL = "toggle_throw_modal";
export const SET_USER_TOKEN = "set_user_token";
export const SET_RECIPE_LIST = "set_recipe_list";
export const SET_CUSTOMERS_LIST = "set_customers_list";
export const SET_ORDERS_LIST = "set_orders_list";
export const SET_MATERIALS_LIST = "set_materials_list";


/************ Reducer ********************************************************/
const initialState = {
    isUserLogged: true,
    userToken: "",
    recipeList: [],
    customerList: [],
    orderList: [],
    materialsList: [],
    throwModal: false,
    itemToDelete: {},
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_USER_LOGGED: {
            return {
                ...state,
                isUserLogged: !state.isUserLogged
            };
        }

        case TOGGLE_MODAL: {
            return {
                ...state,
                throwModal: !state.throwModal
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

        case SET_MATERIALS_LIST: {
            return {
                ...state,
                materialsList: action.payload
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

export function toggleThrowModal() {
    return {
        type: TOGGLE_MODAL
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

export function setMaterialsList(materialsList) {
    return {
        type: SET_MATERIALS_LIST,
        payload: materialsList
    };
}