import { Button } from '@/components/ui/button';
import type { AppState } from '@/lib/types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pokemonImages = [
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg', top: '10%', left: '5%', delay: 0 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg', top: '20%', left: '75%', delay: 0.2 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg', top: '30%', left: '10%', delay: 0.4 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg', top: '50%', left: '80%', delay: 0.6 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/39.svg', top: '65%', left: '15%', delay: 0.8 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/133.svg', top: '75%', left: '70%', delay: 1.0 },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg', top: '85%', left: '35%', delay: 1.2 },
];

const features = [
    { title: 'Detailed Stats', desc: 'Dive deep into base stats, abilities, and characteristics of every Pokémon.', icon: '📊' },
    { title: 'Interactive Dashboard', desc: 'Experience a stunning glassmorphic UI with smooth 3D animations.', icon: '✨' },
    { title: 'Audio Cries', desc: 'Listen to the authentic roars and cries of your favorite Pokémon directly.', icon: '🎵' },
];

const Welcome = () => {
    const isLoggedIn = useSelector((e: AppState) => e.isLoggedIn);

    return (
        <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-50 dark:from-slate-900 dark:via-[#0f172a] dark:to-[#1e1b4b] overflow-hidden overflow-y-auto">
            {/* Animated Background Elements */}
            {pokemonImages.map((poke, i) => (
                <motion.img
                    key={i}
                    src={poke.src}
                    alt={`pokemon-${i}`}
                    className="absolute z-0 w-32 h-32 object-contain pointer-events-none opacity-10 md:opacity-30 filter drop-shadow-2xl"
                    style={{ top: poke.top, left: poke.left }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.2, 0.5, 0.2] 
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: poke.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Premium Navigation Bar */}
            <nav className="relative z-20 backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex justify-between items-center h-20">
                        <Link to="/" className="flex items-center gap-3">
                            <motion.img
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.4 }}
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
                                alt="Pikachu"
                                className="h-12 w-12 drop-shadow-md"
                            />
                            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                AuraDex
                            </span>
                        </Link>
                        <div>
                            {isLoggedIn ? (
                                <Link to="/dashboard">
                                    <Button variant="default" className="rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button variant="default" className="rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center text-center px-4 py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm tracking-wide border border-blue-200 dark:border-blue-800 shadow-sm">
                        🚀 The Ultimate Pokémon Database
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-800 dark:text-white leading-tight">
                        Discover the <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            Pokémon Universe
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore, analyze, and master the world of Pokémon with our stunning, modern Pokédex experience powered by real-time data and gorgeous visuals.
                    </p>
                    
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link to="/dashboard">
                            <Button className="rounded-full px-10 py-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.6)] transition-all duration-300 group border-0">
                                Start Exploring
                                <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24 px-6 bg-white/40 dark:bg-black/20 backdrop-blur-xl border-y border-white/20 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Why AuraDex?</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">We've redesigned the traditional Pokédex into a premium, blazing-fast experience.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ y: -5 }}
                                className="glass-panel p-8 rounded-3xl bg-white/60 dark:bg-slate-800/50 shadow-xl border border-white/40 dark:border-white/10"
                            >
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                            A Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Masterpiece</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Experience Pokémon like never before. High-resolution Dream World artwork, dynamic gradient backgrounds based on Pokémon types, and buttery-smooth animations make exploring the Pokédex an absolute joy.
                        </p>
                        <ul className="space-y-4 pt-4">
                            {['Responsive Grid Layout', 'Detailed Modals', 'Instant Search Filtering'].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 font-medium">
                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 relative w-full flex justify-center">
                        <div className="relative w-80 h-80">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                            <motion.img 
                                animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg" 
                                alt="Charizard" 
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
                            alt="Pikachu"
                            className="h-8 w-8 filter brightness-0 invert opacity-70"
                        />
                        <span className="text-xl font-bold text-white tracking-tight">AuraDex</span>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} AuraDex. All rights reserved. Powered by PokéAPI.</p>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;
