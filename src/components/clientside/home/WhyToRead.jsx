
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Globe, Heart, Share2, Star, ThumbsUp, TrendingUp } from "lucide-react"

export const metadata= {
  title: "Why Read Our Articles | Your Website Name",
  description:
    "Discover why our articles are worth your time - expert insights, travel recommendations, and curated content to enhance your knowledge.",
  openGraph: {
    title: "Why Read Our Articles | Your Website Name",
    description:
      "Discover why our articles are worth your time - expert insights, travel recommendations, and curated content to enhance your knowledge.",
    type: "website",
  },
}

export default function WhyToRead() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">
          Reader's Choice
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Why Read Our Articles</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Discover expert insights, travel recommendations, and curated content that will expand your horizons and
          inspire your next adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="transition-all hover:shadow-lg hover:bg-yellow-400 hover:text-black ">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Expert Insights</CardTitle>
            <CardDescription>Content written by industry experts and passionate enthusiasts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground ">
              Our articles are crafted by professionals with years of experience, ensuring you get accurate and valuable
              information on every topic.
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:bg-purple-700 hover:text-black">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Time-Saving Curation</CardTitle>
            <CardDescription>Carefully selected content that respects your time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We filter through the noise to bring you only the most relevant and high-quality content, saving you hours
              of research.
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:bg-red-700 hover:text-black">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Reader-Focused</CardTitle>
            <CardDescription>Content designed with your needs in mind</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our articles are written to address your questions, concerns, and interests, making them relevant to your
              life and goals.
            </p>
          </CardContent>
        </Card>
      </div>




    </div>
  )
}

