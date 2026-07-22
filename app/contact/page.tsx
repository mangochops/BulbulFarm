"use client"

import React, { useState } from "react"
import Image from "next/image"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { motion } from "framer-motion"
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    TreePine,
    MessageSquare,
    Truck
} from "lucide-react"

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
}

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceInterest: "Seedling Orders",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API form submission
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
        }, 1200)
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
            <header>
                <Navbar />
            </header>

            {/* Hero Header */}
            <section className="relative bg-slate-900 text-white py-28 px-6 overflow-hidden">
                <Image
                    src="/woodland-silhouette.jpg"
                    alt="Bulbul Farm Limuru"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-gray-50"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                        <TreePine size={16} />
                        <span>We are Available 24/7 for Enquiries</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
                    >
                        Let us Start Your <span className="text-green-400">Green Journey</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Have questions about seedling varieties, site planting visits, or nationwide delivery?
                        Our agronomy team is ready to assist you.
                    </motion.p>
                </div>
            </section>

            {/* Contact Cards Grid */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 w-full mb-16">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between hover:border-green-300 transition-colors">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Phone & WhatsApp</h3>
                            <p className="text-sm text-gray-500">Call or message us directly for quick stock availability updates.</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <a href="tel:+254726931982" className="text-green-700 font-bold hover:underline text-lg block">
                                +254 726 931 982
                            </a>
                            <span className="text-xs text-gray-400">Mon - Sat (7:00 AM - 6:00 PM)</span>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between hover:border-green-300 transition-colors">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Email Address</h3>
                            <p className="text-sm text-gray-500">Send us custom institutional bulk orders or RFP documents.</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <a href="mailto:info@bulbulfarm.co.ke" className="text-green-700 font-bold hover:underline text-base block">
                                info@bulbulfarm.co.ke
                            </a>
                            <span className="text-xs text-gray-400">Response within 24 hours</span>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between hover:border-green-300 transition-colors">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Nursery Location</h3>
                            <p className="text-sm text-gray-500">Visit our nursery in person to view matured trees and select seedlings.</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <span className="text-gray-900 font-bold text-base block">Limuru, Kenya</span>
                            <span className="text-xs text-gray-400">Secured transportation across Kenya</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Contact Form & Info Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24 w-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="grid lg:grid-cols-12">

                        {/* Left Visual & Info Panel */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-green-700 via-green-800 to-slate-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10 space-y-8">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-green-300">Direct Connect</span>
                                    <h2 className="text-3xl font-extrabold mt-2">Get in Touch With Our Nursery Team</h2>
                                </div>

                                <p className="text-green-100 text-base leading-relaxed font-light">
                                    Whether you need indigenous tree seedlings, site preparation consultation, or a bulk supply quote, fill out the form and our agronomist will reach out.
                                </p>

                                <div className="space-y-6 pt-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-white/10 rounded-xl text-green-300 mt-1">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Countrywide Delivery</h4>
                                            <p className="text-xs text-green-200">Safely transported in reinforced timber crates to retain soil balls.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-white/10 rounded-xl text-green-300 mt-1">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Free Planting Advice</h4>
                                            <p className="text-xs text-green-200">Custom care guides provided for every seedling species purchased.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-white/10 rounded-xl text-green-300 mt-1">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Operating Hours</h4>
                                            <p className="text-xs text-green-200">Monday – Saturday: 7:30 AM – 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle Decorative Background Bubbles */}
                            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 rounded-full blur-xl"></div>
                        </div>

                        {/* Right Interactive Form Panel */}
                        <div className="lg:col-span-7 p-8 md:p-14 bg-white">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-gray-900">Message Received!</h3>
                                    <p className="text-gray-600 max-w-md leading-relaxed">
                                        Thank you for reaching out to Bulbul Farm. Our representative will contact you shortly via email or phone.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false)
                                            setFormData({
                                                firstName: "",
                                                lastName: "",
                                                email: "",
                                                phone: "",
                                                serviceInterest: "Seedling Orders",
                                                message: ""
                                            })
                                        }}
                                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Send Us a Message</h3>
                                        <p className="text-sm text-gray-500 mb-6">Fill in your details and project details below.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+254 700 000 000"
                                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Topic / Area of Interest</label>
                                        <select
                                            name="serviceInterest"
                                            value={formData.serviceInterest}
                                            onChange={handleChange}
                                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm"
                                        >
                                            <option value="Seedling Orders">Seedling Nursery Purchase</option>
                                            <option value="Site Assessment">Site Assessment & Soil Consultation</option>
                                            <option value="Turnkey Planting">Turnkey Tree Planting Services</option>
                                            <option value="Landscape Design">Landscape Architecture & Shade Planning</option>
                                            <option value="Reforestation">Commercial Reforestation & Agroforestry</option>
                                            <option value="General Inquiry">General Question</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project, land size, target tree species, or delivery location..."
                                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] flex items-center justify-center space-x-2"
                                    >
                                        {loading ? (
                                            <span className="animate-pulse">Sending Message...</span>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Embed Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24 w-full">
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="mb-4 p-2 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Visit Our Nursery in Limuru</h3>
                            <p className="text-xs text-gray-500">Easily accessible for site tours and pickup</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full flex items-center">
                            <MapPin size={12} className="mr-1" /> Limuru, Kenya
                        </span>
                    </div>

                    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <iframe
                            title="Bulbul Farm Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.327854611!2d36.60252155!3d-1.1118128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f254b032d8edb%3A0xc3b83ebcfb93931!2sLimuru!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}