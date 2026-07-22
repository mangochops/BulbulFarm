"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import {
    Sprout,
    Shovel,
    Trees,
    DraftingCompass,
    Building2,
    TreePine,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    BarChart3,
    PieChart,
    ShieldCheck,
    CalendarCheck
} from "lucide-react"

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

interface ServiceDetail {
    id: string
    title: string
    subtitle: string
    icon: React.ElementType
    heroImage: string
    summary: string
    description: string
    deliverables: string[]
    process: { step: string; title: string; desc: string }[]
    metrics: { label: string; value: string; hint: string }[]
    graphType: "growth" | "composition" | "timeline"
}

const detailedServices: ServiceDetail[] = [
    {
        id: "seedling-supply",
        title: "Seedling Nursery & Direct Supply",
        subtitle: "High-yield, healthy indigenous and exotic varieties grown for maximum resilience.",
        icon: Sprout,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Propagating climate-adapted seedlings with superior survival rates for large and small scale planting.",
        description: "Our core expertise lies in growing premium-grade tree seedlings inside controlled nursery conditions in Limuru. We manage every stage from seed selection and soil composition to root structure hardening. Whether you need indigenous timber trees, fast-growing shade covers, or commercial fruit orchards, our stock is inspected for disease resistance and outdoor acclimatization prior to delivery.",
        deliverables: [
            "Custom seedling batches prepared to target root depths",
            "Species-specific planting & soil guide manuals",
            "Secure nationwide distribution logistics",
            "Bulk trade rates for NGOs, schools, and private estates"
        ],
        process: [
            { step: "01", title: "Species Selection", desc: "Consultation to pick species aligned with your soil profile and climate." },
            { step: "02", title: "Root Hardening", desc: "Gradual outdoor exposure to ensure high field survival post-transit." },
            { step: "03", title: "Dispatch & Delivery", desc: "Custom timber/crate transport preserving soil balls and root vitality." }
        ],
        metrics: [
            { label: "Sapling Survival Rate", value: "96.4%", hint: "Based on monitored client plantings" },
            { label: "Nursery Species Capacity", value: "80+", hint: "Native, exotic, fruit & ornamental" },
            { label: "Annual Supply Volume", value: "250K+", hint: "Seedlings raised per cycle" }
        ],
        graphType: "growth"
    },
    {
        id: "site-assessment",
        title: "Site Assessment & Soil Consultation",
        subtitle: "Data-driven land analysis to guarantee long-term canopy performance.",
        icon: DraftingCompass,
        heroImage: "/About.jpeg",
        summary: "Comprehensive site evaluation, soil chemistry testing, and climate pairing prior to planting.",
        description: "Successful tree growing starts underground. Our agronomy team conducts complete field assessments analyzing pH levels, drainage patterns, compaction, and seasonal rainfall alignment. We eliminate guess-work by providing tailored species mapping so your investment thrives through drought and heavy rainy seasons alike.",
        deliverables: [
            "Full soil pH and drainage analytical report",
            "Micro-climate zoning & windbreak layout plans",
            "Species compatibility matrix",
            "Irrigation and soil amendment roadmap"
        ],
        process: [
            { step: "01", title: "Soil Sampling", desc: "Core sample collection across multi-zone land areas." },
            { step: "02", title: "Data Analysis", desc: "Testing drainage, organic matter, and structural density." },
            { step: "03", title: "Zoning Strategy", desc: "Drafting precision maps matching trees to exact terrain conditions." }
        ],
        metrics: [
            { label: "Tested Acres", value: "1,200+", hint: "Across diverse regions in Kenya" },
            { label: "Growth Boost", value: "+35%", hint: "Faster maturation vs unassessed soil" },
            { label: "Soil Accuracy", value: "99%", hint: "Lab-backed nutrient profile reporting" }
        ],
        graphType: "composition"
    },
    {
        id: "turnkey-planting",
        title: "Turnkey Tree Planting Services",
        subtitle: "End-to-end execution from ground prep to complete plantation deployment.",
        icon: Shovel,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Full site clearance, pit digging, soil conditioning, and professional seedling planting.",
        description: "Avoid labor bottlenecks and improper planting depths with our full-service execution team. We manage site preparation, pit sizing ($60\text{cm} \times 60\text{cm}$ standard), compost enrichment, root positioning, and initial hydration. Designed for farm owners, institutions, and residential developments looking for seamless execution.",
        deliverables: [
            "Mechanized or manual hole excavation & spacing",
            "Organic manure & water-retention hydrogel integration",
            "Root collar positioning & initial deep watering",
            "Protective staking and tree-guard setup"
        ],
        process: [
            { step: "01", title: "Land Clearing", desc: "Obstacle removal, pit marking, and hole excavation." },
            { step: "02", title: "Soil Enrichment", desc: "Mixing native soil with cured manure and hydro-gel." },
            { step: "03", title: "Precision Planting", desc: "Root alignment, backfilling, tamping, and initial soaking." }
        ],
        metrics: [
            { label: "Pits Dug Per Day", value: "2,500+", hint: "Deployment capacity with full crews" },
            { label: "Labor Efficiency", value: "100%", hint: "Supervised by certified agronomists" },
            { label: "Root Shock Reduced", value: "85%", hint: "Via proper moisture retention techniques" }
        ],
        graphType: "timeline"
    },
    {
        id: "landscape-design",
        title: "Landscape Architecture & Shade Planning",
        subtitle: "Transforming acreage into functional, aesthetic, and sustainable green ecosystems.",
        icon: Trees,
        heroImage: "/About.jpeg",
        summary: "Master planning for aesthetic estates, windbreaks, privacy hedges, and residential lawns.",
        description: "Trees define landscapes for decades. Our design team blends functional goals—like wind attenuation, solar shade, and privacy—with visual harmony. We create master landscape layouts combining flowering ornamentals with majestic canopy trees to increase property valuation and ecological health.",
        deliverables: [
            "2D/3D master landscape layout blueprints",
            "Canopy progression & shade projection maps",
            "Ornamental and indigenous hedge design",
            "Seasonal flowering schedule integration"
        ],
        process: [
            { step: "01", title: "Vision Mapping", desc: "Defining aesthetic goals, privacy needs, and walkways." },
            { step: "02", title: "3D Layout Design", desc: "Visualizing mature tree canopies and shade shadows." },
            { step: "03", title: "Execution Plan", desc: "Phased planting sequence for short and long term growth." }
        ],
        metrics: [
            { label: "Estates Designed", value: "150+", hint: "Private gardens & commercial grounds" },
            { label: "Property Value Gain", value: "~15%", hint: "Average boost post-landscaping" },
            { label: "Shade Coverage", value: "Optimal", hint: "Calculated for high-sun exposure regions" }
        ],
        graphType: "growth"
    },
    {
        id: "reforestation",
        title: "Commercial Reforestation & Agroforestry",
        subtitle: "Scalable timber, fruit, and conservation forestry projects built for longevity.",
        icon: Building2,
        heroImage: "/woodland-silhouette.jpg",
        summary: "Large-scale ecological restoration and economic forestry for institutions and farms.",
        description: "We work with landholders, corporate bodies, and environmental initiatives to establish multi-acre forests. From sustainable timber species to agroforestry models that combine fruit trees with cash crops, we deliver scalable ecological solutions designed for environmental impact and economic yield.",
        deliverables: [
            "High-density grid design for forestry",
            "Agroforestry intercropping blueprints",
            "Carbon offset and canopy density reporting",
            "Long-term plantation management guidelines"
        ],
        process: [
            { step: "01", title: "Grid Planning", desc: "Optimizing density per hectare for target yields." },
            { step: "02", title: "Mass Deployment", desc: "Synchronized crew planting during optimal rainy windows." },
            { step: "03", title: "Monitored Growth", desc: "Periodic health audits and pruning schedules." }
        ],
        metrics: [
            { label: "Acres Restored", value: "450+", hint: "Dedicated forest & agroforestry projects" },
            { label: "Trees Planted", value: "500K+", hint: "Cumulative impact across key regions" },
            { label: "Carbon Absorption", value: "High", hint: "Long-term sequestering native trees" }
        ],
        graphType: "timeline"
    }
]

// Visual Component for Graph Displays
function ServiceVisualGraph({ type, title }: { type: "growth" | "composition" | "timeline"; title: string }) {
    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col justify-between h-full min-h-[280px]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    {type === "growth" && <TrendingUp size={20} className="text-green-400" />}
                    {type === "composition" && <PieChart size={20} className="text-emerald-400" />}
                    {type === "timeline" && <BarChart3 size={20} className="text-teal-400" />}
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Service Metrics Visualizer</span>
                </div>
                <span className="text-[11px] bg-green-500/20 text-green-400 font-mono px-2 py-0.5 rounded-full border border-green-500/30">
                    Live Projection
                </span>
            </div>

            {type === "growth" && (
                <div className="space-y-4">
                    <div className="flex justify-between items-end text-xs text-slate-300">
                        <span>Root Establishment (Yr 1)</span>
                        <span className="font-mono text-green-400">92% Root Density</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            className="bg-green-500 h-2.5 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "92%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="flex justify-between items-end text-xs text-slate-300">
                        <span>Canopy Expansion (Yr 3)</span>
                        <span className="font-mono text-emerald-400">78% Full Canopy</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            className="bg-emerald-400 h-2.5 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "78%" }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="flex justify-between items-end text-xs text-slate-300">
                        <span>Survival Rate Benchmark</span>
                        <span className="font-mono text-teal-300">96.4% Industry Lead</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            className="bg-teal-400 h-2.5 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "96.4%" }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </div>
                </div>
            )}

            {type === "composition" && (
                <div className="grid grid-cols-2 gap-4 items-center my-auto">
                    <div className="relative flex items-center justify-center">
                        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-800"
                                strokeWidth="4"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <motion.path
                                className="text-green-500"
                                strokeWidth="4"
                                strokeDasharray="65, 100"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                initial={{ strokeDasharray: "0, 100" }}
                                whileInView={{ strokeDasharray: "65, 100" }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                            />
                            <motion.path
                                className="text-emerald-300"
                                strokeWidth="4"
                                strokeDasharray="25, 100"
                                strokeDashoffset="-65"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                initial={{ strokeDasharray: "0, 100" }}
                                whileInView={{ strokeDasharray: "25, 100" }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-xl font-bold font-mono text-white">99%</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            <span className="text-slate-300">Organic Composition</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-300 rounded-sm"></div>
                            <span className="text-slate-300">Moisture Index</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-slate-700 rounded-sm"></div>
                            <span className="text-slate-300">Inorganic Mineral</span>
                        </div>
                    </div>
                </div>
            )}

            {type === "timeline" && (
                <div className="flex items-end justify-between h-36 pt-4 gap-2 border-b border-slate-800 pb-2">
                    {[
                        { label: "Prep", h: "35%", val: "Wk 1" },
                        { label: "Digging", h: "60%", val: "Wk 2" },
                        { label: "Planting", h: "90%", val: "Wk 3" },
                        { label: "Rooting", h: "75%", val: "Wk 4" },
                        { label: "Audit", h: "100%", val: "Wk 6" },
                    ].map((bar, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                            <motion.div
                                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm group-hover:brightness-125 transition-all"
                                initial={{ height: "0%" }}
                                whileInView={{ height: bar.h }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            />
                            <span className="text-[10px] text-slate-400 mt-2 font-mono">{bar.val}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400">
                <span>Focus: {title}</span>
                <span className="text-green-400 flex items-center">
                    Verified standard <ShieldCheck size={14} className="ml-1" />
                </span>
            </div>
        </div>
    )
}

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState<string>(detailedServices[0].id)

    const currentService = detailedServices.find((s) => s.id === activeTab) || detailedServices[0]

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <header>
                <Navbar />
            </header>

            {/* Hero Header */}
            <section className="relative bg-slate-900 text-white py-28 px-6 overflow-hidden">
                <Image
                    src="/woodland-silhouette.jpg"
                    alt="Bulbul Farm Services Header"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-gray-50"></div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                        <TreePine size={16} />
                        <span>Professional Forestry & Tree Planting Solutions</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
                    >
                        Our Complete <span className="text-green-400">Services</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        From scientific soil analysis and nursery propagation to large-scale site deployment, we deliver
                        end-to-end tree solutions engineered for long-term survival and ecological growth.
                    </motion.p>
                </div>
            </section>

            {/* Interactive Service Selector Tabs */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 w-full mb-16">
                <div className="bg-white rounded-2xl shadow-xl p-3 border border-gray-200/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {detailedServices.map((service) => {
                        const IconComponent = service.icon
                        const isActive = activeTab === service.id
                        return (
                            <button
                                key={service.id}
                                onClick={() => setActiveTab(service.id)}
                                className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-green-600 text-white shadow-lg scale-[1.02]"
                                    : "bg-white text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                    }`}
                            >
                                <IconComponent size={26} className={`mb-2 ${isActive ? "text-white" : "text-green-600"}`} />
                                <span className="text-xs font-bold leading-tight line-clamp-2">{service.title}</span>
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* Active Service Deep Dive Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentService.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="grid lg:grid-cols-12 gap-12 items-start"
                    >
                        {/* Left Column: Detailed Service Info */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className="p-3 bg-green-100 text-green-700 rounded-xl">
                                        <currentService.icon size={28} />
                                    </span>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-green-600">Service Spotlight</span>
                                        <h2 className="text-3xl font-extrabold text-gray-900">{currentService.title}</h2>
                                    </div>
                                </div>
                                <p className="text-xl text-gray-600 font-medium leading-snug">{currentService.subtitle}</p>
                            </div>

                            <div className="prose prose-green max-w-none text-gray-600 text-base leading-relaxed">
                                <p>{currentService.description}</p>
                            </div>

                            {/* Deliverables Checklist */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <CheckCircle2 size={20} className="text-green-600 mr-2" /> What We Deliver
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {currentService.deliverables.map((item, idx) => (
                                        <div key={idx} className="flex items-start text-sm text-gray-700">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Execution Process Steps */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Execution Process</h3>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {currentService.process.map((p, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
                                            <span className="text-2xl font-mono font-black text-green-200 block mb-1">{p.step}</span>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Graphs, Metrics & Call to Action */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Animated SVG Graph Display */}
                            <ServiceVisualGraph type={currentService.graphType} title={currentService.title} />

                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                                {currentService.metrics.map((m, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-gray-500">{m.label}</div>
                                            <div className="text-2xl font-black text-green-700 font-mono mt-0.5">{m.value}</div>
                                            <div className="text-[11px] text-gray-400 mt-1">{m.hint}</div>
                                        </div>
                                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-bold">
                                            ✓
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Action Box */}
                            <div className="bg-gradient-to-br from-green-700 to-green-800 text-white p-6 rounded-2xl shadow-xl space-y-4">
                                <h3 className="text-xl font-bold">Request a Service Quote</h3>
                                <p className="text-green-100 text-sm">
                                    Need custom volume seedling supply or an on-site evaluation in Limuru or anywhere across Kenya?
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center justify-center w-full bg-white text-green-800 hover:bg-green-50 font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:scale-[1.02]"
                                >
                                    Book Consultation <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* Grid Overview of All Services */}
            <section className="bg-white py-20 px-6 border-t border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Capabilities at a Glance</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide tailored biological and operational support across the full tree growth lifecycle.
                        </p>
                        <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {detailedServices.map((svc) => {
                            const Icon = svc.icon
                            return (
                                <motion.div
                                    key={svc.id}
                                    variants={fadeIn}
                                    whileHover={{ y: -6 }}
                                    onClick={() => {
                                        setActiveTab(svc.id)
                                        window.scrollTo({ top: 400, behavior: "smooth" })
                                    }}
                                    className="bg-gray-50 hover:bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                            {svc.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{svc.summary}</p>
                                    </div>

                                    <div className="flex items-center text-green-600 font-bold text-sm pt-4 border-t border-gray-200/60">
                                        <span>Explore Specifications</span>
                                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Assurance Banner */}
            <section className="py-16 px-6 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <CalendarCheck className="mx-auto text-green-400 mb-3" size={36} />
                        <h4 className="font-bold text-lg">Seasonal Readiness</h4>
                        <p className="text-slate-400 text-sm">Timely seedling delivery matched precisely to local rainy seasons.</p>
                    </div>
                    <div className="space-y-2">
                        <ShieldCheck className="mx-auto text-green-400 mb-3" size={36} />
                        <h4 className="font-bold text-lg">Species Guarantee</h4>
                        <p className="text-slate-400 text-sm">Healthy, climate-hardened stock grown with high root integrity.</p>
                    </div>
                    <div className="space-y-2">
                        <TrendingUp className="mx-auto text-green-400 mb-3" size={36} />
                        <h4 className="font-bold text-lg">Agronomist Oversight</h4>
                        <p className="text-slate-400 text-sm">Expert site assessments and soil management strategies.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}