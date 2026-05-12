import { createActor } from "@/backend";
import type { SubmitContactInput, SubmitResult } from "@/backend";
import { AnimatedDiv, AnimatedSection } from "@/components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle,
  ChevronDown,
  Cpu,
  Layers,
  Loader2,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
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

/* ─────────────────────────── PARTICLE FIELD ─────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 7,
    delay: Math.random() * 8,
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
            boxShadow: `0 0 ${p.size * 4}px oklch(0.72 0.22 ${p.hue} / 0.8)`,
          }}
          animate={{
            y: [-10, -90, -180],
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
  const orbs = [
    { size: 600, x: -15, y: -20, hue: 300, delay: 0 },
    { size: 450, x: 55, y: 30, hue: 195, delay: 3 },
    { size: 340, x: 75, y: 5, hue: 260, delay: 6 },
    { size: 220, x: 40, y: 70, hue: 150, delay: 9 },
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.hue}-${orb.x}-${orb.y}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, oklch(0.68 0.24 ${orb.hue} / 0.4) 0%, transparent 70%)`,
            filter: "blur(72px)",
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
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      aria-hidden
      style={{
        backgroundImage:
          "linear-gradient(oklch(0.92 0.008 280) 1px, transparent 1px), linear-gradient(90deg, oklch(0.92 0.008 280) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  );
}

/* ─────────────────────────── 3D TILT CARD ─────────────────────────── */
function TiltCard({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 280, damping: 28 });
  const sy = useSpring(ry, { stiffness: 280, damping: 28 });
  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rx.set(
          -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 7,
        );
        ry.set(
          ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7,
        );
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── CHAR REVEAL TITLE ─────────────────────────── */
function CharRevealTitle({
  text,
  className = "",
}: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={`word-${wi}-${word}`} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={`char-${ci}-${char}`}
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + wi * 0.08 + ci * 0.025,
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

/* ─────────────────────────── STAT COUNTER ─────────────────────────── */
function StatCounter({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 70;
    const inc = value / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(cur));
    }, 2200 / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground font-body">{label}</div>
    </div>
  );
}

/* ─────────────────────────── AI BRAIN SVG ─────────────────────────── */
function AIBrainSVG() {
  const nodes = [
    { id: "n1", cx: 200, cy: 80 },
    { id: "n2", cx: 320, cy: 140 },
    { id: "n3", cx: 100, cy: 200 },
    { id: "n4", cx: 240, cy: 220 },
    { id: "n5", cx: 380, cy: 260 },
    { id: "n6", cx: 150, cy: 320 },
    { id: "n7", cx: 290, cy: 360 },
    { id: "n8", cx: 420, cy: 160 },
    { id: "n9", cx: 60, cy: 300 },
    { id: "n10", cx: 340, cy: 400 },
  ];
  const edges = [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 5],
    [3, 4],
    [3, 6],
    [4, 7],
    [5, 6],
    [5, 8],
    [6, 7],
    [7, 9],
    [8, 5],
    [1, 7],
  ];
  return (
    <motion.svg
      viewBox="0 0 480 480"
      className="w-full max-w-sm md:max-w-md lg:max-w-lg"
      role="img"
      aria-label="AI Brain Network Illustration"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <title>AI Brain Network Illustration</title>
      <defs>
        <radialGradient id="nodeGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.78 0.28 300)" stopOpacity="1" />
          <stop
            offset="100%"
            stopColor="oklch(0.68 0.28 300)"
            stopOpacity="0.4"
          />
        </radialGradient>
        <radialGradient id="nodeGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.80 0.22 195)" stopOpacity="1" />
          <stop
            offset="100%"
            stopColor="oklch(0.72 0.22 195)"
            stopOpacity="0.4"
          />
        </radialGradient>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor="oklch(0.68 0.28 300)"
            stopOpacity="0.6"
          />
          <stop
            offset="100%"
            stopColor="oklch(0.72 0.22 195)"
            stopOpacity="0.3"
          />
        </linearGradient>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.path
          key={`edge-${a}-${b}`}
          d={`M ${nodes[a].cx} ${nodes[a].cy} L ${nodes[b].cx} ${nodes[b].cy}`}
          stroke="url(#edgeGrad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.6 + i * 0.08,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulse rings */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`ring-${n.id}`}
          cx={n.cx}
          cy={n.cy}
          r={12}
          fill="none"
          stroke={
            i % 2 === 0
              ? "oklch(0.68 0.28 300 / 0.3)"
              : "oklch(0.72 0.22 195 / 0.3)"
          }
          strokeWidth="1"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{
            duration: 2.5,
            delay: i * 0.22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={n.id}
          cx={n.cx}
          cy={n.cy}
          r={8}
          fill={i % 2 === 0 ? "url(#nodeGrad1)" : "url(#nodeGrad2)"}
          filter="url(#nodeGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.15, 1], opacity: 1 }}
          transition={{
            scale: {
              duration: 2 + i * 0.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            opacity: { duration: 0.4, delay: 0.8 + i * 0.06 },
          }}
        />
      ))}

      {/* Data flow pulses */}
      {edges.slice(0, 5).map(([a, b], i) => (
        <motion.circle
          key={`pulse-${edges[i][0]}-${edges[i][1]}`}
          r={3}
          fill={i % 2 === 0 ? "oklch(0.85 0.22 300)" : "oklch(0.85 0.22 195)"}
          initial={{ x: nodes[a].cx, y: nodes[a].cy, opacity: 0 }}
          animate={{
            x: [nodes[a].cx, nodes[b].cx],
            y: [nodes[a].cy, nodes[b].cy],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            delay: 1.5 + i * 0.7,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
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

/* ─────────────────────────── FEATURE CARD DATA ─────────────────────────── */
const features = [
  {
    id: "feat-content",
    icon: Brain,
    hue: 300,
    title: "AI Content Creation",
    desc: "Generate high-converting blogs, ad copy, and social posts in seconds. Our AI understands your brand voice and creates content that ranks and converts.",
  },
  {
    id: "feat-targeting",
    icon: Target,
    hue: 195,
    title: "Smart Audience Targeting",
    desc: "Predict and reach your ideal customers with precision. AI analyzes behavioral signals to find audiences 3x more likely to convert.",
  },
  {
    id: "feat-personalization",
    icon: Users,
    hue: 260,
    title: "Deep Personalization",
    desc: "Deliver 1:1 experiences at scale. Every email, ad, and webpage adapts in real-time to each visitor's interests and intent.",
  },
  {
    id: "feat-automation",
    icon: Zap,
    hue: 150,
    title: "Marketing Automation",
    desc: "Automate campaigns, follow-ups, and reporting. Free your team from repetitive tasks and focus on high-impact strategy.",
  },
];

/* ─────────────────────────── HOW IT WORKS DATA ─────────────────────────── */
const steps = [
  {
    num: "01",
    icon: Cpu,
    hue: 300,
    title: "Define Your Goals",
    desc: "Tell GrowthMind AI your marketing objectives — more leads, higher conversions, better brand awareness. We tailor a strategy just for you.",
  },
  {
    num: "02",
    icon: Layers,
    hue: 195,
    title: "Apply AI Tools",
    desc: "Our AI engine activates the right tools: content generation, audience segmentation, campaign automation, and predictive analytics.",
  },
  {
    num: "03",
    icon: TrendingUp,
    hue: 150,
    title: "Measure & Optimize",
    desc: "Real-time dashboards surface what's working. AI continuously A/B tests and optimizes every campaign element for maximum ROI.",
  },
];

/* ─────────────────────────── CONTACT FORM ─────────────────────────── */
function ContactForm() {
  const { actor } = useActor(createActor);
  const [form, setForm] = useState<SubmitContactInput>({
    name: "",
    email: "",
    company: undefined,
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setErrorMsg("Connecting to backend...");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const result: SubmitResult = await actor.submitContact(form);
      if (result.__kind__ === "ok") {
        setStatus("success");
        setForm({ name: "", email: "", company: undefined, message: "" });
      } else {
        setErrorMsg((result as { __kind__: "err"; err: string }).err);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        data-ocid="contact.success_state"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: 2 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.72 0.22 195 / 0.15)",
            border: "1px solid oklch(0.72 0.22 195 / 0.4)",
          }}
        >
          <CheckCircle size={32} style={{ color: "oklch(0.72 0.22 195)" }} />
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-foreground">
          Message Sent!
        </h3>
        <p className="text-muted-foreground">
          We'll be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-border/50 text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="contact.reset_button"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="contact.form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Alex Johnson"
            className="w-full px-4 py-3 rounded-xl glass border-input text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 transition-smooth text-sm"
            data-ocid="contact.name_input"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="alex@company.com"
            className="w-full px-4 py-3 rounded-xl glass border-input text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 transition-smooth text-sm"
            data-ocid="contact.email_input"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-company"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Company{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          value={form.company ?? ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, company: e.target.value || undefined }))
          }
          placeholder="Your company name"
          className="w-full px-4 py-3 rounded-xl glass border-input text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 transition-smooth text-sm"
          data-ocid="contact.company_input"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your marketing goals..."
          className="w-full px-4 py-3 rounded-xl glass border-input text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 transition-smooth text-sm resize-none"
          data-ocid="contact.message_textarea"
        />
      </div>
      {status === "error" && (
        <p
          className="text-sm text-red-400 px-1"
          data-ocid="contact.error_state"
        >
          {errorMsg}
        </p>
      )}
      <motion.button
        type="submit"
        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white gradient-shift glow-primary transition-smooth disabled:opacity-60 disabled:cursor-not-allowed text-base"
        data-ocid="contact.submit_button"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Rocket size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}

/* ─────────────────────────── LANDING PAGE ─────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        id="hero"
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6"
      >
        <FloatingOrbs />
        <GridLines />
        <ParticleField />
        <div className="absolute inset-0 gradient-hero" aria-hidden />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full gap-10 lg:gap-16"
        >
          {/* Left: text content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-glow bg-muted/40 backdrop-blur-sm mb-8"
              data-ocid="hero.badge"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-xs font-mono font-medium text-primary tracking-widest uppercase">
                AI-Powered Marketing Platform
              </span>
            </motion.div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6"
              data-ocid="hero.title"
              style={{ perspective: "600px" }}
            >
              <CharRevealTitle
                text="Transform Your"
                className="text-foreground block"
              />
              <span className="block mt-1">
                <CharRevealTitle
                  text="Marketing"
                  className="text-gradient-primary glow-text-primary block"
                />
              </span>
              <CharRevealTitle
                text="With AI"
                className="text-foreground block mt-1"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              data-ocid="hero.subtitle"
            >
              AI-powered digital marketing that delivers{" "}
              <strong className="text-foreground">10x results</strong>. Automate
              campaigns, predict customer behavior, and grow revenue — all in
              one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white gradient-shift glow-primary transition-smooth text-base w-full sm:w-auto justify-center"
                data-ocid="hero.primary_cta"
              >
                <Sparkles size={18} />
                Get Started Free
              </motion.a>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-foreground bg-muted/60 border border-border/50 hover:border-primary/30 transition-smooth text-base w-full sm:w-auto justify-center"
                data-ocid="hero.secondary_cta"
              >
                Watch Demo
                <ChevronDown size={18} />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-12 flex items-center gap-4 flex-wrap justify-center lg:justify-start"
            >
              {["500+ Clients", "4.9★ Rating", "No credit card"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <CheckCircle
                    size={12}
                    style={{ color: "oklch(0.72 0.22 195)" }}
                  />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI Brain illustration */}
          <div
            className="flex-1 flex items-center justify-center max-w-md lg:max-w-none"
            data-ocid="hero.illustration"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.68 0.28 300 / 0.2) 0%, oklch(0.72 0.22 195 / 0.1) 50%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <AIBrainSVG />
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-smooth cursor-pointer"
          aria-label="Scroll to features"
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

      {/* ── FEATURES ── */}
      <section
        id="features"
        data-ocid="features.section"
        className="py-24 bg-card border-y border-border/30 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 noise-overlay opacity-30"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedDiv direction="none" className="text-center mb-16">
            <Badge
              variant="outline"
              className="font-mono text-xs tracking-wider text-primary border-primary/40 bg-primary/10 mb-4"
            >
              Platform Features
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything You Need to{" "}
              <span className="text-gradient-primary">Dominate Marketing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A complete AI marketing stack — from content creation to campaign
              automation — built to scale your results.
            </p>
          </AnimatedDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <AnimatedDiv
                  key={feat.id}
                  delay={i * 0.1}
                  data-ocid={`features.item.${i + 1}`}
                >
                  <TiltCard className="h-full">
                    <div className="relative h-full rounded-2xl bg-background border border-border/40 overflow-hidden card-glow group p-6 flex flex-col gap-4">
                      <div
                        className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-100 transition-smooth rounded-full blur-2xl"
                        style={{
                          background: `oklch(0.68 0.22 ${feat.hue} / 0.15)`,
                        }}
                        aria-hidden
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{
                          background: `linear-gradient(90deg, oklch(0.68 0.22 ${feat.hue} / 0.8), transparent)`,
                        }}
                        aria-hidden
                      />
                      <motion.div
                        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        animate={{
                          boxShadow: [
                            `0 0 12px oklch(0.68 0.22 ${feat.hue} / 0.2)`,
                            `0 0 28px oklch(0.68 0.22 ${feat.hue} / 0.5)`,
                            `0 0 12px oklch(0.68 0.22 ${feat.hue} / 0.2)`,
                          ],
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        style={{
                          background: `oklch(0.68 0.22 ${feat.hue} / 0.12)`,
                        }}
                      >
                        <Icon
                          size={22}
                          style={{ color: `oklch(0.78 0.22 ${feat.hue})` }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <div className="relative z-10">
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">
                          {feat.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                      <div className="relative z-10 mt-auto">
                        <div
                          className="inline-flex items-center gap-1.5 text-xs font-medium"
                          style={{ color: `oklch(0.78 0.22 ${feat.hue})` }}
                        >
                          Learn more <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        data-ocid="how_it_works.section"
        className="py-24 relative overflow-hidden"
      >
        <FloatingOrbs />
        <GridLines />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <AnimatedDiv direction="none" className="text-center mb-20">
            <Badge
              variant="outline"
              className="font-mono text-xs tracking-wider text-accent border-accent/40 bg-accent/10 mb-4"
            >
              How It Works
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              From Goals to <span className="text-gradient-accent">Growth</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Three steps — and GrowthMind AI does the heavy lifting.
            </p>
          </AnimatedDiv>

          <div className="relative">
            {/* Connector line */}
            <div
              className="hidden lg:block absolute top-12 left-0 right-0 flex items-center justify-center"
              aria-hidden
              style={{
                position: "absolute",
                top: "48px",
                left: "16.67%",
                right: "16.67%",
              }}
            >
              <motion.div
                className="h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.28 300 / 0.6), oklch(0.72 0.22 195 / 0.6), oklch(0.6 0.18 150 / 0.6))",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <AnimatedDiv
                    key={step.num}
                    delay={i * 0.2}
                    direction="up"
                    data-ocid={`how_it_works.step.${i + 1}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
                        style={{
                          background: `radial-gradient(circle, oklch(0.68 0.24 ${step.hue} / 0.25) 0%, oklch(0.68 0.22 ${step.hue} / 0.05) 70%)`,
                          border: `1px solid oklch(0.68 0.22 ${step.hue} / 0.5)`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px oklch(0.68 0.22 ${step.hue} / 0.2)`,
                            `0 0 40px oklch(0.68 0.22 ${step.hue} / 0.45)`,
                            `0 0 20px oklch(0.68 0.22 ${step.hue} / 0.2)`,
                          ],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon
                          size={28}
                          style={{ color: `oklch(0.78 0.22 ${step.hue})` }}
                          strokeWidth={1.5}
                        />
                        <div
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                          style={{
                            background: `oklch(0.68 0.22 ${step.hue})`,
                            color: "oklch(0.1 0.01 280)",
                            boxShadow: `0 0 12px oklch(0.68 0.22 ${step.hue} / 0.6)`,
                          }}
                        >
                          {i + 1}
                        </div>
                      </motion.div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
                        {step.desc}
                      </p>
                    </div>
                  </AnimatedDiv>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ── STATS ── */}
      <section
        id="stats"
        data-ocid="stats.section"
        className="py-24 bg-card border-y border-border/30 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 noise-overlay opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 scanline opacity-20" aria-hidden />
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedDiv direction="none" className="text-center mb-16">
            <Badge
              variant="outline"
              className="font-mono text-xs tracking-wider text-primary border-primary/40 bg-primary/10 mb-4"
            >
              By the Numbers
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Results That{" "}
              <span className="text-gradient-primary">
                Speak for Themselves
              </span>
            </h2>
          </AnimatedDiv>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[
              { value: 500, suffix: "+", label: "Clients Worldwide", hue: 300 },
              { value: 10, suffix: "x", label: "Average ROI", hue: 195 },
              {
                value: 98,
                suffix: "%",
                label: "Client Satisfaction",
                hue: 150,
              },
              { value: 3, suffix: "M+", label: "Campaigns Launched", hue: 260 },
            ].map((stat, i) => (
              <AnimatedDiv
                key={stat.label}
                delay={i * 0.1}
                data-ocid={`stats.item.${i + 1}`}
              >
                <TiltCard>
                  <div
                    className="relative rounded-2xl border border-border/40 overflow-hidden p-8 text-center card-glow"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, oklch(0.68 0.22 ${stat.hue} / 0.12) 0%, oklch(0.16 0.015 280) 70%)`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, transparent, oklch(0.68 0.22 ${stat.hue} / 0.7), transparent)`,
                      }}
                      aria-hidden
                    />
                    <StatCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </div>
                </TiltCard>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <AnimatedSection
        id="contact"
        data-ocid="contact.section"
        className="py-24 relative overflow-hidden"
      >
        <FloatingOrbs />
        <GridLines />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedDiv delay={0.1}>
                <Badge
                  variant="outline"
                  className="font-mono text-xs tracking-wider text-primary border-primary/40 bg-primary/10 mb-4"
                >
                  Get in Touch
                </Badge>
              </AnimatedDiv>
              <AnimatedDiv delay={0.2}>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Ready to <span className="text-gradient-primary">Grow?</span>
                </h2>
              </AnimatedDiv>
              <AnimatedDiv delay={0.3}>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Talk to our AI marketing experts. Tell us your goals, and
                  we'll show you exactly how GrowthMind AI can deliver the
                  growth you're looking for.
                </p>
              </AnimatedDiv>
              <AnimatedDiv delay={0.4}>
                <div className="space-y-4">
                  {[
                    { icon: Bot, text: "Free strategy session", hue: 300 },
                    {
                      icon: BarChart3,
                      text: "Custom ROI projection",
                      hue: 195,
                    },
                    {
                      icon: Rocket,
                      text: "Launch in under 48 hours",
                      hue: 150,
                    },
                  ].map(({ icon: Icon, text, hue }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `oklch(0.68 0.22 ${hue} / 0.12)`,
                          border: `1px solid oklch(0.68 0.22 ${hue} / 0.3)`,
                        }}
                      >
                        <Icon
                          size={16}
                          style={{ color: `oklch(0.78 0.22 ${hue})` }}
                        />
                      </div>
                      <span className="text-foreground font-medium">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedDiv>
            </div>

            <AnimatedDiv delay={0.2} direction="right">
              <div
                className="relative rounded-2xl p-8 overflow-hidden"
                style={{
                  background: "oklch(0.16 0.015 280 / 0.9)",
                  border: "1px solid oklch(0.68 0.28 300 / 0.3)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 0 60px oklch(0.68 0.28 300 / 0.15), 0 24px 48px oklch(0.1 0.01 280 / 0.6)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-32 h-32 opacity-40 pointer-events-none"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.68 0.28 300 / 0.4) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-24 h-24 opacity-30 pointer-events-none"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.72 0.22 195 / 0.4) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Start Your Free Trial
                  </h3>
                  <ContactForm />
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>

      {/* ── FOOTER CTA STRIPE ── */}
      <AnimatedSection
        data-ocid="footer_cta.section"
        className="py-4 px-4 mx-auto max-w-5xl mb-12"
      >
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
          <div className="absolute inset-0 gradient-shift opacity-90" />
          <div className="absolute inset-0 scanline" aria-hidden />
          <div className="absolute inset-0 noise-overlay" aria-hidden />
          <ParticleField />
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
                <Sparkles
                  className="w-10 h-10 mx-auto mb-4"
                  style={{ color: "oklch(0.98 0.008 300 / 0.8)" }}
                />
              </motion.div>
            </AnimatedDiv>
            <AnimatedDiv delay={0.2}>
              <h2
                className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight"
                style={{ color: "oklch(0.98 0.008 300)" }}
              >
                Ready to Unlock 10x Growth?
              </h2>
            </AnimatedDiv>
            <AnimatedDiv delay={0.3}>
              <p
                className="max-w-xl mx-auto mb-10 text-lg"
                style={{ color: "oklch(0.92 0.008 300 / 0.8)" }}
              >
                Join 500+ businesses already using GrowthMind AI to automate
                their marketing and scale revenue.
              </p>
            </AnimatedDiv>
            <AnimatedDiv delay={0.4}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-bold text-lg transition-smooth"
                style={{
                  background: "oklch(0.98 0.008 300)",
                  color: "oklch(0.11 0.01 280)",
                }}
                data-ocid="footer_cta.primary_button"
              >
                <Rocket size={20} />
                Get Started Free
                <ArrowRight size={18} />
              </motion.a>
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
