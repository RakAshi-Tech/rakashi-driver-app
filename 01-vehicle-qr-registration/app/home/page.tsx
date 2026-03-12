"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Truck, MapPin, Clock, Battery, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [vehicleId, setVehicleId] = useState<string | null>(null)

  useEffect(() => {
    const linkedVehicleId = localStorage.getItem("linkedVehicleId")
    if (!linkedVehicleId) {
      router.replace("/vehicle/link")
    } else {
      setVehicleId(linkedVehicleId)
    }
  }, [router])

  const handleUnlink = () => {
    localStorage.removeItem("linkedVehicleId")
    router.replace("/vehicle/link")
  }

  if (!vehicleId) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="w-full max-w-[390px] h-[844px] bg-zinc-900 rounded-[40px] overflow-hidden shadow-2xl border border-zinc-800 flex flex-col">
        {/* Status bar mock */}
        <div className="h-12 bg-zinc-900 flex items-center justify-center">
          <div className="w-24 h-6 bg-zinc-950 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-5 pb-8 overflow-hidden">
          {/* Header */}
          <header className="py-4">
            <p className="text-zinc-500 text-sm">Good morning</p>
            <h1 className="text-2xl font-semibold text-zinc-100">Driver Dashboard</h1>
          </header>

          {/* Vehicle Card */}
          <Card className="bg-zinc-800/50 border-zinc-700 py-4">
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                  <Truck className="size-6 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    Linked Vehicle
                  </p>
                  <p className="text-lg font-semibold text-zinc-100">{vehicleId}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-600/20 rounded-full">
                  <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center">
                  <Battery className="size-4 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500">Battery</p>
                  <p className="text-sm font-medium text-zinc-200">85%</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center">
                  <MapPin className="size-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500">Distance</p>
                  <p className="text-sm font-medium text-zinc-200">12.4 km</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center">
                  <Clock className="size-4 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs text-zinc-500">Today</p>
                  <p className="text-sm font-medium text-zinc-200">4 trips</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-zinc-400 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Start new delivery", icon: MapPin },
                { label: "View trip history", icon: Clock },
                { label: "Vehicle status", icon: Truck },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors min-h-[56px]"
                >
                  <action.icon className="size-5 text-zinc-400" />
                  <span className="flex-1 text-left text-zinc-200">{action.label}</span>
                  <ChevronRight className="size-5 text-zinc-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Unlink button (for demo) */}
          <Button
            onClick={handleUnlink}
            variant="ghost"
            className="text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/50"
          >
            Unlink vehicle (demo reset)
          </Button>
        </div>

        {/* Home indicator */}
        <div className="h-8 flex items-center justify-center">
          <div className="w-32 h-1 bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  )
}
