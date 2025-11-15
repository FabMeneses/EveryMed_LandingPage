import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { TrustBadges } from "./components/TrustBadges";
import { Features } from "./components/Features";
import { Plans } from "./components/Plans";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-everymed-dark"
          : "bg-gradient-everymed-light"
      }`}
    >
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <Stats />
      <TrustBadges />
      <Features />
      <Plans />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}