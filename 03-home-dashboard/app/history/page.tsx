"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, ChevronRight } from "lucide-react"

const mockAllJobs = [
  {
    id: "job-001",
    shipperName: "Flipkart Logistics",
    blockNumber: "A-127",
    quantity: 12,
    fee: 450,
    status: "pending" as const,
    date: "Today",
  },
  {
    id: "job-002",
    shipperName: "Amazon Fresh",
    blockNumber: "B-045",
    quantity: 8,
    fee: 320,
    status: "in_progress" as const,
    date: "Today",
  },
  {
    id: "job-003",
    shipperName: "BigBasket",
    blockNumber: "C-089",
    quantity: 15,
    fee: 580,
    status: "done" as const,
    date: "Today",
  },
  {
    id: "job-004",
    shipperName: "Swiggy Instamart",
    blockNumber: "D-012",
    quantity: 6,
    fee: 280,
    status: "done" as const,
    date: "Yesterday",
  },
  {
    id: "job-005",
    shipperName: "Zepto",
    blockNumber: "E-078",
    quantity: 4,
    fee: 180,
    status: "done" as const,
    date: "Yesterday",
  },
  {
    id: "job-006",
    shipperName: "Blinkit",
    blockNumber: "F-034",
    quantity: 10,
    fee: 420,
    status: "done" as const,
    date: "2 days ago",
  },
]

export default function HistoryPage() {
  const getStatusBadge = (status: "pending" | "in_progress" | "done") => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-accent text-accent">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="text-[9px] px-1.5 py-0 bg-primary/20 text-primary border-0">
            In Progress
          </Badge>
        )
      case "done":
        return (
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
            Done
          </Badge>
        )
    }
  }

  const groupedJobs = mockAllJobs.reduce(
    (acc, job) => {
      if (!acc[job.date]) {
        acc[job.date] = []
      }
      acc[job.date].push(job)
      return acc
    },
    {} as Record<string, typeof mockAllJobs>
  )

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
          <h1 className="text-base font-semibold text-foreground">Delivery History</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {Object.entries(groupedJobs).map(([date, jobs]) => (
            <div key={date}>
              <div className="px-4 py-2 bg-secondary/50">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                  {date}
                </span>
              </div>
              <div className="divide-y divide-border">
                {jobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/job/${job.id}`}
                    className="flex items-center gap-2.5 px-4 py-3 hover:bg-secondary/50 transition-colors active:bg-secondary"
                  >
                    <div className="h-10 w-10 rounded bg-secondary flex items-center justify-center shrink-0">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {job.shipperName}
                        </span>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>Block {job.blockNumber}</span>
                        <span>•</span>
                        <span>{job.quantity} items</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-sm font-semibold text-primary">₹{job.fee}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Home Indicator */}
        <div className="h-8 flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </div>
  )
}
