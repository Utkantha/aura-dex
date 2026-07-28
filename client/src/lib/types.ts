interface UserData {
    [key: string]: any; // This can be made more specific based on your user data structure
}

interface PokemonData {
    [key: string]: any; // This can be made more specific based on your pokemon data structure
}

export interface AppState {
    isLoggedIn: boolean;
    userData: UserData;
    pokemonData: PokemonData[];
    isError: boolean;
    isLoading: boolean;
    singlePokemon: UserData
    pageLoading: boolean
}
export interface AppAction {
    type: string;
    payload?: any;
}