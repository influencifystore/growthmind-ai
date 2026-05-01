import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bot,
  Brain,
  Check,
  ChevronDown,
  Clock,
  Facebook,
  Linkedin,
  Palette,
  Quote,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedDiv, AnimatedSection } from "../components/AnimatedSection";

/* ─────────────────────────── PARTICLE FIELD ─────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 9 + 6,
    delay: Math.random() * 6,
    hue: i % 3 === 0 ? 300 : i % 3 === 1 ? 195 : 260,
  }));
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `oklch(0.72 0.22 ${p.hue})`,
            boxShadow: `0 0 ${p.size * 4}px oklch(0.72 0.22 ${p.hue} / 0.9)`,
          }}
          animate={{
            y: [-10, -90, -170],
            opacity: [0, 0.9, 0],
            scale: [0.4, 1.1, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── FLOATING ORBS ─────────────────────────── */
function FloatingOrbs() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {[
        { size: 550, x: -12, y: -15, hue: 300, delay: 0, key: "orb-violet" },
        { size: 420, x: 58, y: 35, hue: 195, delay: 3, key: "orb-cyan" },
        { size: 320, x: 78, y: 8, hue: 260, delay: 6, key: "orb-indigo" },
        { size: 200, x: 45, y: 75, hue: 150, delay: 9, key: "orb-teal" },
      ].map((orb) => (
        <motion.div
          key={orb.key}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, oklch(0.68 0.24 ${orb.hue} / 0.45) 0%, transparent 70%)`,
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 35, -25, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 14 + orb.delay,
            delay: orb.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── GRID LINES ─────────────────────────── */
function GridLines() {
  return (
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(oklch(0.92 0.008 280) 1px, transparent 1px),
          linear-gradient(90deg, oklch(0.92 0.008 280) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

/* ─────────────────────────── GEOMETRIC FLOATS ─────────────────────────── */
function GeometricShapes() {
  const shapes = [
    {
      id: "geo-hex-1",
      type: "hex",
      x: 8,
      y: 20,
      size: 40,
      hue: 300,
      dur: 8,
      delay: 0,
    },
    {
      id: "geo-tri-1",
      type: "tri",
      x: 85,
      y: 15,
      size: 30,
      hue: 195,
      dur: 10,
      delay: 2,
    },
    {
      id: "geo-sq-1",
      type: "sq",
      x: 92,
      y: 60,
      size: 24,
      hue: 260,
      dur: 7,
      delay: 4,
    },
    {
      id: "geo-hex-2",
      type: "hex",
      x: 5,
      y: 70,
      size: 20,
      hue: 150,
      dur: 9,
      delay: 1,
    },
    {
      id: "geo-sq-2",
      type: "sq",
      x: 50,
      y: 88,
      size: 16,
      hue: 300,
      dur: 6,
      delay: 3,
    },
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute opacity-10"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            border: `1px solid oklch(0.72 0.22 ${s.hue})`,
            borderRadius:
              s.type === "hex" ? "30%" : s.type === "tri" ? "0" : "4px",
            boxShadow: `0 0 12px oklch(0.72 0.22 ${s.hue} / 0.3)`,
          }}
          animate={{
            y: [-8, -30, -8],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── 3D TILT CARD ─────────────────────────── */
function TiltCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 7);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── CHAR-BY-CHAR TITLE ─────────────────────────── */
function CharRevealTitle({
  text,
  className = "",
}: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={word} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={`${word}-char-${ci}-${char}`}
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + wi * 0.08 + ci * 0.025,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────── TYPING EFFECT ─────────────────────────── */
function TypingText({ texts }: { texts: string[] }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[current];
    const speed = deleting ? 45 : 75;
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < target.length) {
        setDisplayed(target.slice(0, displayed.length + 1));
      } else if (deleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else if (!deleting && displayed.length === target.length) {
        setTimeout(() => setDeleting(true), 2200);
      } else if (deleting && displayed.length === 0) {
        setDeleting(false);
        setCurrent((c) => (c + 1) % texts.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, current, texts]);

  return (
    <span className="text-gradient-accent">
      {displayed}
      <span
        className="inline-block w-0.5 h-[0.9em] bg-accent ml-0.5 align-middle"
        style={{ animation: "typing-cursor 1s infinite" }}
      />
    </span>
  );
}

/* ─────────────────────────── STAT COUNTER ─────────────────────────── */
function StatCounter({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    const steps = 70;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground font-body">{label}</div>
    </div>
  );
}

/* ─────────────────────────── GRADIENT DIVIDER ─────────────────────────── */
function GradientDivider() {
  return (
    <div
      className="relative flex items-center justify-center my-16"
      aria-hidden
    >
      <motion.div
        className="h-px w-full max-w-2xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.68 0.28 300), oklch(0.72 0.22 195), transparent)",
          boxShadow: "0 0 12px oklch(0.72 0.22 195 / 0.5)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <div
        className="absolute w-3 h-3 rounded-full gradient-shift animate-pulse-glow"
        style={{ boxShadow: "0 0 16px oklch(0.72 0.22 195)" }}
      />
    </div>
  );
}

/* ─────────────────────────── SOCIAL SHARE ─────────────────────────── */
function SocialShare() {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : "",
  );
  const shareText = encodeURIComponent(
    "How AI is Changing Digital Marketing in 2026 | GrowthMind AI",
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const socials = [
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      hue: 195,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`,
      hue: 220,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      hue: 260,
    },
  ];

  return (
    <div
      className="flex items-center flex-wrap gap-3"
      data-ocid="share.section"
    >
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
        <Share2 size={14} />
        Share
      </span>
      {socials.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border/50 text-muted-foreground hover:text-foreground transition-smooth"
            style={{
              background: `oklch(0.72 0.22 ${s.hue} / 0.06)`,
              borderColor: `oklch(0.72 0.22 ${s.hue} / 0.2)`,
            }}
            data-ocid={`share.${s.label.toLowerCase()}_button`}
            aria-label={`Share on ${s.label}`}
          >
            <Icon size={14} />
            {s.label}
          </motion.a>
        );
      })}
      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border/50 text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="share.copy_button"
      >
        {copied ? (
          <Check size={14} className="text-accent" />
        ) : (
          <Share2 size={14} />
        )}
        {copied ? "Copied!" : "Copy link"}
      </motion.button>
    </div>
  );
}

/* ─────────────────────────── NEWSLETTER ─────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1800);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
      data-ocid="newsletter.form"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Enter your email"
        className="flex-1 w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-white/60 transition-smooth font-body text-sm"
        data-ocid="newsletter.email_input"
        disabled={status === "loading" || status === "success"}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-background font-semibold text-sm hover:bg-white/90 transition-smooth flex items-center gap-2 justify-center min-w-[120px]"
        data-ocid="newsletter.submit_button"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
          />
        )}
        {status === "success" && (
          <Check size={16} className="text-emerald-500" />
        )}
        {status === "error" && <BarChart3 size={16} />}
        {status === "idle" && <BarChart3 size={16} />}
        {status === "loading"
          ? "Joining..."
          : status === "success"
            ? "Subscribed!"
            : status === "error"
              ? "Try again"
              : "Subscribe"}
      </motion.button>
      {status === "error" && (
        <p
          className="text-xs text-red-300 w-full text-center"
          data-ocid="newsletter.error_state"
        >
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

/* ─────────────────────────── SECTION DATA ─────────────────────────── */
const sections = [
  {
    id: "content",
    icon: Brain,
    color: 300,
    tag: "Content Creation",
    title: "AI in Content Creation",
    text: "One of the biggest changes is in content creation. Writing blogs, captions, or even ad copy used to take a lot of time. Now tools like ChatGPT help in generating ideas and drafts quickly. Of course, human creativity is still important, but AI makes the process easier and saves time.",
    stat: "10x faster content output with AI-assisted workflows.",
    direction: "left" as const,
  },
  {
    id: "targeting",
    icon: Target,
    color: 195,
    tag: "Audience Targeting",
    title: "Better Audience Targeting",
    text: "Platforms like Meta Ads Manager use AI to understand user behavior and show ads to people who are more likely to be interested. This helps businesses get better results without wasting money on the wrong audience.",
    stat: "3x better ROI with AI-driven ad targeting platforms.",
    direction: "right" as const,
  },
  {
    id: "personalization",
    icon: Users,
    color: 260,
    tag: "Personalization",
    title: "Personalized Experience",
    text: "Nowadays, people expect content that feels personal. AI helps brands show products, ads, or content based on user interests. When you see product recommendations or relevant ads, that's AI working in the background — improving user experience and increasing engagement.",
    stat: "72% of consumers respond better to personalized content.",
    direction: "left" as const,
  },
  {
    id: "creative",
    icon: Palette,
    color: 85,
    tag: "Creative Tools",
    title: "Creative Tools and Design",
    text: "AI has also made designing easier. Tools like Canva allow users to create social media posts, ads, and even videos without needing advanced skills. This is helpful for beginners who want to create professional-looking content.",
    stat: "Design time reduced by 60% with AI-powered creative tools.",
    direction: "right" as const,
  },
  {
    id: "automation",
    icon: Zap,
    color: 150,
    tag: "Automation",
    title: "Automation and Time Saving",
    text: "AI is also used for automation. Things like email marketing, chatbots, and campaign tracking can now run automatically. This saves time and allows marketers to focus more on strategy instead of repetitive tasks.",
    stat: "Marketers save 30+ hours/week through intelligent automation.",
    direction: "left" as const,
  },
];

/* ─────────────────────────── BLOG PAGE ─────────────────────────── */
export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        id="hero"
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      >
        <FloatingOrbs />
        <GridLines />
        <ParticleField />
        <GeometricShapes />

        {/* Hero image parallax bg */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
          aria-hidden
        >
          <img
            src="/assets/generated/hero-ai-marketing.dim_1200x600.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/30 to-background" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-glow bg-muted/40 backdrop-blur-sm mb-8"
            data-ocid="hero.badge"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="text-xs font-mono font-medium text-accent tracking-widest uppercase">
              AI & Marketing · 2026 Report
            </span>
          </motion.div>

          {/* Main title — char by char */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-4"
            data-ocid="hero.title"
            style={{ perspective: "600px" }}
          >
            <CharRevealTitle
              text="How AI is"
              className="text-foreground block"
            />
            <span className="block mt-1">
              <TypingText
                texts={[
                  "Revolutionizing",
                  "Transforming",
                  "Redefining",
                  "Supercharging",
                ]}
              />
            </span>
            <CharRevealTitle
              text="Digital Marketing"
              className="text-gradient-primary block mt-1 glow-text-primary"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            data-ocid="hero.subtitle"
          >
            Digital marketing has changed a lot in the last few years. In 2026,
            AI is not just an extra tool — it has become a core part of every
            marketing strategy.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#blog"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white gradient-shift glow-primary transition-smooth hover:scale-105"
              data-ocid="hero.read_button"
            >
              <Sparkles size={16} />
              Start Reading
            </a>
            <a
              href="#stats"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-foreground bg-muted/60 border border-border/50 hover:border-primary/30 transition-smooth hover:scale-105"
              data-ocid="hero.stats_button"
            >
              View Insights
              <ChevronDown size={16} />
            </a>
          </motion.div>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <div className="w-8 h-8 rounded-full gradient-shift flex items-center justify-center text-white font-bold text-xs font-display shrink-0">
              GM
            </div>
            <span>GrowthMind AI Editorial</span>
            <span className="opacity-50">·</span>
            <Clock size={14} />
            <span>8 min read</span>
            <span className="opacity-50">·</span>
            <span>Apr 30, 2026</span>
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.a
          href="#stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-smooth cursor-pointer"
          aria-label="Scroll to stats"
          data-ocid="hero.scroll_link"
        >
          <span className="text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-0.5 h-8 bg-gradient-to-b from-accent/70 to-transparent rounded-full"
          />
        </motion.a>
      </section>

      {/* ── STATS ── */}
      <section
        id="stats"
        data-ocid="stats.section"
        className="py-20 bg-card border-y border-border/30 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 noise-overlay opacity-40"
          aria-hidden
        />
        {/* Subtle horizontal scanline */}
        <div className="absolute inset-0 scanline opacity-30" aria-hidden />
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedDiv direction="none" className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-accent mb-2">
              By the numbers
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground">
              AI Marketing in 2026
            </h2>
          </AnimatedDiv>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                value: 78,
                suffix: "%",
                label: "Marketers using AI tools",
                key: "stat-marketers",
              },
              {
                value: 3,
                suffix: "x",
                label: "Better campaign ROI",
                key: "stat-roi",
              },
              {
                value: 60,
                suffix: "%",
                label: "Time saved on content",
                key: "stat-time",
              },
              {
                value: 95,
                suffix: "B",
                label: "AI marketing market ($)",
                key: "stat-market",
              },
            ].map((stat, i) => (
              <AnimatedDiv
                key={stat.key}
                delay={i * 0.1}
                data-ocid={`stats.item.${i + 1}`}
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <AnimatedSection
        id="blog"
        data-ocid="blog.intro.section"
        className="py-24 max-w-4xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-1/4 flex-shrink-0">
            <div className="sticky top-28">
              <Badge
                variant="outline"
                className="font-mono text-xs tracking-wider text-accent border-accent/40 bg-accent/10 mb-3"
              >
                Introduction
              </Badge>
              <div className="w-12 h-0.5 gradient-shift rounded mb-4" />
              <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">
                A deep-dive into how AI is reshaping the digital marketing
                landscape in 2026.
              </p>
            </div>
          </div>
          <div className="md:w-3/4">
            <blockquote
              className="relative pl-6 border-l-2 border-primary/50 mb-8"
              data-ocid="blog.intro.quote"
            >
              <Quote className="absolute -left-4 -top-2 w-8 h-8 text-primary/30" />
              <p className="text-xl md:text-2xl font-display font-medium leading-relaxed text-foreground/90">
                "In 2026, AI is not just an extra tool — it has become a part of
                everyday marketing."
              </p>
            </blockquote>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Digital marketing has changed a lot in the last few years.
              Earlier, everything was done manually — content writing, ad
              targeting, customer interaction — but now AI is making things
              faster and smarter. Whether it's creating content or understanding
              customer behavior, AI is helping marketers work more efficiently.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Gradient divider */}
      <div className="max-w-4xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ── CONTENT SECTIONS ── */}
      <div className="max-w-5xl mx-auto px-6 space-y-8 pb-24">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <AnimatedSection
              key={section.id}
              data-ocid={`blog.section.${i + 1}`}
              delay={0.08}
              direction={section.direction}
              className="relative"
            >
              <TiltCard>
                <div className="relative rounded-2xl bg-card border border-border/40 overflow-hidden card-glow group">
                  {/* Hover glow bg */}
                  <div
                    className="absolute top-0 right-0 w-80 h-80 opacity-0 group-hover:opacity-100 transition-smooth rounded-full blur-3xl"
                    style={{
                      background: `oklch(0.68 0.22 ${section.color} / 0.12)`,
                    }}
                    aria-hidden
                  />
                  {/* Corner accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background: `linear-gradient(90deg, oklch(0.68 0.22 ${section.color} / 0.8), transparent)`,
                    }}
                    aria-hidden
                  />

                  <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-6 items-start">
                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      animate={{
                        boxShadow: [
                          `0 0 16px oklch(0.68 0.22 ${section.color} / 0.25)`,
                          `0 0 32px oklch(0.68 0.22 ${section.color} / 0.5)`,
                          `0 0 16px oklch(0.68 0.22 ${section.color} / 0.25)`,
                        ],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: `oklch(0.68 0.22 ${section.color} / 0.12)`,
                      }}
                    >
                      <Icon
                        size={26}
                        style={{ color: `oklch(0.75 0.22 ${section.color})` }}
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs tracking-wider"
                          style={{ color: `oklch(0.75 0.22 ${section.color})` }}
                        >
                          {section.tag}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono opacity-60">
                          0{i + 1} / 05
                        </span>
                      </div>

                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                        {section.title}
                      </h2>

                      <p className="text-base text-muted-foreground leading-relaxed mb-6">
                        {section.text}
                      </p>

                      {/* Insight chip */}
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                        style={{
                          background: `oklch(0.68 0.22 ${section.color} / 0.08)`,
                          border: `1px solid oklch(0.68 0.22 ${section.color} / 0.22)`,
                          color: `oklch(0.78 0.2 ${section.color})`,
                        }}
                      >
                        <TrendingUp size={14} />
                        {section.stat}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Gradient divider */}
      <div className="max-w-4xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ── CONCLUSION ── */}
      <AnimatedSection
        id="about"
        data-ocid="blog.conclusion.section"
        className="py-24 relative overflow-hidden"
      >
        <FloatingOrbs />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <AnimatedDiv delay={0.1}>
            <Badge
              variant="outline"
              className="font-mono text-xs tracking-wider text-primary border-primary/40 bg-primary/10 mb-6"
            >
              Conclusion
            </Badge>
          </AnimatedDiv>

          <AnimatedDiv delay={0.2}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-foreground">AI is </span>
              <span className="text-gradient-primary">not replacing</span>
              <br />
              <span className="text-foreground">marketers — it's</span>
              <span className="text-gradient-accent"> empowering them</span>
            </h2>
          </AnimatedDiv>

          <AnimatedDiv delay={0.3}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              AI is not replacing digital marketers, but it is changing how they
              work. Those who learn how to use AI tools properly will have a big
              advantage in the future. Digital marketing is evolving, and
              adapting to these changes is important for growth.
            </p>
          </AnimatedDiv>

          {/* Final Thought box */}
          <AnimatedDiv delay={0.4}>
            <motion.div
              className="relative rounded-2xl bg-card border-glow p-8 mb-8 text-left"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
              data-ocid="blog.final_thought.card"
            >
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 0.95, 1] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Zap size={20} className="text-primary" />
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Bot size={18} className="text-accent" />
                Final Thought
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Instead of avoiding AI, it's better to learn and use it in the
                right way. That's how we can stay updated and improve our skills
                in digital marketing. The future belongs to those who embrace AI
                as a creative partner — not a replacement.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles size={14} className="text-primary" />
                <span className="text-sm font-semibold text-gradient-primary">
                  AI is changing the game — adapt to win
                </span>
              </div>
            </motion.div>
          </AnimatedDiv>

          {/* Tags */}
          <AnimatedDiv delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {[
                "AI Marketing",
                "2026 Trends",
                "Digital Growth",
                "Content AI",
                "Automation",
              ].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-smooth cursor-pointer"
                  data-ocid={`blog.tag.${tag.toLowerCase().replace(/\s/g, "_")}`}
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </AnimatedDiv>

          {/* Share section */}
          <AnimatedDiv delay={0.6}>
            <div className="flex justify-center">
              <SocialShare />
            </div>
          </AnimatedDiv>
        </div>
      </AnimatedSection>

      {/* ── NEWSLETTER ── */}
      <AnimatedSection
        data-ocid="cta.section"
        className="py-20 mx-4 md:mx-auto max-w-5xl mb-8"
      >
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center">
          <div className="absolute inset-0 gradient-shift opacity-90" />
          <div className="absolute inset-0 scanline" aria-hidden />
          <div className="absolute inset-0 noise-overlay" aria-hidden />
          <GeometricShapes />

          <div className="relative z-10">
            <AnimatedDiv delay={0.1} direction="none">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.95, 1] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-4" />
              </motion.div>
            </AnimatedDiv>
            <AnimatedDiv delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Ahead of the AI Curve
              </h2>
            </AnimatedDiv>
            <AnimatedDiv delay={0.3}>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
                Get weekly insights on AI, digital marketing trends, and
                practical tools — delivered directly to your inbox.
              </p>
            </AnimatedDiv>
            <AnimatedDiv delay={0.4}>
              <Newsletter />
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
