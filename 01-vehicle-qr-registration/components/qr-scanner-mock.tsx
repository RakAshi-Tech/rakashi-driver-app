"use client"

import { useState } from "react"
import { Camera, ScanLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QrScannerMockProps {
  onScan: () => void
  hasPermission: boolean
  onRequestPermission: () => void
}

export function QrScannerMock({
  onScan,
  hasPermission,
  onRequestPermission,
}: QrScannerMockProps) {
  const [isScanning, setIsScanning] = useState(false)

  const handleSimulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      onScan()
    }, 1200)
  }

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center bg-zinc-950 rounded-xl overflow-hidden">
      {/* Camera feed simulation */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950" />
      
      {!hasPermission ? (
        <div className="relative z-10 flex flex-col items-center gap-4 p-6">
          <div className="size-16 rounded-full bg-zinc-800 flex items-center justify-center">
            <Camera className="size-8 text-zinc-500" />
          </div>
          <p className="text-zinc-400 text-sm text-center">
            Camera access is required to scan QR codes
          </p>
          <Button
            onClick={onRequestPermission}
            className="min-h-[44px] px-6 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Enable camera access
          </Button>
        </div>
      ) : (
        <>
          {/* QR Frame overlay */}
          <div className="relative z-10 size-56 border-2 border-emerald-500/50 rounded-lg">
            {/* Corner accents */}
            <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg" />
            <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg" />
            <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg" />
            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-2 border-r-2 border-emerald-500 rounded-br-lg" />
            
            {/* Scanning line animation */}
            <div
              className={cn(
                "absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent",
                isScanning ? "animate-scan" : "animate-scan-slow"
              )}
            />
          </div>

          {/* Hint text */}
          <p className="relative z-10 mt-4 text-zinc-400 text-sm text-center px-4">
            Align the QR code within the frame
          </p>

          {/* Simulate scan button (demo) */}
          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="relative z-10 mt-4 text-xs text-zinc-600 hover:text-zinc-500 transition-colors disabled:opacity-50"
          >
            <ScanLine className="size-4 inline mr-1" />
            Simulate scan
          </button>
        </>
      )}
    </div>
  )
}
