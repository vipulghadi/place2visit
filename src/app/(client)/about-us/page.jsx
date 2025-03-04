import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Travel Expert",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Michael Chen",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Elena Rodriguez",
    role: "Destination Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b66d8f?auto=format&fit=crop&w=300&q=80"
  }
];

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold mb-4">About Place2Visit</h1>
        <p className="text-xl text-gray-600">
          Inspiring travelers to explore the world's most beautiful destinations
        </p>
      </header>

      <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden fade-in">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
          alt="Travel Planning"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose max-w-none mb-16 fade-in">
        <p className="mb-6">
          Place2Visit was founded by a group of passionate travelers who believe that everyone deserves to experience the world's most amazing destinations. Our mission is to inspire and guide travelers through comprehensive destination guides, authentic travel stories, and expert advice.
        </p>
        <p>
          What sets us apart is our commitment to providing detailed, first-hand information about destinations worldwide. Our team of experienced travelers and local experts work together to bring you the most accurate and up-to-date travel information.
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center fade-in">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}