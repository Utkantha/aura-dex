import axios from "axios";
import Cookies from "js-cookie";
import type { Dispatch } from "redux";
import { GET_LOADING_FALSE, GET_LOADING_TRUE, GET_LOGOUT_USER, GET_POKEMON_DATA_FAILURE, GET_POKEMON_DATA_REQUEST, GET_POKEMON_DATA_SUCCESS, GET_SINGLE_POKEMON_FAILURE, GET_SINGLE_POKEMON_REQUEST, GET_SINGLE_POKEMON_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./action-types";

const url = import.meta.env.VITE_BACKEND_URL || "";

const getHeaders = () => {
    const token = Cookies.get('accessToken');
    if (!token) {
        throw new Error("No login data found in cookies");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return headers;
}

export const getCurrentUserData = () => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const response = await axios.get(`${url}/user/me`, { headers: getHeaders() })
        const responseData = response.data;
        if (response.data) {
            dispatch({ type: GET_USER_SUCCESS, payload: responseData?.user })
        }
        return responseData
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE })
        Cookies.remove('accessToken');
        Cookies.remove("isLoggedIn")
        dispatch({ type: GET_LOGOUT_USER })
        // Redirect to login page
        window.location.href = '/login';
    }
}

export const getPokemonData = (page: number) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_POKEMON_DATA_REQUEST })
    try {
        const response = await axios.get(`${url}/pokemon/all/paginated?page=${page}`, { headers: getHeaders() });
        const responseData = response.data;
        if (responseData) {
            dispatch({ type: GET_POKEMON_DATA_SUCCESS, payload: responseData?.pokemons })
        }
        return responseData
    } catch (error) {
        dispatch({ type: GET_POKEMON_DATA_FAILURE })
    }
}

export const getSinglePokemon = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_SINGLE_POKEMON_REQUEST })
    try {
        const response = await axios.get(`${url}/pokemon/${id}`, { headers: getHeaders() });
        const responseData = response.data;
        if (responseData) {
            dispatch({ type: GET_SINGLE_POKEMON_SUCCESS, payload: responseData });
        }
        return responseData
    } catch (error) {
        dispatch({ type: GET_SINGLE_POKEMON_FAILURE });
    }
}

export const searchFilter = (name: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_POKEMON_DATA_REQUEST })
    dispatch({ type: GET_LOADING_TRUE })
    try {
        const response = axios.get(`${url}/pokemon/search/all?name=${name}`, { headers: getHeaders() })
        dispatch({ type: GET_POKEMON_DATA_SUCCESS, payload: (await response).data })
        dispatch({ type: GET_LOADING_FALSE })
    } catch (error) {
        dispatch({ type: GET_POKEMON_DATA_FAILURE })
    }
}