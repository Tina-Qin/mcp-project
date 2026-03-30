"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground transition-all group-hover:text-blue-500 group-hover:neon-glow-subtle">
              AntAlpha MCP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#docs"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
            >
              Docs
            </Link>
            <Link
              href="#ecosystem"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
            >
              Ecosystem
            </Link>
            <Link
              href="/chat"
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
            >
              Live chat
            </Link>
            <Button className="bg-blue-600 font-mono text-sm font-semibold text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Get API Key
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-border/30 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="#docs"
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="#ecosystem"
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Ecosystem
              </Link>
              <Link
                href="/chat"
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Live chat
              </Link>
              <Button className="w-full bg-blue-600 font-mono text-sm font-semibold text-white hover:bg-blue-500">
                Get API Key
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
