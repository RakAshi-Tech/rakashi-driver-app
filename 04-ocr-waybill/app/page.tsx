"use client";

import { FileText, Truck, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="w-full max-w-[390px] h-[844px] bg-background rounded-[40px] border-[8px] border-secondary overflow-hidden shadow-2xl flex flex-col">
        {/* Status bar mock */}
        <div className="h-12 bg-background flex items-center justify-center">
          <div className="w-32 h-6 bg-foreground/10 rounded-full" />
        </div>

        {/* Header */}
        <header className="px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Driver App
              </h1>
              <p className="text-xs text-muted-foreground">
                Welcome back, Rajesh
              </p>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Quick actions */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link href="/ocr/waybill" className="block">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary/70 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Scan Waybill</h3>
                    <p className="text-xs text-muted-foreground">
                      Capture waybill with OCR
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 opacity-60 cursor-not-allowed">
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">View Deliveries</h3>
                  <p className="text-xs text-muted-foreground">
                    Check pending jobs
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Today&apos;s Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Deliveries</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </section>

          {/* Demo link */}
          <section className="pt-4">
            <p className="text-xs text-center text-muted-foreground mb-3">
              Tap &quot;Scan Waybill&quot; above to try the OCR demo
            </p>
            <Link href="/ocr/waybill">
              <Button className="w-full" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                Open Waybill Scanner
              </Button>
            </Link>
          </section>
        </div>

        {/* Home indicator mock */}
        <div className="h-8 flex items-center justify-center">
          <div className="w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
