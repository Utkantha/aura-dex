import type { AppAction, AppState } from "@/lib/types";
import { GET_LOADING_FALSE, GET_LOADING_TRUE, GET_LOGOUT_USER, GET_POKEMON_DATA_FAILURE, GET_POKEMON_DATA_REQUEST, GET_POKEMON_DATA_SUCCESS, GET_SINGLE_POKEMON_FAILURE, GET_SINGLE_POKEMON_REQUEST, GET_SINGLE_POKEMON_SUCCESS, GET_USER_FAILURE, GET_USER_LOGIN, GET_USER_REQUEST, GET_USER_SUCCESS } from "./action-types";
import Cookies from "js-cookie";


const initialState: AppState = {
    isLoggedIn: false || Boolean(Cookies.get("isLoggedIn")),
    userData: {},
    pokemonData: [],
    singlePokemon: {},
    isLoading: false,
    isError: false,
    pageLoading: false
}

export const reducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, userData: action.payload };
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, isError: true };
        case GET_POKEMON_DATA_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case GET_POKEMON_DATA_SUCCESS:
            return { ...state, isLoading: false, pokemonData: action.payload };
        case GET_POKEMON_DATA_FAILURE:
            return { ...state, isLoading: false, isError: true }
        case GET_SINGLE_POKEMON_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case GET_SINGLE_POKEMON_SUCCESS:
            return { ...state, isLoading: false, singlePokemon: action.payload };
        case GET_SINGLE_POKEMON_FAILURE:
            return { ...state, isLoading: false, singlePokemon: {}, isError: true };
        case GET_USER_LOGIN:
            return { ...state, isLoggedIn: true }
        case GET_LOGOUT_USER:
            return initialState
        case GET_LOADING_TRUE:
            return { ...state, pageLoading: true };
        case GET_LOADING_FALSE:
            return { ...state, pageLoading: false }
        default:
            return state;
    }
}