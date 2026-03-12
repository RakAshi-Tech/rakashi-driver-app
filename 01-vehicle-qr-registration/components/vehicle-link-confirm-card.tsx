"use client"

import { Truck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface VehicleInfo {
  id: string
  type: string
}

interface VehicleLinkConfirmCardProps {
  vehicle: VehicleInfo
  onConfirm: () => void
  isLoading?: boolean
  translations: {
    vehicleId: string
    vehicleType: string
    status: string
    readyToLink: string
    confirmLink: string
  }
}

export function VehicleLinkConfirmCard({
  vehicle,
  onConfirm,
  isLoading = false,
  translations,
}: VehicleLinkConfirmCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 py-4">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-emerald-600/20 flex items-center justify-center">
            <Truck className="size-6 text-emerald-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">
              {translations.vehicleId}
            </p>
            <p className="text-lg font-semibold text-zinc-100">{vehicle.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-xs text-zinc-500 mb-1">{translations.vehicleType}</p>
            <p className="text-sm text-zinc-200">{vehicle.type}</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <p className="text-xs text-zinc-500 mb-1">{translations.status}</p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              <p className="text-sm text-emerald-400">{translations.readyToLink}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Linking...
            </span>
          ) : (
            translations.confirmLink
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
