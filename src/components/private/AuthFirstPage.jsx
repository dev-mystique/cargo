"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider.jsx"
import  apiClient  from "@/axios/apiClient.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/Badge.jsx"
import { Skeleton } from "@/components/ui/skeleton"
import { LogOut, Mail, MapPin, Activity, Award } from "lucide-react"
import {useTranslation} from "react-i18next";

export default function WelcomePage() {
    const auth = useAuth()
    const {t} = useTranslation("common");
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            try {
                const response = await apiClient.get("api/me", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                })

                if (response.status !== 200) {
                    throw new Error("Failed to fetch user data")
                }

                setProfile(response.data.profile || null)
                const data = response.data.user
                auth.setUser(data)
                setError(null)
            } catch (error) {
                console.error("Error fetching user data:", error)
                setError("Unable to load your profile. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        if (auth.token) {
            fetchUserData()
        }
    }, [auth.token, auth.setUser])

    const handleLogout = () => {
        auth.logOut()
    }

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState message={error} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br  to-purple-50/30 py-8 px-4">
            <div className="container backdrop-blur-md mx-auto max-w-4xl">
                <div className="flex backdrop-blur-md flex-col gap-8">
                    <header className=" border bg-transparent rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                        <div>
                            <h1 className="text-3xl font-bold">Welcome, {auth.user?.name || auth.user?.name.split()}!</h1>
                            <p className="text-muted-foreground mt-1">{t('welcome')}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="flex items-center gap-2   border-white/40 hover:backdrop-blur-md"
                        >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </Button>
                    </header>

                    <div className="grid backdrop-blur-md grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className=" backdrop-blur-md md:col-span-2 border shadow-sm overflow-hidden">
                            <CardHeader className=" backdrop-blur-md border-b">
                                <CardTitle className={"backdrop-blur-md"}>Profile Information</CardTitle>
                                <CardDescription className={"backdrop-blur-md"}>Your personal details and preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-6 bg-transparent">
                                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                    <Avatar className="w-24 h-24 border-2 backdrop-blur-sm shadow-sm">
                                        <AvatarImage
                                            src={profile?.avatar || "/placeholder.svg?height=96&width=96"}
                                            alt={auth.user?.name || "User"}
                                        />
                                        <AvatarFallback className="bg-white/40 backdrop-blur-md">
                                            {getInitials(auth.user?.name || "User")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-semibold">{auth.user?.name || "User"}</h2>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail size={16} />
                                            <span>{auth.user?.email || "email@example.com"}</span>
                                        </div>
                                        {profile?.location && (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin size={16} />
                                                <span>{profile.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/40">
                                    <div className="space-y-2">
                                        <h3 className="font-medium">Account Details</h3>
                                        <div className="text-sm space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Member since</span>
                                                <span>{formatDate(auth.user?.created_at || new Date().toISOString())}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Account type</span>
                                                <Badge variant="outline" className=" backdrop-blur-sm border-white/40">
                                                    {auth.user?.individual ? "Individual" : "Legal"}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status</span>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-500/10 backdrop-blur-sm text-green-600 border-green-200/40"
                                                >
                                                    Active
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-medium">Activity</h3>
                                        <div className="text-sm space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Last login</span>
                                                <span>{formatDate(new Date().toISOString(), true)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Sessions</span>
                                                <span>1 active</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">2FA</span>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-yellow-500/10 backdrop-blur-sm text-yellow-600 border-yellow-200/40"
                                                >
                                                    {profile?.twoFactorEnabled ? "Enabled" : "Disabled"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="backdrop-blur-md  border border-white/40 shadow-sm overflow-hidden">
                                <CardHeader className="pb-3 border-b border-white/40 ">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Activity size={18} className="text-primary" />
                                        Account Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Profile completion</span>
                                            <span className="text-sm font-medium">85%</span>
                                        </div>
                                        <div className="w-full h-2  backdrop-blur-sm rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary/70 backdrop-blur-sm h-full rounded-full"
                                                style={{ width: "85%" }}
                                            ></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="backdrop-blur-md  border border-white/40 shadow-sm overflow-hidden">
                                <CardHeader className="pb-3 border-b border-white/40 backdrop-blur-md">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Award size={18} className="text-primary" />
                                        Achievements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {(profile?.achievements || ["Profile Completed", "Email Verified", "First Login"]).map(
                                            (achievement, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full  backdrop-blur-sm flex items-center justify-center text-primary border border-white/40">
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm">{achievement}</span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 border-t border-white/40 backdrop-blur-sm p-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full text-xs  backdrop-blur-sm hover:bg-white/10"
                                    >
                                        View All Achievements
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoadingState() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col gap-8">
                <header className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-10 w-28" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 border rounded-lg p-6 space-y-6">
                        <div>
                            <Skeleton className="h-6 w-36 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </div>

                        <div className="flex gap-6 items-center">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-56" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 mb-2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-24 mb-2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-lg p-6">
                            <Skeleton className="h-5 w-32 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>

                        <div className="border rounded-lg p-6">
                            <Skeleton className="h-5 w-32 mb-4" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ErrorState({ message }) {
    return (
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
            <div className="bg-destructive/10 text-destructive p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Unable to load profile</h2>
                <p>{message}</p>
            </div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
    )
}

// Helper functions
function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
}

function formatDate(dateString, includeTime = false) {
    const date = new Date(dateString)
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    if (includeTime) {
        return new Date(dateString).toLocaleString("en-US", {
            ...options,
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return date.toLocaleDateString("en-US", options)
}

