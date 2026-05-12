import { Brain, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Stats", href: "/#stats" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* Reading progress bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl transition-smooth ${
          isScrolled
            ? "glass border-glow shadow-2xl"
            : "bg-transparent border border-transparent"
        }`}
        data-ocid="header"
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo_link"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg gradient-shift opacity-90 animate-pulse-glow" />
              <Brain
                className="relative z-10 w-8 h-8 text-white"
                strokeWidth={1.5}
              />
            </div>
            <span className="font-display font-bold text-lg text-gradient-primary tracking-tight">
              GrowthMind
              <span className="text-gradient-accent ml-1">AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav.links"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Toggle theme"
              data-ocid="nav.theme_toggle"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="/#contact"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold gradient-shift text-white transition-smooth hover:scale-105 glow-primary"
              data-ocid="nav.cta_button"
            >
              <Sparkles size={14} />
              Get Started
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 px-6 py-4 space-y-1"
            data-ocid="nav.mobile_menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>

      {/* Main content */}
      <main className="relative" data-ocid="main.content">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border/40 mt-24"
        data-ocid="footer"
      >
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 relative">
              <div className="absolute inset-0 rounded-md gradient-shift opacity-80" />
              <Brain
                className="relative z-10 w-7 h-7 text-white"
                strokeWidth={1.5}
              />
            </div>
            <span className="font-display font-semibold text-gradient-primary">
              GrowthMind AI
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-foreground transition-smooth underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles size={12} className="text-accent" />
            <span>AI-Powered Insights</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
