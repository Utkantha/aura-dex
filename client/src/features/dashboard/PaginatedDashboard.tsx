import DynamicPagination from '@/components/DynamicPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppState } from '@/lib/types';
import { getPokemonData } from '@/redux/AppReducer/action';
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PokemonSoundButton from './Sound';
import PokemonPopup from './PokemonPopup';
import { GET_LOADING_FALSE, GET_LOADING_TRUE } from '@/redux/AppReducer/action-types';
import { motion, AnimatePresence } from 'framer-motion';

const PaginatedDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const pokemons = useSelector((e: AppState) => e.pokemonData);
  const loading = useSelector((e: AppState) => e.pageLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: GET_LOADING_TRUE })
        const response = await dispatch(getPokemonData(page) as any);
        if (response) {
          const totalPages = Math.ceil(response.count / response.limit);
          setTotalPage(totalPages);
          setError(null);
        }
        dispatch({ type: GET_LOADING_FALSE })
      } catch (err) {
        setError('Failed to fetch Pokemon data');
        console.error('Error fetching Pokemon data:', err);
        dispatch({ type: GET_LOADING_FALSE })

      }
    };

    fetchData();
  }, [dispatch, page]);

  const handleCardClick = (pokemon: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left - window.innerWidth / 2 + rect.width / 2;
    const y = rect.top - window.innerHeight / 2 + rect.height / 2;
    setPopupPosition({ x, y });
    setSelectedPokemon(pokemon);
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
    setPopupPosition(null);
  };

  const handleSoundButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (error) {
    return <div className="text-red-500 font-semibold p-4 rounded-xl bg-red-100">{error}</div>;
  }
  
  if (loading) {
    return (
      <div className='min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-[#0f172a] dark:to-[#1e1b4b] p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className='w-full rounded-3xl glass-panel overflow-hidden border-0 shadow-lg h-[320px] relative'>
              <CardHeader className='pb-2 pt-6 z-10 relative'>
                <Skeleton className="h-8 w-1/2 rounded-full" />
                <Skeleton className="h-6 w-8 rounded-full absolute right-6 top-6" />
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[200px] z-10 relative">
                <Skeleton className="w-32 h-32 rounded-full opacity-50" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className='min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-[#0f172a] dark:to-[#1e1b4b] p-6 rounded-tl-3xl'>
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500 blur-[120px]"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10 relative z-10'
      >
        <AnimatePresence>
          {pokemons.map((pokemon) => (
            <motion.div key={pokemon.id} variants={itemVariants} layoutId={`card-${pokemon.id}`}>
              <Suspense>
                <Card
                  className='relative group overflow-hidden cursor-pointer h-[320px] rounded-3xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
                  onClick={(e) => handleCardClick(pokemon, e)}
                >
                  {/* Pokeball Background Watermark */}
                  <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.08] dark:opacity-5 transform rotate-12 transition-transform group-hover:rotate-45 group-hover:scale-110 duration-500">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="pokeball" className="w-full h-full object-contain filter grayscale" />
                  </div>

                  {/* Gradient Overlay based on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none"></div>

                  <CardHeader className='flex flex-row items-center justify-between pb-2 pt-6 relative z-10'>
                    <CardTitle className='text-xl font-bold text-slate-800 dark:text-slate-100 capitalize drop-shadow-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all'>
                      {pokemon.name}
                    </CardTitle>
                    <div onClick={handleSoundButtonClick} className="bg-white/50 dark:bg-black/30 p-2 rounded-full backdrop-blur-md shadow-sm hover:scale-110 transition-transform hover:bg-blue-100 dark:hover:bg-blue-900/50">
                      <PokemonSoundButton soundUrl={pokemon?.sounds?.latest} />
                    </div>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-80px)] flex flex-col items-center justify-center relative z-10 p-4">
                    <motion.div 
                      className="relative w-full h-full flex items-center justify-center"
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Glow effect behind image */}
                      <div className="absolute w-24 h-24 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-2xl group-hover:bg-purple-400/30 transition-colors duration-500"></div>
                      
                      <img
                        loading="lazy"
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-40 h-40 object-contain drop-shadow-2xl z-10 relative"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/400x400?text=Pokemon+Not+Found";
                          target.onerror = null; 
                        }}
                      />
                    </motion.div>
                    
                    {/* Pokemon ID Badge */}
                    <div className="absolute bottom-4 left-6 px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-xs font-bold text-slate-500 dark:text-slate-400 backdrop-blur-md">
                      #{String(pokemon.id).padStart(3, '0')}
                    </div>
                  </CardContent>
                </Card>
              </Suspense>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="relative z-10 flex justify-center pb-8">
        <div className="glass-panel px-6 py-2 rounded-full shadow-lg">
          <DynamicPagination onPageChange={setPage} currentPage={page} totalPages={totalPage} />
        </div>
      </div>

      <PokemonPopup
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={handleClosePopup}
        originPosition={popupPosition}
      />
    </div>
  )
}

export default PaginatedDashboard