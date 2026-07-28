import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppState } from "@/lib/types";
import { getSinglePokemon } from "@/redux/AppReducer/action";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorClass } from "./dashboardUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSwipeable } from "react-swipeable";
import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";

interface PokemonPopupProps {
    pokemon: any | null;
    isOpen: boolean;
    onClose: () => void;
    originPosition: { x: number; y: number } | null;
}

const PokemonPopupSkeleton = () => {
    return (
        <div className="p-8 relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left flex-1">
                        <Skeleton className="h-10 w-64 mb-4 bg-white/20 rounded-full" />
                        <div className="flex gap-3 mt-4 justify-center md:justify-start">
                            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
                            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
                        </div>
                    </div>
                    <Skeleton className="w-56 h-56 rounded-full bg-white/20 drop-shadow-2xl" />
                </div>

                <Card className="glass-panel border-none shadow-xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-40 bg-white/20 rounded-full" />
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-32 bg-white/20" />
                                    <Skeleton className="h-4 w-12 bg-white/20" />
                                </div>
                                <Skeleton className="h-3 w-full bg-white/20 rounded-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const PokemonPopup = ({ pokemon, isOpen, onClose, originPosition }: PokemonPopupProps) => {
    const { isLoading, singlePokemon } = useSelector((e: AppState) => e);
    const dispatch = useDispatch();
    const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(true);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentPokemonId && currentPokemonId < 1302) {
                setCurrentPokemonId(currentPokemonId + 1);
            }
        },
        onSwipedRight: () => {
            if (currentPokemonId && currentPokemonId > 1) {
                setCurrentPokemonId(currentPokemonId - 1);
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: false
    });

    useEffect(() => {
        if (pokemon?.id) {
            setCurrentPokemonId(pokemon.id);
        }
    }, [pokemon?.id]);

    useEffect(() => {
        if (currentPokemonId && isOpen) {
            const fetchData = async () => {
                await dispatch(getSinglePokemon(currentPokemonId) as any);
            }
            fetchData();
        }
    }, [currentPokemonId, isOpen, dispatch]);

    useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
            if (!isOpen || !currentPokemonId) return;

            if (event.key === 'ArrowRight' && currentPokemonId < 1302) {
                setCurrentPokemonId(currentPokemonId + 1);
            } else if (event.key === 'ArrowLeft' && currentPokemonId > 1) {
                setCurrentPokemonId(currentPokemonId - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentPokemonId]);

    useEffect(() => {
        if (isOpen) {
            setShowHint(true);
            const timer = setTimeout(() => setShowHint(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (singlePokemon?.name) {
            document.title = `AuraDex - ${singlePokemon.name}`;
        } else {
            document.title = 'AuraDex';
        }

        return () => {
            document.title = 'AuraDex';
        };
    }, [singlePokemon?.name]);

    if (!isOpen) return null;

    const maxStatValue = 255; 

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className={`sm:max-w-[700px] md:max-w-[850px] lg:max-w-[80vw] p-0 overflow-hidden ${getColorClass(singlePokemon.color)} border-none shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl backdrop-blur-3xl bg-opacity-90 dark:bg-opacity-80`}>
                        <DialogClose className="absolute right-6 top-6 rounded-full p-2 bg-black/20 hover:bg-black/40 text-white transition-all z-50">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-3 z-50 shadow-2xl"
                                >
                                    <div className="hidden sm:flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Use Arrow Keys to Navigate</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                    <div className="flex sm:hidden items-center gap-2">
                                        <Smartphone className="w-4 h-4" />
                                        <span>Swipe Left/Right to Navigate</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Huge Watermark hashtag */}
                        <div className="absolute top-1/4 left-0 right-0 flex justify-center pointer-events-none z-0">
                            <span className="text-[180px] sm:text-[220px] md:text-[280px] font-black text-white/[0.15] dark:text-black/[0.1] select-none tracking-tighter">
                                #{currentPokemonId?.toString().padStart(3, '0')}
                            </span>
                        </div>

                        <motion.div
                            initial={originPosition ? { scale: 0.8, x: originPosition.x, y: originPosition.y, opacity: 0 } : { scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 350 }}
                            className="p-6 md:p-10 relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar"
                            {...swipeHandlers}
                        >
                            {isLoading ? (
                                <PokemonPopupSkeleton />
                            ) : (
                                <div className="space-y-8 max-w-5xl mx-auto">
                                    {/* Header Section */}
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 md:pt-4">
                                        <div className="text-center md:text-left flex-1 relative z-20">
                                            <motion.h2 
                                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                                className="text-5xl md:text-6xl font-extrabold capitalize text-white drop-shadow-lg tracking-tight"
                                            >
                                                {singlePokemon.name}
                                            </motion.h2>
                                            <motion.div 
                                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                                                className="flex gap-3 mt-4 justify-center md:justify-start"
                                            >
                                                {singlePokemon.types?.map((type: string) => (
                                                    <Badge key={type} className="px-5 py-2 text-base rounded-full shadow-lg border border-white/30 backdrop-blur-md bg-white/20 text-white capitalize font-semibold tracking-wide">
                                                        {type}
                                                    </Badge>
                                                ))}
                                            </motion.div>
                                        </div>
                                        <motion.div 
                                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                                            className="relative w-64 h-64 md:w-80 md:h-80 z-20"
                                        >
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-90"></div>
                                            <motion.img
                                                animate={{ y: [0, -15, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                src={singlePokemon.image}
                                                alt={singlePokemon.name}
                                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Stats Section */}
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                                        <Card className="glass-panel border border-white/20 text-white rounded-3xl overflow-hidden shadow-2xl">
                                            <CardHeader className="bg-white/10 pb-4 border-b border-white/10">
                                                <CardTitle className="text-2xl font-bold tracking-wide">Base Stats</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="grid gap-5">
                                                    {Object.entries(singlePokemon.stats || {}).map(([statName, value]) => (
                                                        <div key={statName} className="space-y-2">
                                                            <div className="flex justify-between text-sm font-semibold">
                                                                <span className="capitalize tracking-wider">{statName.replace('_', ' ')}</span>
                                                                <span className="text-white/80">{value as number}</span>
                                                            </div>
                                                            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                                                                <motion.div 
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${((value as number) / maxStatValue) * 100}%` }}
                                                                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                                                    className="h-full bg-gradient-to-r from-white/60 to-white rounded-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    {/* Details Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                                            <Card className="glass-panel h-full border border-white/20 text-white rounded-3xl overflow-hidden shadow-2xl">
                                                <CardHeader className="bg-white/10 pb-4 border-b border-white/10">
                                                    <CardTitle className="text-xl font-bold tracking-wide">Physical Characteristics</CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    <div className="space-y-4 text-lg">
                                                        <div className="flex justify-between items-center bg-black/10 px-4 py-3 rounded-2xl">
                                                            <span className="text-white/70 font-medium">Height</span>
                                                            <span className="font-bold">{singlePokemon.height} m</span>
                                                        </div>
                                                        <div className="flex justify-between items-center bg-black/10 px-4 py-3 rounded-2xl">
                                                            <span className="text-white/70 font-medium">Weight</span>
                                                            <span className="font-bold">{singlePokemon.weight} kg</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                                            <Card className="glass-panel h-full border border-white/20 text-white rounded-3xl overflow-hidden shadow-2xl">
                                                <CardHeader className="bg-white/10 pb-4 border-b border-white/10">
                                                    <CardTitle className="text-xl font-bold tracking-wide">Abilities</CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    <div className="flex flex-col gap-3">
                                                        {singlePokemon.abilities?.map((ability: string) => (
                                                            <div key={ability} className="bg-white/20 border border-white/20 px-5 py-3 rounded-2xl font-bold capitalize text-lg text-center backdrop-blur-sm shadow-sm">
                                                                {ability}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                    
                                    {singlePokemon.description && (
                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                                            <Card className="glass-panel border border-white/20 text-white rounded-3xl overflow-hidden shadow-2xl">
                                                <CardHeader className="bg-white/10 pb-4 border-b border-white/10">
                                                    <CardTitle className="text-xl font-bold tracking-wide">Description</CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-6">
                                                    <p className="text-lg font-medium leading-relaxed italic text-white/90">
                                                        "{singlePokemon.description}"
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default PokemonPopup; 