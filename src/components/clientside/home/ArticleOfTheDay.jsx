import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2, Bookmark, ArrowRight } from "lucide-react"
import Link from "next/link"

function ArticleOfTheDay() {
  return (
    <div className="w-full bg-white min-h-[300px] p-4 md:p-8 flex justify-center items-center">
      <Card className="w-full max-w-5xl p-3 shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative w-full h-[250px] md:h-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Article of the day"
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
              priority
            />
            <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">Article of the Day</Badge>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between p-2">
            <div className="space-y-4">
              <CardHeader className="p-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Feb 28, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 min read</span>
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl leading-tight">
                  The Future of Web Development: AI and No-Code Solutions
                </CardTitle>
                <CardDescription className="mt-3 line-clamp-3">
                  Explore how artificial intelligence and no-code platforms are revolutionizing the way we build
                  websites and applications. Learn about the latest trends and what they mean for developers and
                  businesses alike.
                </CardDescription>
              </CardHeader>

              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Technology</Badge>
                <Badge variant="secondary">AI</Badge>
                <Badge variant="secondary">Web Dev</Badge>
              </div>
            </div>

            <CardFooter className="p-0 mt-6 flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/article" className="inline-flex">
                <Button className="gap-2">
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ArticleOfTheDay

