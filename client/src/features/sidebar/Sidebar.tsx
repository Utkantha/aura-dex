import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { useCallback, useState, type ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { debounce } from "./sidebarutils"
import { getPokemonData, searchFilter } from "@/redux/AppReducer/action"
import { useLocation } from "react-router"

interface SidebarWrapperProps {
    children: ReactNode
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const [input, setInput] = useState('');
    const getAllData = () => {
        dispatch(getPokemonData(1) as any);
    }

    const handleSearch = (value: string) => {
        console.log('Searching for:', value);
        // You can replace this with an actual API call
        if (value === "") {
            return getAllData();
        }
        dispatch(searchFilter(value) as any)
    };

    // Memoize the debounced version to avoid re-creating on every render
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            handleSearch(value);
        }, 500),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        debouncedSearch(value);
    };



    const handleClearState = () => {
        setInput("")
        getAllData();
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-full">
                <header className="flex h-16 shrink-0 items-center bg-sidebar gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        {
                            path.includes("dashboard") &&
                            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]">
                                <Input
                                    className="pl-10 pr-10 w-full"
                                    placeholder="Search Pokemon..."
                                    value={input}
                                    onChange={handleChange}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <X onClick={handleClearState} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                            </div>
                        }
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-2">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
