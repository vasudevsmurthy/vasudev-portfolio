import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ChatWidget from "@/components/ChatWidget";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Contact — ${content.profile.name}`,
  description: `Get in touch with ${content.profile.name}.`,
};

export default function ContactPage() {
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <div className="min-h-screen flex items-center pt-28">
        <Contact />
      </div>
      <ChatWidget />
    </main>
  );
}
