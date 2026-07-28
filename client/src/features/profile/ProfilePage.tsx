import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { AppState } from "@/lib/types";
import { Mail, Phone, User } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const userData = useSelector((state: AppState) => state.userData);
    const isLoading = useSelector((state: AppState) => state.isLoading);

    useEffect(() => {
        document.title = "PokéDex - profile"
    }, [])

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={userData?.picture || ""} alt={userData?.name} />
                            <AvatarFallback className="text-2xl">
                                {userData?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <CardTitle className="text-2xl">{userData?.name || "User Name"}</CardTitle>
                            <CardDescription className="text-lg">{userData?.email || "user@example.com"}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    value={userData?.name || ""}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={userData?.email || ""}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={userData?.phone || "+1 (555) 000-0000"}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        {/* <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    value={userData?.location || "New York, USA"}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                        </div> */}

                        <Separator className="my-6" />

                        {/* <div className="flex justify-end space-x-4">
                            <Button variant="outline">Edit Profile</Button>
                            <Button>Save Changes</Button>
                        </div> */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage; 