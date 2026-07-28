
import React, { useEffect } from "react"
import {
    AudioWaveform,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    HomeIcon,
    User2
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserData } from "@/redux/AppReducer/action"
import type { AppState } from "@/lib/types"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: HomeIcon,
        },
        {
            title: "Profile",
            url: "/profile",
            icon: User2,
        }
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useDispatch();
    const user = useSelector((e: AppState) => e.userData)
    useEffect(() => {
        dispatch(
            getCurrentUserData() as any
        )
    }, [dispatch])
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent >
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user as any} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
