import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

function NewsLetter() {
  return (
    <div className="w-full min-h-[400px] bg-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 md:px-6">
        {/* Left side - Image */}
        <div className="relative w-full h-[300px] md:h-full rounded-lg overflow-hidden sm:block hidden">
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-o/2e/d9/f1/88/caption.jpg?w=1200&h=-1"
            alt="Newsletter background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Stay in the loop</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to receive the latest updates, travel tips, and exclusive offers directly to
              your inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Enter your email" className="flex-1 bg-white" />
            <Button type="submit" className="gap-2">
              Subscribe <Send className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter

