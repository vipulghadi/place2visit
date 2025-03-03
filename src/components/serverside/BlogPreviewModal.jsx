import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function ArticleModal({ post }) {

  const [opened, setOpened] = useState(false);
  console.log(post);
  

  const defaultArticle = {
    title: "Top 10 Spiritual and Historical Places to Visit in Mathura",
    cover_image:
      "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sections: [
      {
        heading: "Introduction: A Journey to the Heart of Krishna's Land",
        text: "Mathura, a city steeped in history and spirituality, is revered as the birthplace of Lord Krishna. Located on the banks of the Yamuna River in Uttar Pradesh, this ancient city draws pilgrims and tourists alike, offering a captivating blend of religious significance, architectural marvels, and vibrant culture. Prepare to be transported to a world of devotion, enchanting legends, and timeless traditions.",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [],
      },
      {
        heading: "Top Attractions in Mathura",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [
          {
            title: "Shri Krishna Janmabhoomi Temple",
            text: "This is the most significant site in Mathura, believed to be the exact birthplace of Lord Krishna. The temple complex houses several shrines, including the Garbha Griha (sanctum sanctorum) where Krishna was born. Experience the profound spiritual energy and witness the devotion of countless pilgrims.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Dwarkadhish Temple",
            text: "Dedicated to Lord Krishna, this temple is renowned for its intricate architecture and vibrant celebrations, especially during festivals like Holi and Janmashtami. Admire the beautiful carvings and the ornate idol of Lord Krishna.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Vishram Ghat",
            text: "This sacred ghat on the banks of the Yamuna River is where Lord Krishna is believed to have rested after killing the demon Kansa. Take a holy dip in the river and witness the evening aarti, a mesmerizing ritual of light and sound.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Gita Mandir",
            text: "Also known as Birla Mandir, this temple is dedicated to the Bhagavad Gita, the sacred Hindu scripture. The entire text of the Gita is inscribed on the walls of the temple. It's a place of peace and reflection.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Govardhan Hill",
            text: "Located a short distance from Mathura, Govardhan Hill holds immense religious significance. Legend says that Lord Krishna lifted this hill on his little finger to protect the villagers from torrential rain. Pilgrims perform a parikrama (circumambulation) of the hill as a form of worship.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Radha Kund and Shyam Kund",
            text: "These two sacred ponds are associated with Radha and Krishna's divine love. They are believed to have been created by Radha and Krishna themselves. Taking a dip in these ponds is considered highly auspicious.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Kusum Sarovar",
            text: "This beautiful reservoir is surrounded by sandstone structures and is believed to be a place where Radha used to collect flowers. It offers a tranquil setting for a peaceful stroll.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Mathura Museum",
            text: "For history enthusiasts, the Mathura Museum houses a rich collection of archaeological artifacts, including sculptures, pottery, and coins, dating back to ancient times. It provides valuable insights into the region's rich past.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Prem Mandir, Vrindavan",
            text: "While technically in Vrindavan, a town closely associated with Mathura and Lord Krishna's childhood, Prem Mandir is a must-visit. This stunningly beautiful temple, made of white marble, is dedicated to Radha Krishna and showcases intricate carvings and light shows.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Banke Bihari Temple, Vrindavan",
            text: "Another gem in Vrindavan, Banke Bihari Temple is one of the most famous temples dedicated to Lord Krishna. The unique 'seva' (service) of the deity and the vibrant atmosphere make it a captivating experience.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      },
      {
        heading: "Cultural Highlights and Unique Experiences",
        text: "Beyond the temples, Mathura offers a rich cultural tapestry.",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [
          {
            title: "Holi Celebrations",
            text: "Mathura and Vrindavan are world-renowned for their extravagant Holi celebrations. Experience the joyous festival of colors with unparalleled enthusiasm and traditional rituals. Be prepared to get drenched in colored powder and water!",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Janmashtami Celebrations",
            text: "The birth of Lord Krishna is celebrated with great fervor during Janmashtami. Witness elaborate decorations, devotional songs, and the 'Dahi Handi' ritual, where young men form human pyramids to break a pot of butter.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Raas Leela Performances",
            text: "Witness captivating Raas Leela performances, traditional dance dramas depicting the love story of Radha and Krishna. These performances are a vibrant expression of devotion and artistry.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      },
      {
        heading: "Culinary Delights of Mathura",
        text: "Mathura's cuisine is predominantly vegetarian and offers a variety of delectable treats.",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [
          {
            title: "Peda",
            text: "Mathura is famous for its Peda, a sweet milk-based delicacy. Try the different varieties, including the classic Kesar Peda.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Kachori and Jalebi",
            text: "Start your day with a traditional breakfast of Kachori (deep-fried bread) and Jalebi (sweet, crispy spirals).",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Lassi",
            text: "Cool down with a refreshing glass of Lassi, a yogurt-based drink, available in sweet and salty variations.",
            image:
              "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      },
      {
        heading: "Best Time to Visit",
        text: "The best time to visit Mathura is during the winter months (October to March) when the weather is pleasant and ideal for sightseeing. The monsoon season (July to September) brings lush greenery, but heavy rainfall can disrupt travel plans. Summers (April to June) are extremely hot and should be avoided.",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [],
      },
      {
        heading: "Conclusion: A Pilgrimage to Remember",
        text: "Mathura offers a truly unique and enriching travel experience. Whether you are a devout pilgrim, a history buff, or simply a curious traveler, this sacred city will leave a lasting impression. Immerse yourself in the spiritual atmosphere, explore the magnificent temples, and discover the timeless charm of Krishna's land.",
        image:
          "https://images.unsplash.com/photo-1739611216855-eb0991c76d51?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subsections: [],
      },
    ],
  };

  const article = post ? post.article : defaultArticle;

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Article</Button>
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{article.title}</DialogTitle>
            <button
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpened(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>
          <Image
            src={article.cover_image}
            alt={article.title}
            width={500}
            height={300}
            className="rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
