"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const linkedVehicleId = localStorage.getItem("linkedVehicleId")
    if (linkedVehicleId) {
      router.replace("/home")
    } else {
      router.replace("/vehicle/link")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="size-8 border-2 border-zinc-700 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  )
}
