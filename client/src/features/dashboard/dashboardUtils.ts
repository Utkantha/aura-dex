export const colorClassMap: Record<string, string> = {
    black: "bg-gray-900 text-white",
    blue: "bg-blue-500 text-white",
    brown: "bg-amber-800 text-white",
    gray: "bg-gray-400 text-black",
    green: "bg-green-500 text-white",
    pink: "bg-pink-400 text-black",
    purple: "bg-purple-500 text-white",
    red: "bg-red-500 text-white",
    white: "bg-white text-black",
    yellow: "bg-yellow-400 text-black",
};

export type PokemonColor = keyof typeof colorClassMap;

export const getColorClass = (color: string | undefined): string => {
    if (!color) return colorClassMap.gray; // Default to gray if no color provided
    return colorClassMap[color as PokemonColor] || colorClassMap.gray; // Fallback to gray if color not in map
};
