"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Package, Phone, Clock } from "lucide-react"

const mockJobDetails: Record<string, {
  id: string
  shipperName: string
  blockNumber: string
  quantity: number
  fee: number
  status: "pending" | "in_progress" | "done"
  pickupAddress: string
  deliveryAddress: string
  estimatedTime: string
  distance: string
  contactPhone: string
}> = {
  "job-001": {
    id: "job-001",
    shipperName: "Flipkart Logistics",
    blockNumber: "A-127",
    quantity: 12,
    fee: 450,
    status: "pending",
    pickupAddress: "Flipkart Hub, Sector 18, Gurugram",
    deliveryAddress: "Block A-127, DLF Phase 3, Gurugram",
    estimatedTime: "35 min",
    distance: "8.5 km",
    contactPhone: "+91 98765 43210",
  },
  "job-002": {
    id: "job-002",
    shipperName: "Amazon Fresh",
    blockNumber: "B-045",
    quantity: 8,
    fee: 320,
    status: "in_progress",
    pickupAddress: "Amazon Warehouse, Sector 44, Gurugram",
    deliveryAddress: "Tower B-045, Unitech Cyber Park, Gurugram",
    estimatedTime: "25 min",
    distance: "5.2 km",
    contactPhone: "+91 98765 12345",
  },
  "job-003": {
    id: "job-003",
    shipperName: "BigBasket",
    blockNumber: "C-089",
    quantity: 15,
    fee: 580,
    status: "done",
    pickupAddress: "BigBasket Hub, Sector 29, Gurugram",
    deliveryAddress: "Villa C-089, Sushant Lok 2, Gurugram",
    estimatedTime: "45 min",
    distance: "12.3 km",
    contactPhone: "+91 99999 88888",
  },
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const job = mockJobDetails[id]

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[390px] h-[844px] bg-background rounded-[2.5rem] border-4 border-border shadow-2xl overflow-hidden flex flex-col items-center justify-center">
          <p className="text-muted-foreground">Job not found</p>
          <Link href="/home" className="text-primary text-sm mt-2 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: typeof job.status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-accent text-accent">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-primary/20 text-primary border-0">
            In Progress
          </Badge>
        )
      case "done":
        return <Badge variant="secondary">Done</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-background rounded-[2.5rem] border-4 border-border shadow-2xl overflow-hidden flex flex-col">
        {/* Status Bar Mock */}
        <div className="h-11 bg-card flex items-center justify-between px-6 shrink-0">
          <span className="text-[11px] font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            </div>
            <span className="text-[11px] text-foreground ml-1">5G</span>
            <div className="w-6 h-3 border border-foreground rounded-sm ml-1 relative">
              <div className="absolute inset-0.5 bg-primary rounded-[1px]" style={{ width: "70%" }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border shrink-0">
          <Link
            href="/home"
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{job.shipperName}</h1>
            <p className="text-xs text-muted-foreground">Block {job.blockNumber}</p>
          </div>
          {getStatusBadge(job.status)}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-lg p-3 border border-border text-center">
              <Package className="h-5 w-5 text-primary mx-auto" />
              <p className="text-lg font-bold text-foreground mt-1">{job.quantity}</p>
              <p className="text-[10px] text-muted-foreground">Items</p>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border text-center">
              <Clock className="h-5 w-5 text-accent mx-auto" />
              <p className="text-lg font-bold text-foreground mt-1">{job.estimatedTime}</p>
              <p className="text-[10px] text-muted-foreground">Est. Time</p>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border text-center">
              <MapPin className="h-5 w-5 text-muted-foreground mx-auto" />
              <p className="text-lg font-bold text-foreground mt-1">{job.distance}</p>
              <p className="text-[10px] text-muted-foreground">Distance</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-card rounded-lg p-4 border border-border space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Pickup
                </span>
              </div>
              <p className="text-sm text-foreground pl-4">{job.pickupAddress}</p>
            </div>
            <div className="border-l-2 border-dashed border-border h-4 ml-1" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  Delivery
                </span>
              </div>
              <p className="text-sm text-foreground pl-4">{job.deliveryAddress}</p>
            </div>
          </div>

          {/* Fee */}
          <div className="bg-card rounded-lg p-4 border border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery Fee</span>
            <span className="text-2xl font-bold text-primary">₹{job.fee}</span>
          </div>

          {/* Contact */}
          <a
            href={`tel:${job.contactPhone}`}
            className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Contact Support</p>
              <p className="text-sm font-medium text-foreground">{job.contactPhone}</p>
            </div>
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 shrink-0">
          {job.status === "pending" && (
            <Button className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
              Accept & Start Job
            </Button>
          )}
          {job.status === "in_progress" && (
            <Button className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
              Mark as Delivered
            </Button>
          )}
          {job.status === "done" && (
            <Button variant="secondary" className="w-full h-12 text-sm font-semibold" disabled>
              Completed
            </Button>
          )}
        </div>

        {/* Home Indicator */}
        <div className="h-8 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}
