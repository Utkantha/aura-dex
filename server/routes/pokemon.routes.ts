
import express from "express"
import { fetAllPokemon, getAllPokemons, getSinglePokemon } from "../controllers/pokemon.controllers";
import { verifyGoogleToken } from "../middlewares/auth.middleware";
const PokemonRouter = express.Router();
PokemonRouter.get('/all/paginated', verifyGoogleToken, fetAllPokemon);
PokemonRouter.get('/:id', verifyGoogleToken, getSinglePokemon);
PokemonRouter.get('/search/all', verifyGoogleToken, getAllPokemons);

export default PokemonRouter