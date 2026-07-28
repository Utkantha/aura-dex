import axios from "axios";
import { Request, Response } from "express";
import fs from "fs"
import path from "path"

export const fetAllPokemon = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Fetch basic list of Pokémon
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );

        const results = response.data.results;

        // Attach images and sounds to each Pokémon
        const pokemons = await Promise.all(
            results.map(async (pokemon: any, index: number) => {
                const id = offset + index + 1;

                // Only fetch detailed data for sound/cry if offset is less than 1025
                let sounds = { latest: "", legacy: "" };
                if (offset < 1025) {
                    const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const cries = details.data.cries;
                    sounds = {
                        latest: cries?.latest || "",
                        legacy: cries?.legacy || "",
                    };
                }

                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
                    sounds,
                };
            })
        );

        res.json({
            count: response.data.count,
            page: Number(page),
            limit: Number(limit),
            pokemons,
        });
    } catch (error) {
        // console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
};

export const getSinglePokemon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: 'Pokemon ID is required' });
            return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const colorValue = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        const { height, weight, abilities, stats, moves, types } = response.data;

        const pokemon = {
            name: response.data.name,
            id: response.data.id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
            height,
            weight,
            abilities: abilities.map((a: any) => a.ability.name),
            stats: {
                hp: stats.find((s: any) => s.stat.name === "hp")?.base_stat,
                attack: stats.find((s: any) => s.stat.name === "attack")?.base_stat,
                defense: stats.find((s: any) => s.stat.name === "defense")?.base_stat,
                special_attack: stats.find((s: any) => s.stat.name === "special-attack")?.base_stat,
                special_defense: stats.find((s: any) => s.stat.name === "special-defense")?.base_stat,
                speed: stats.find((s: any) => s.stat.name === "speed")?.base_stat,
            },
            moves: moves.map((e: any) => e?.move?.name),
            types: types.map((e: any) => e?.type?.name),
            color: colorValue.data.color.name
        };

        res.json(pokemon);
    } catch (error) {
        // console.error('Error fetching pokemon:', error);
        res.status(500).json({ error: 'Failed to fetch pokemon' });
    }
};

export const getAllPokemons = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const pokemonDataPath = path.join(__dirname, "pokemondata.json");

        // Check if the cache file exists
        if (!fs.existsSync(pokemonDataPath)) {
            // If cache doesn't exist, fetch from API and create cache
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1002`);
            const pokemonsWithIds = response.data.results.map((pokemon: any) => {
                // Extract ID from URL - URLs are in format: https://pokeapi.co/api/v2/pokemon/{id}/
                const urlParts = pokemon.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 2]); // Get second to last part of URL
                if (isNaN(id)) {
                    throw new Error(`Invalid Pokemon ID from URL: ${pokemon.url}`);
                }

                return {
                    ...pokemon,
                    id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
                };
            });
            // Save to cache file
            fs.writeFileSync(pokemonDataPath, JSON.stringify(pokemonsWithIds, null, 2));
        }

        // Read from cache file
        const cachedData = JSON.parse(fs.readFileSync(pokemonDataPath, 'utf8'));

        // Filter by name if provided
        let filteredData = cachedData;
        if (name && typeof name === 'string') {
            const searchTerm = name.toLowerCase();
            filteredData = cachedData.filter((pokemon: any) => {
                return pokemon.name.toLowerCase().includes(searchTerm)
            }
            );
        }

        // Only fetch sounds for the filtered results
        const pokemons = await Promise.all(
            filteredData.map(async (pokemon: any) => {
                let sounds = { latest: "", legacy: "" };
                if (pokemon.id && pokemon.id <= 1025) { // Only fetch sounds for valid IDs up to 1025
                    try {
                        const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
                        const cries = details.data.cries;
                        sounds = {
                            latest: cries?.latest || "",
                            legacy: cries?.legacy || "",
                        };
                    } catch (error) {
                        console.error(`Error fetching sounds for Pokemon ${pokemon.id}:`, error);
                    }
                }

                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id: pokemon.id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
                    sounds,
                };
            })
        );
        res.json(pokemons);
    } catch (error) {
        console.error('Error in getAllPokemons:', error);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
}