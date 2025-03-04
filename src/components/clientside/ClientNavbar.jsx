import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu } from "lucide-react"
import SubscribeToUs from "@/components/clientside/SubScribeToUsDialog"
import ReportErrorDialog from "@/components/clientside/ReportError"
import Link from "next/link"
export default function Component() {
  return (
    <header className="flex h-16  shrink-0 items-center justify-between px-4 md:px-6 border-b fixed top-0 left-0 w-screen z-50 bg-white">
     
      <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="Place2Visit Logo" width={40} height={40} className="object-contain" />
        <span className="font-bold text-2xl ">Place2Visit</span>
      </Link>
        


      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/popular" className="text-sm font-medium transition-colors hover:text-primary" prefetch={false}>
            Popular Places
          </Link>
          <ReportErrorDialog/>
<SubscribeToUs/>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-2 py-6">
              <Link href="/popular" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Popular Places
              </Link>
              <Link href="/connect" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Connect With Us
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

