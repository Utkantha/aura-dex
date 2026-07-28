import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router"
import axios from "axios"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { GET_USER_FAILURE, GET_USER_LOGIN, GET_USER_REQUEST, GET_USER_SUCCESS } from "@/redux/AppReducer/action-types"
import { useEffect } from "react"
import { motion } from "framer-motion"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }
    
    useEffect(() => {
        document.title = "AuraDex - Login"
    }, [])
    
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            dispatch({ type: GET_USER_REQUEST })

            const accessToken = tokenResponse.access_token;
            Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); 
            Cookies.set("isLoggedIn", "true", { expires: 1 / 24 }); 
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
            );

            const userData = response.data;
            dispatch({ type: GET_USER_LOGIN });
            dispatch({ type: GET_USER_SUCCESS, payload: userData })

            navigate("/dashboard")
        },
        onError: (error) => {
            dispatch({ type: GET_USER_FAILURE })
        },
        flow: 'implicit', 
    });

    return (
        <div className={cn("flex flex-col gap-8 w-full max-w-md mx-auto", className)} {...props}>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-4 text-center"
            >
                <div className="p-4 bg-white/20 dark:bg-black/20 rounded-full backdrop-blur-md shadow-xl border border-white/30">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
                        alt="Pikachu"
                        className="h-20 w-20 drop-shadow-2xl"
                    />
                </div>
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight">
                    AuraDex
                </h1>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="glass-panel overflow-hidden border-none shadow-2xl rounded-3xl backdrop-blur-2xl bg-white/60 dark:bg-black/40">
                    <CardHeader className="text-center pb-2 pt-8">
                        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome Back</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400 font-medium text-base">
                            Sign in to access your universal PokéDex
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button 
                                        onClick={() => login()} 
                                        className="w-full rounded-full py-6 text-lg font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-3 w-6 h-6">
                                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
                                        </svg>
                                        Continue with Google
                                    </Button>
                                </motion.div>
                                
                                <div className="text-center text-sm font-medium text-slate-500 mt-4">
                                    By continuing, you agree to our Terms of Service and Privacy Policy.
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
