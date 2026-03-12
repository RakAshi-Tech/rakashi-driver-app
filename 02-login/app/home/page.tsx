"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Truck, MapPin, Package, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Phone Frame Container */}
      <div className="w-full max-w-[390px] min-h-[700px] bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col">
        {/* Status Bar Mock */}
        <div className="flex items-center justify-between px-6 py-3 text-xs text-muted-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-muted-foreground rounded-sm">
              <div className="w-3/4 h-full bg-accent rounded-sm" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">RakAshi Driver</h1>
              <p className="text-xs text-accent">Online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Welcome Message */}
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
              <Package className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Welcome, Driver!</h2>
            <p className="text-muted-foreground">You are now logged in successfully.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Package className="w-4 h-4" />
                <span className="text-xs font-medium">Today&apos;s Deliveries</span>
              </div>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 text-accent mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-medium">Distance</span>
              </div>
              <p className="text-2xl font-bold text-foreground">48 km</p>
            </div>
          </div>

          {/* Placeholder for map/tracking */}
          <div className="flex-1 bg-secondary rounded-xl flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Live tracking map</p>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}
