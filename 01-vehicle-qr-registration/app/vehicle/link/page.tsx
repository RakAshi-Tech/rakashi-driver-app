"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Keyboard } from "lucide-react"
import { QrScannerMock } from "@/components/qr-scanner-mock"
import { VehicleLinkConfirmCard } from "@/components/vehicle-link-confirm-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type Language = "en" | "hi"
type FlowState = "scanning" | "detected" | "success"

const translations = {
  en: {
    title: "Link your vehicle",
    enterManually: "Enter code manually",
    vehicleCode: "Vehicle code",
    linkVehicle: "Link vehicle",
    vehicleId: "Vehicle ID",
    vehicleType: "Vehicle type",
    status: "Status",
    readyToLink: "Ready to link",
    confirmLink: "Confirm & Link",
    successMessage: "Vehicle linked successfully",
    goToHome: "Go to Home",
    manualEntryTitle: "Enter Vehicle Code",
    manualEntryDesc: "Enter the code printed below the QR sticker",
  },
  hi: {
    title: "अपना वाहन लिंक करें",
    enterManually: "कोड मैन्युअल रूप से दर्ज करें",
    vehicleCode: "वाहन कोड",
    linkVehicle: "वाहन लिंक करें",
    vehicleId: "वाहन आईडी",
    vehicleType: "वाहन प्रकार",
    status: "स्थिति",
    readyToLink: "लिंक के लिए तैयार",
    confirmLink: "पुष्टि करें और लिंक करें",
    successMessage: "वाहन सफलतापूर्वक लिंक हो गया",
    goToHome: "होम पर जाएं",
    manualEntryTitle: "वाहन कोड दर्ज करें",
    manualEntryDesc: "QR स्टिकर के नीचे छपा कोड दर्ज करें",
  },
}

const mockVehicle = {
  id: "RAK-DEL-042",
  type: "EV-assisted rickshaw",
}

export default function VehicleLinkPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [flowState, setFlowState] = useState<FlowState>("scanning")
  const [hasPermission, setHasPermission] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [manualCode, setManualCode] = useState("")
  const [isLinking, setIsLinking] = useState(false)

  const t = translations[language]

  useEffect(() => {
    const linkedVehicleId = localStorage.getItem("linkedVehicleId")
    if (linkedVehicleId) {
      router.replace("/home")
    }
  }, [router])

  const handleScan = () => {
    setFlowState("detected")
  }

  const handleConfirmLink = () => {
    setIsLinking(true)
    setTimeout(() => {
      localStorage.setItem("linkedVehicleId", mockVehicle.id)
      setIsLinking(false)
      setFlowState("success")
    }, 1500)
  }

  const handleManualLink = () => {
    if (manualCode.trim()) {
      setIsSheetOpen(false)
      setFlowState("detected")
    }
  }

  const handleGoHome = () => {
    router.push("/home")
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
          <header className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold text-zinc-100">{t.title}</h1>
            
            {/* Language toggle */}
            <div className="flex bg-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors min-h-[36px]",
                  language === "en"
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-300"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors min-h-[36px]",
                  language === "hi"
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-300"
                )}
              >
                हिंदी
              </button>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {flowState === "success" ? (
              /* Success state */
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <div className="size-20 rounded-full bg-emerald-600/20 flex items-center justify-center animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="size-10 text-emerald-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-zinc-100">
                    {t.successMessage}
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">{mockVehicle.id}</p>
                </div>
                <Button
                  onClick={handleGoHome}
                  className="min-h-[48px] px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                >
                  {t.goToHome}
                </Button>
              </div>
            ) : (
              <>
                {/* QR Scanner */}
                <QrScannerMock
                  onScan={handleScan}
                  hasPermission={hasPermission}
                  onRequestPermission={() => setHasPermission(true)}
                />

                {/* Detection result or manual entry */}
                {flowState === "detected" ? (
                  <div className="animate-in slide-in-from-bottom-4 duration-300">
                    <VehicleLinkConfirmCard
                      vehicle={mockVehicle}
                      onConfirm={handleConfirmLink}
                      isLoading={isLinking}
                      translations={{
                        vehicleId: t.vehicleId,
                        vehicleType: t.vehicleType,
                        status: t.status,
                        readyToLink: t.readyToLink,
                        confirmLink: t.confirmLink,
                      }}
                    />
                  </div>
                ) : (
                  /* Manual entry link */
                  <button
                    onClick={() => setIsSheetOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 text-sm text-zinc-400 hover:text-zinc-300 transition-colors min-h-[44px]"
                  >
                    <Keyboard className="size-4" />
                    {t.enterManually}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div className="h-8 flex items-center justify-center">
          <div className="w-32 h-1 bg-zinc-700 rounded-full" />
        </div>
      </div>

      {/* Manual entry sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="bg-zinc-900 border-zinc-800 rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-zinc-100">{t.manualEntryTitle}</SheetTitle>
            <SheetDescription className="text-zinc-500">
              {t.manualEntryDesc}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-6 pb-8">
            <Input
              placeholder={t.vehicleCode}
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="h-12 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
            <Button
              onClick={handleManualLink}
              disabled={!manualCode.trim()}
              className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              {t.linkVehicle}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
