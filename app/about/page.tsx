"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { motion } from "framer-motion"
import {
    MapPin,
    ArrowRight,
    CheckCircle2,
    TreePine,
    Target,
    Eye
} from "lucide-react"
import { values } from "../constants"
import { milestones } from "../constants"

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


export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <header>
                <Navbar />
            </header>

            {/* Hero Header */}
            <section className="relative bg-slate-900 text-white py-28 px-6 overflow-hidden">
                <Image
                    src="/woodland-silhouette.jpg"
                    alt="Bulbul Farm Landscape"
                    fill
                    className="object-cover opacity-25"
                    priority
                />
                <div className="absolute inset-0 "></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                        <TreePine size={16} />
                        <span>Rooted in Limuru • Serving All of Kenya</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
                    >
                        Cultivating More Trees, <br />
                        <span className="text-green-400">Nurturing More Life</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        At Bulbul Farm, we are dedicated to propagating resilient tree seedlings that transform
                        landscapes, enhance ecosystems, and empower communities across Kenya.
                    </motion.p>
                </div>
            </section>

            {/* Main Story & Vision Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image composition */}
                    <motion.div
                        className="relative"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/About.jpeg"
                                alt="Inside Bulbul Farm Nursery"
                                width={700}
                                height={500}
                                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-8 -right-6 md:right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs flex items-center space-x-4">
                            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 text-base">Limuru, Kenya</div>
                                <div className="text-xs text-gray-500">Ideal high-altitude nursery climate</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text content */}
                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        variants={staggerContainer}
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeIn}>
                            <span className="text-xs font-bold uppercase tracking-widest text-green-600">Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                                Growing Sustainability From the Ground Up
                            </h2>
                        </motion.div>

                        <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed text-base">
                            Founded in 2023, Bulbul Farm started with a simple belief: healthy ecosystems start with healthy roots.
                            Nestled in the fertile highlands of Limuru, our nursery enjoys ideal climatic conditions for raising robust,
                            disease-resistant seedlings suitable for diverse terrains across Kenya.
                        </motion.p>

                        <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed text-base">
                            We specialize in indigenous hardwoods, fast-growing shade trees, fruit varieties, and ornamental species.
                            More than just a nursery, we work alongside our clients to provide full soil assessments, custom site layouts,
                            and professional turnkey planting services.
                        </motion.p>

                        <motion.div variants={fadeIn} className="pt-4 grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                <span className="text-sm font-semibold text-gray-800">100% Acclimatized Seedlings</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                <span className="text-sm font-semibold text-gray-800">Nationwide Secure Logistics</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                <span className="text-sm font-semibold text-gray-800">Certified Agronomist Guidance</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                <span className="text-sm font-semibold text-gray-800">Bulk NGO & Commercial Supply</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="bg-gradient-to-br from-green-900 to-slate-900 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <div className="p-3 bg-green-500/20 text-green-400 rounded-2xl w-fit mb-6">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-300 leading-relaxed">
                            To supply premium-grade, climate-adapted tree seedlings and expert forestry consultation that empower
                            individuals, institutions, and communities to restore forests, improve agricultural yields, and create lasting green spaces.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-6">
                            <Eye size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-gray-300 leading-relaxed">
                            To be East Africa’s leading provider of ecologically sustainable tree solutions, recognized for high seedling
                            survival rates, scientific soil consultation, and driving meaningful reforestation impact.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-6 max-w-7xl mx-auto w-full">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeIn}
                    viewport={{ once: true }}
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-green-600">Guided By Principles</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Our Core Values</h2>
                    <div className="w-20 h-1 bg-green-600 mx-auto"></div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {values.map((v, i) => {
                        const Icon = v.icon
                        return (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                whileHover={{ y: -6 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all"
                            >
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                    <Icon size={26} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </section>

            {/* Journey & Milestones */}
            <section className="bg-white py-24 px-6 border-t border-gray-200">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-green-600">Our Growth Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Bulbul Farm Timeline</h2>
                        <div className="w-20 h-1 bg-green-600 mx-auto"></div>
                    </motion.div>

                    <div className="relative border-l-2 border-green-200 ml-4 md:ml-32 space-y-12">
                        {milestones.map((m, idx) => (
                            <motion.div
                                key={idx}
                                className="relative pl-8 md:pl-12"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-100" />

                                {/* Year tag for desktop */}
                                <span className="hidden md:block absolute -left-32 top-1 w-24 text-right font-mono font-black text-2xl text-green-600">
                                    {m.year}
                                </span>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <span className="md:hidden inline-block font-mono font-bold text-green-600 text-sm mb-1">{m.year}</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Banner */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-5xl font-extrabold">Ready to Start Your Planting Project?</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
                        Whether you need a handful of ornamental trees or thousands of indigenous seedlings for reforestation,
                        our team in Limuru is ready to assist.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:scale-105"
                        >
                            Explore Services <ArrowRight size={18} className="ml-2" />
                        </Link>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition-all"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}