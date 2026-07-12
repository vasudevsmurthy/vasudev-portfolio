import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsRow from "@/components/StatsRow";
import CalloutRow from "@/components/CalloutRow";
import GitHubStats from "@/components/GitHubStats";
import NowSection from "@/components/NowSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <div className="pt-28">
        <Hero />

        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 pb-20 space-y-12">
          <StatsRow />

          <CalloutRow />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GitHubStats />
            <NowSection />
          </div>

          <About />

          <Skills />

          <Timeline />

          <Projects />

          <Experience />

          <Certificates />

          <Achievements />

          {/* Remove this if you don't have real testimonials */}
          <Testimonials />

          <CTABanner />

          <Contact />
        </div>

        <footer className="text-center py-8 text-sm opacity-50">
          Designed & Developed by <strong>Vasudev S</strong>
        </footer>
      </div>

      <ChatWidget />
    </main>
  );
}
