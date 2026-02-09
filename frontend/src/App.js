import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  TrendingUp,
  Award,
  Phone,
  ArrowRight,
  MapPin,
  Quote,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NAV_LINKS = [
  { label: "Master Investor", href: "#investor", testid: "nav-link-investor" },
  {
    label: "Consultancy",
    href: "#consultancy",
    testid: "nav-link-consultancy",
  },
  { label: "Projects", href: "#projects", testid: "nav-link-projects" },
  { label: "Profile", href: "#profile", testid: "nav-link-profile" },
  { label: "Awards", href: "#awards", testid: "nav-link-awards" },
  {
    label: "Testimonials",
    href: "#testimonials",
    testid: "nav-link-testimonials",
  },
  { label: "Contact", href: "#contact", testid: "nav-link-contact" },
];

const STATS = [
  { value: "15+", label: "Years of Market Mastery" },
  { value: "₹500Cr+", label: "Assets Managed" },
  { value: "120+", label: "Signature Homes Delivered" },
];

const SERVICES = [
  {
    title: "Portfolio Management",
    detail: "Curated assets for multi-decade wealth growth.",
  },
  {
    title: "Commercial Leasing",
    detail: "Prime corridors in Noida & Greater Noida.",
  },
  {
    title: "High-Yield Assets",
    detail: "Access to pre-launch inventory and capital structuring.",
  },
  {
    title: "Legal Advisory",
    detail: "Clear titles, compliant investments, zero surprises.",
  },
];

const PROJECTS = [
  {
    title: "Skyline Residences",
    location: "Sector 62, Noida",
    image:
      "https://images.unsplash.com/photo-1758448511320-05d7d28f4298?crop=entropy&cs=srgb&fm=jpg&q=85",
    testid: "project-card-skyline",
  },
  {
    title: "Aurum Corporate",
    location: "Greater Noida West",
    image:
      "https://images.unsplash.com/photo-1709450574205-a0cd8912a919?crop=entropy&cs=srgb&fm=jpg&q=85",
    testid: "project-card-aurum",
  },
  {
    title: "Heritage Towers",
    location: "Noida Expressway",
    image:
      "https://images.unsplash.com/photo-1557836973-d56094d20104?crop=entropy&cs=srgb&fm=jpg&q=85",
    testid: "project-card-heritage",
  },
];

const AWARDS = [
  {
    year: "2024",
    title: "Best Luxury Developer - NCR",
    org: "Real Estate Excellence Council",
  },
  {
    year: "2023",
    title: "Investor Trust Award",
    org: "Capital Markets Guild",
  },
  {
    year: "2022",
    title: "Architecture & Sustainability Laureate",
    org: "Urban Vision Forum",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SSB Group transformed our commercial portfolio with remarkable precision and pace.",
    name: "Naina Kapoor",
    role: "Managing Partner, Aria Capital",
  },
  {
    quote:
      "Their consultancy is surgical — every recommendation is backed by market intelligence.",
    name: "Rohit Gulati",
    role: "Director, Zenith Tech Parks",
  },
  {
    quote:
      "The Master Investor playbook gave us confidence to scale across Noida.",
    name: "Meera Sinha",
    role: "Founder, Northcrest Holdings",
  },
];

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus({
        type: "error",
        message: "Please complete all fields to consult our team.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      await axios.post(`${API}/leads`, formData);
      setStatus({
        type: "success",
        message: "Request received. Our consultants will call you shortly.",
      });
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "We could not submit your request. Please retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell" data-testid="landing-page">
      <nav
        className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur fade-in"
        style={{ "--delay": "0.05s" }}
        data-testid="main-navigation"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
          <div className="flex items-center gap-3" data-testid="brand-logo">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-black text-white"
              data-testid="brand-icon"
            >
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p
                className="text-lg font-semibold uppercase tracking-[0.2em]"
                data-testid="brand-name"
              >
                SSB Group
              </p>
              <p
                className="text-xs uppercase text-neutral-500"
                data-testid="brand-tagline"
              >
                Builder & Master Investor
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm font-semibold uppercase text-neutral-700 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-testid={link.testid}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="tel:+919876543210"
            className="btn-lift inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-semibold uppercase"
            data-testid="nav-phone-cta"
          >
            <Phone className="h-4 w-4" />
            +91 98765 43210
          </a>
        </div>
      </nav>

      <header
        className="relative overflow-hidden bg-black text-white"
        data-testid="hero-section"
      >
        <img
          src="https://images.unsplash.com/photo-1579283987703-5ae978f95ace?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="SSB Group signature skyline"
          className="hero-image"
          data-testid="hero-background-image"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center gap-10 px-4 py-16 sm:min-h-[88vh] sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-24 lg:px-10">
          <div
            className="relative z-10 max-w-2xl slide-in-left"
            style={{ "--delay": "0.1s" }}
            data-testid="hero-content"
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-300"
              data-testid="hero-kicker"
            >
              Noida · Greater Noida · Capital Excellence
            </p>
            <h1
              className="mt-6 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-6xl"
              data-testid="hero-headline"
            >
              Building Wealth. Crafting Legacies.
            </h1>
            <p
              className="mt-6 text-base text-neutral-200 sm:text-lg md:text-xl"
              data-testid="hero-subhead"
            >
              SSB Group is the master builder and consultancy trusted by elite
              investors to secure iconic addresses and high-yield portfolios.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4" data-testid="hero-cta-group">
              <a
                href="#contact"
                className="btn-lift inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase text-black sm:px-6 sm:text-sm"
                data-testid="hero-primary-cta"
              >
                Consult the Master Investor
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="btn-lift inline-flex items-center gap-3 rounded-full border border-white px-5 py-3 text-xs font-semibold uppercase sm:px-6 sm:text-sm"
                data-testid="hero-secondary-cta"
              >
                View Signature Assets
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6" data-testid="hero-stats">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="border-l border-white/20 pl-4 fade-up"
                  style={{ "--delay": `${0.2 + index * 0.08}s` }}
                  data-testid={`hero-stat-${index}`}
                >
                  <p className="text-2xl font-semibold text-gold" data-testid={`hero-stat-value-${index}`}>
                    {stat.value}
                  </p>
                  <p
                    className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-300"
                    data-testid={`hero-stat-label-${index}`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative z-10 w-full max-w-md space-y-4 sm:space-y-6 slide-in-right"
            style={{ "--delay": "0.2s" }}
            data-testid="hero-card"
          >
            <div className="border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur" data-testid="hero-card-content">
              <p
                className="text-xs uppercase tracking-[0.3em] text-neutral-200"
                data-testid="hero-card-kicker"
              >
                Master Investor Blueprint
              </p>
              <p
                className="mt-4 text-xl font-semibold"
                data-testid="hero-card-title"
              >
                Private market intelligence, delivered weekly.
              </p>
              <p className="mt-3 text-sm text-neutral-200" data-testid="hero-card-text">
                Access pre-launch inventory, investor syndicates, and advisory
                frameworks curated by SSB Group.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm" data-testid="hero-card-location">
                <MapPin className="h-4 w-4" />
                Focused on Noida & Greater Noida
              </div>
            </div>
            <div className="border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur" data-testid="hero-card-secondary">
              <p className="text-xs uppercase tracking-[0.3em]" data-testid="hero-card-secondary-kicker">
                Consultancy Command Center
              </p>
              <p className="mt-3 text-lg font-semibold" data-testid="hero-card-secondary-title">
                Structured advisory for strategic buyers & institutional investors.
              </p>
              <p className="mt-3 text-sm text-neutral-200" data-testid="hero-card-secondary-text">
                Our analysts map opportunity zones, rental upside, and exit
                timing in real time.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section
        id="investor"
        className="architectural-grid border-b border-neutral-200"
        data-testid="investor-section"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-10">
          <div className="space-y-6 fade-up" style={{ "--delay": "0.05s" }} data-testid="investor-content">
            <p
              className="text-xs uppercase tracking-[0.4em] text-neutral-500"
              data-testid="investor-kicker"
            >
              The Master Investor
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="investor-title">
              Rajiv Malhotra
            </h2>
            <p className="text-lg text-neutral-600" data-testid="investor-subtitle">
              Wealth architect, deal strategist, and the advisory force behind
              SSB Group’s most iconic real estate wins.
            </p>
            <div className="grid gap-6 md:grid-cols-2" data-testid="investor-metrics">
              <div className="border border-neutral-200 p-5" data-testid="investor-metric-experience">
                <p className="text-sm uppercase text-neutral-500" data-testid="investor-metric-experience-label">
                  Experience
                </p>
                <p className="mt-3 text-2xl font-semibold text-gold" data-testid="investor-metric-experience-value">
                  15+ Years
                </p>
              </div>
              <div className="border border-neutral-200 p-5" data-testid="investor-metric-managed">
                <p className="text-sm uppercase text-neutral-500" data-testid="investor-metric-managed-label">
                  Capital Managed
                </p>
                <p className="mt-3 text-2xl font-semibold text-gold" data-testid="investor-metric-managed-value">
                  ₹500Cr+
                </p>
              </div>
            </div>
            <blockquote
              className="border-l-4 border-black pl-6 text-lg italic text-neutral-700 accent-font"
              data-testid="investor-quote"
            >
              “Real estate is not just land; it is the foundation of your future
              wealth.”
            </blockquote>
          </div>
          <div className="relative fade-up" style={{ "--delay": "0.15s" }} data-testid="investor-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="Master Investor portrait"
              className="w-full border border-neutral-200 object-cover"
              data-testid="investor-image"
            />
            <div
              className="absolute bottom-6 left-6 right-6 border border-neutral-200 bg-white/90 p-4"
              data-testid="investor-image-caption"
            >
              <p className="text-sm uppercase text-neutral-500" data-testid="investor-image-caption-label">
                Master Investor · SSB Group
              </p>
              <p className="mt-2 text-lg font-semibold" data-testid="investor-image-caption-text">
                Building elite portfolios across Noida & Greater Noida.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="consultancy"
        className="bg-white"
        data-testid="consultancy-section"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl" data-testid="consultancy-heading">
              <p
                className="text-xs uppercase tracking-[0.4em] text-neutral-500"
                data-testid="consultancy-kicker"
              >
                Consultancy Command Center
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="consultancy-title">
                Strategic Advisory for Builders & Investors.
              </h2>
            </div>
            <p className="text-lg text-neutral-600" data-testid="consultancy-description">
              SSB Group delivers market intelligence, legal clarity, and capital
              protection across every real estate move.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2" data-testid="consultancy-services">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="border border-neutral-200 p-5 sm:p-6 card-lift fade-up"
                style={{ "--delay": `${0.1 + index * 0.08}s` }}
                data-testid={`service-card-${index}`}
              >
                <div className="flex items-center gap-3" data-testid={`service-card-header-${index}`}>
                  <TrendingUp className="h-5 w-5 text-gold-solid" />
                  <h3 className="text-lg font-semibold" data-testid={`service-card-title-${index}`}>
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-neutral-600" data-testid={`service-card-detail-${index}`}>
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="architectural-grid border-y border-neutral-200"
        data-testid="projects-section"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div data-testid="projects-heading">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500" data-testid="projects-kicker">
                Signature Addresses
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="projects-title">
                Architectural landmarks curated by SSB Group.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm uppercase text-neutral-600" data-testid="projects-locations">
              <MapPin className="h-4 w-4" />
              Noida · Greater Noida
            </div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" data-testid="projects-grid">
            <div className="grid gap-6" data-testid="projects-primary">
              <div
                className="project-card card-lift fade-up"
                style={{ "--delay": "0.1s" }}
                data-testid={PROJECTS[0].testid}
              >
                <img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].title}
                  className="project-image"
                  data-testid="project-image-skyline"
                />
                <div className="project-overlay" data-testid="project-overlay-skyline">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-300" data-testid="project-location-skyline">
                    {PROJECTS[0].location}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold" data-testid="project-title-skyline">
                    {PROJECTS[0].title}
                  </h3>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2" data-testid="projects-secondary-row">
                {PROJECTS.slice(1).map((project, index) => (
                  <div
                    className="project-card card-lift fade-up"
                    style={{ "--delay": `${0.18 + index * 0.08}s` }}
                    key={project.title}
                    data-testid={project.testid}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      data-testid={`project-image-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
                    />
                    <div className="project-overlay" data-testid={`project-overlay-${project.title.replace(/\s+/g, "-").toLowerCase()}`}>
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-300" data-testid={`project-location-${project.title.replace(/\s+/g, "-").toLowerCase()}`}>
                        {project.location}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold" data-testid={`project-title-${project.title.replace(/\s+/g, "-").toLowerCase()}`}>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="border border-neutral-200 bg-white p-5 sm:p-6 card-lift fade-up"
              style={{ "--delay": "0.15s" }}
              data-testid="projects-summary"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500" data-testid="projects-summary-kicker">
                Investment Signal
              </p>
              <h3 className="mt-4 text-2xl font-semibold" data-testid="projects-summary-title">
                High-yield corridors mapped for decisive investors.
              </h3>
              <p className="mt-4 text-sm text-neutral-600" data-testid="projects-summary-text">
                We combine build quality, leasing velocity, and exit strategy into
                a single blueprint that keeps investor capital agile.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-700" data-testid="projects-summary-list">
                <li className="flex items-center gap-3" data-testid="projects-summary-item-1">
                  <Award className="h-4 w-4 text-gold-solid" />
                  Pre-launch access for top-tier developments
                </li>
                <li className="flex items-center gap-3" data-testid="projects-summary-item-2">
                  <Award className="h-4 w-4 text-gold-solid" />
                  Concierge leasing for institutional tenants
                </li>
                <li className="flex items-center gap-3" data-testid="projects-summary-item-3">
                  <Award className="h-4 w-4 text-gold-solid" />
                  End-to-end compliance and title assurance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="profile" className="bg-white" data-testid="profile-section">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="border border-neutral-200 p-6 sm:p-8 card-lift fade-up" style={{ "--delay": "0.1s" }} data-testid="profile-card">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500" data-testid="profile-kicker">
                Investor Profile (Dummy)
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl" data-testid="profile-title">
                Aria Capital Partners
              </h2>
              <p className="mt-3 text-sm uppercase text-neutral-500" data-testid="profile-subtitle">
                Institutional Investor · Noida & Greater Noida
              </p>
              <p className="mt-6 text-sm text-neutral-600" data-testid="profile-description">
                Seeking a diversified mix of luxury residences, commercial
                leasing, and long-term asset protection across NCR corridors.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2" data-testid="profile-metrics">
                <div className="border border-neutral-200 p-4" data-testid="profile-metric-ticket">
                  <p className="text-xs uppercase text-neutral-500" data-testid="profile-metric-ticket-label">
                    Ticket Size
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gold" data-testid="profile-metric-ticket-value">
                    ₹80Cr+
                  </p>
                </div>
                <div className="border border-neutral-200 p-4" data-testid="profile-metric-horizon">
                  <p className="text-xs uppercase text-neutral-500" data-testid="profile-metric-horizon-label">
                    Investment Horizon
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gold" data-testid="profile-metric-horizon-value">
                    8-10 Years
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 fade-up" style={{ "--delay": "0.2s" }} data-testid="profile-details">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500" data-testid="profile-details-kicker">
                Consultancy Alignment
              </p>
              <h3 className="text-3xl font-bold" data-testid="profile-details-title">
                Crafted roadmap for elite investors.
              </h3>
              <p className="text-lg text-neutral-600" data-testid="profile-details-description">
                SSB Group structures bespoke pipelines for capital deployment,
                from land acquisition to long-term leasing strategies.
              </p>
              <div className="grid gap-4" data-testid="profile-details-list">
                {[
                  "Quarterly asset review with exit projections",
                  "Integrated compliance & risk mitigation",
                  "On-ground project monitoring and reporting",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3" data-testid={`profile-detail-item-${index}`}>
                    <span className="h-2 w-2 rounded-full bg-black" />
                    <p className="text-sm text-neutral-700" data-testid={`profile-detail-text-${index}`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="btn-lift inline-flex items-center gap-3 rounded-full border border-black px-6 py-3 text-sm font-semibold uppercase"
                data-testid="profile-cta"
              >
                Build My Portfolio
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="awards"
        className="architectural-grid border-y border-neutral-200"
        data-testid="awards-section"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div data-testid="awards-heading">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500" data-testid="awards-kicker">
                Awards & Recognition
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="awards-title">
                Legacy built on precision and trust.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm uppercase text-neutral-600" data-testid="awards-highlight">
              <Award className="h-4 w-4 text-gold-solid" />
              Elite honors across NCR
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-testid="awards-grid">
            {AWARDS.map((award, index) => (
              <div
                key={award.title}
                className="border border-neutral-200 bg-white p-5 sm:p-6 card-lift fade-up"
                style={{ "--delay": `${0.1 + index * 0.08}s` }}
                data-testid={`award-card-${index}`}
              >
                <p className="text-sm font-semibold text-gold" data-testid={`award-year-${index}`}>
                  {award.year}
                </p>
                <h3 className="mt-4 text-lg font-semibold" data-testid={`award-title-${index}`}>
                  {award.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600" data-testid={`award-org-${index}`}>
                  {award.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white" data-testid="testimonials-section">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="max-w-2xl" data-testid="testimonials-heading">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500" data-testid="testimonials-kicker">
              Client Testimonials
            </p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="testimonials-title">
              The confidence of capital leaders.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-testid="testimonials-grid">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="border border-neutral-200 p-5 sm:p-6 card-lift fade-up"
                style={{ "--delay": `${0.1 + index * 0.08}s` }}
                data-testid={`testimonial-card-${index}`}
              >
                <Quote className="h-6 w-6 text-gold-solid" data-testid={`testimonial-icon-${index}`} />
                <p className="mt-4 text-sm italic text-neutral-700 accent-font" data-testid={`testimonial-quote-${index}`}>
                  “{testimonial.quote}”
                </p>
                <p className="mt-6 text-sm font-semibold" data-testid={`testimonial-name-${index}`}>
                  {testimonial.name}
                </p>
                <p className="text-xs uppercase text-neutral-500" data-testid={`testimonial-role-${index}`}>
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black text-white" data-testid="contact-section">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:px-10">
          <div className="space-y-6 fade-up" style={{ "--delay": "0.1s" }} data-testid="contact-content">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400" data-testid="contact-kicker">
              Lead Capture
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl" data-testid="contact-title">
              Secure your advisory session with the Master Investor.
            </h2>
            <p className="text-lg text-neutral-300" data-testid="contact-description">
              Share your requirements and our consultancy team will deliver a
              tailored investment roadmap within 24 hours.
            </p>
            <div className="border border-white/20 p-5 sm:p-6 card-lift" data-testid="contact-info-card">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400" data-testid="contact-info-kicker">
                Direct Line
              </p>
              <p className="mt-3 text-2xl font-semibold" data-testid="contact-info-phone">
                +91 98765 43210
              </p>
              <p className="mt-3 text-sm text-neutral-300" data-testid="contact-info-note">
                Dedicated advisory desk for Noida & Greater Noida.
              </p>
            </div>
          </div>
          <form
            className="border border-white/20 bg-white/5 p-6 sm:p-8 fade-up"
            style={{ "--delay": "0.2s" }}
            onSubmit={handleSubmit}
            data-testid="lead-form"
          >
            <div className="space-y-6" data-testid="lead-form-fields">
              <div data-testid="lead-form-name">
                <label className="text-xs uppercase tracking-[0.3em]" data-testid="lead-form-name-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-400"
                  placeholder="Enter your name"
                  data-testid="lead-form-name-input"
                />
              </div>
              <div data-testid="lead-form-email">
                <label className="text-xs uppercase tracking-[0.3em]" data-testid="lead-form-email-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-400"
                  placeholder="Enter your email"
                  data-testid="lead-form-email-input"
                />
              </div>
              <div data-testid="lead-form-phone">
                <label className="text-xs uppercase tracking-[0.3em]" data-testid="lead-form-phone-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-neutral-400"
                  placeholder="Enter your number"
                  data-testid="lead-form-phone-input"
                />
              </div>
            </div>
            {status.message && (
              <p
                className={`mt-6 text-sm ${
                  status.type === "success" ? "text-emerald-300" : "text-rose-300"
                }`}
                data-testid={
                  status.type === "success"
                    ? "lead-form-success-message"
                    : "lead-form-error-message"
                }
              >
                {status.message}
              </p>
            )}
            <button
              type="submit"
              className="btn-lift mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase text-black"
              disabled={isSubmitting}
              data-testid="lead-form-submit-button"
            >
              {isSubmitting ? "Submitting..." : "Get Expert Advice"}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white fade-in" style={{ "--delay": "0.1s" }} data-testid="footer-section">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div data-testid="footer-brand">
            <p className="text-lg font-semibold uppercase tracking-[0.2em]" data-testid="footer-brand-name">
              SSB Group
            </p>
            <p className="text-sm text-neutral-600" data-testid="footer-brand-tagline">
              Master Investor & Real Estate Consultancy
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm uppercase text-neutral-600" data-testid="footer-links">
            {NAV_LINKS.map((link) => (
              <a
                key={`footer-${link.href}`}
                href={link.href}
                className="nav-link"
                data-testid={`footer-${link.testid}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="tel:+919876543210"
            className="btn-lift inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-semibold uppercase"
            data-testid="footer-phone-cta"
          >
            <Phone className="h-4 w-4" />
            +91 98765 43210
          </a>
        </div>
      </footer>

      <a
        href="#contact"
        className="mobile-sticky-cta btn-lift fade-in"
        style={{ "--delay": "0.3s" }}
        data-testid="mobile-sticky-cta"
      >
        Get Expert Advice
      </a>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
