"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Navbar from "./components/Navbar"
import { customers, productItems } from "./constants"
import { servicesItems } from "./constants"
import { ArrowDown, Star, ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react"
import CustomerCarousel from "./components/Socialproof"
import Footer from "./components/Footer"
import { motion } from "framer-motion"
import Link from "next/link"


interface Article {
  id: number
  title: string
  description: string
  featured_image: string | null
  slug: string
  created_at: string
  updated_at: string
}

interface Product {
  id?: number
  commonName: string
  binomialName: string
  description: string
  price: string
  size: string
  image: string
  matureImage?: string // Image of the grown tree on hover
}

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const scroll = (direction: number) => {
  const container = document.getElementById("product-container")

  if (container) {
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    })
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
const [articles, setArticles] = useState<Article[]>([])
const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles")
        if (res.ok) {
          const data: Article[] = await res.json()
          // Take the latest 3 articles for the landing page snippet
          setArticles(data.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      }
    }
    
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setProducts(data)
            return
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
      // Fallback to static constants if API isn't live yet
      setProducts(productItems)
    }

    fetchArticles()
    fetchProducts()
  }, [])

  
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <motion.section
        className="relative w-full text-center py-20 min-h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1.2 }}
      >
        {/* Background Image */}
        <Image src="/woodland-silhouette.jpg" alt="Hero image" fill className="object-cover" priority />

        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>

        {/* Content Section */}
        <motion.div className="relative z-10 text-white max-w-4xl px-6" variants={fadeIn} transition={{ delay: 0.3 }}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={slideIn}
            transition={{ delay: 0.5 }}
          >
            More Trees, <span className="text-green-400">More Life</span>
          </motion.h1>
          <motion.p
            className="mb-8 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn}
            transition={{ delay: 0.7 }}
          >
            At Bulbul Farm, we cultivate the finest selection of Indigenous tree seedlings for landscaping,
            reforestation, and home gardens.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeIn}
            transition={{ delay: 0.9 }}
          >
            <button className="group bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Explore Our Trees
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </motion.div>

          <motion.div className="mt-12" variants={fadeIn} transition={{ delay: 1.1 }}>
            <ArrowDown className="mx-auto text-green-400 animate-bounce" size={32} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-24 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Bulbul Farm</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div className="relative" variants={slideIn}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/About.jpeg"
                  alt="About Bulbul Farm"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full -z-10"></div>
            </motion.div>

            <motion.div className="space-y-6" variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Growing a Greener Future Since 2023</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                At Bulbul Farm, we are passionate about growing a greener future. We provide top-quality tree seedlings
                for landscaping, farming, and reforestation projects.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our nursery offers a wide range of native, exotic, fruit, and ornamental trees, all grown with expert
                care and sustainability in mind. We prioritize healthy, resilient plants and are committed to helping
                our customers create greener, more sustainable environments.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Trees Planted</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-24 px-6 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tree services to meet all your landscaping and environmental needs
            </p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesItems.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  Learn More →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        className="py-24 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Premium Trees</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of indigenous and exotic tree varieties
            </p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
          </motion.div>

          <div className="relative">
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              id="product-container"
              className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory px-12"
            >
              {products.map((product, index) => (
               <motion.div
                  key={product.id || index}
                  className="group bg-white min-w-[320px] md:min-w-[350px] shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 snap-center border border-gray-100"
                  variants={fadeIn}
                >
                  <div className="relative overflow-hidden h-64 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.commonName}
                      height={250}
                      width={350}
                      className="object-cover w-full h-full group-hover:opacity-0 transition-opacity duration-500"
                    />

                    <Image
                        src={product.matureImage || product.image || "/placeholder.svg"}
                        alt={`${product.commonName} - Mature Tree`}
                        fill
                        className="object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                      />

                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.size}
                    </div>
                   {product.matureImage && (
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded opacity-100 group-hover:opacity-0 transition-opacity z-10">
                          Hover to view mature tree 🌳
                        </div>
                      )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.commonName}</h3>
                    <p className="text-green-600 italic mb-3">{product.binomialName}</p>
                    <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={() => scroll(1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </motion.section>


     {/* Articles / Blog Snippet Section */}
      {articles.length > 0 && (
        <motion.section
          className="py-24 px-6 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Insights & Articles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover expert advice, planting guides, and news on tree farming and conservation.
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
                  variants={fadeIn}
                  whileHover={{ y: -6 }}
                >
                  <div>
                    {article.featured_image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={article.featured_image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                        Bulbul Farm
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2">
                        <Calendar size={14} className="text-green-600" />
                        <span>
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors text-sm"
                    >
                      Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Articles Button */}
            <motion.div className="text-center" variants={fadeIn}>
              <Link
                href="/articles"
                className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform 
hover:scale-105"
              >
                View All Articles
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}


      {/* Testimonials Section */}
      <motion.section
        className="py-24 px-6 bg-gradient-to-br from-green-50 to-blue-50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>
            <p className="text-xl text-gray-600">Trusted by gardeners and landscapers across the region</p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <CustomerCarousel customers={customers} />
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-24 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to start your green journey? We`&apos;`re here to help!</p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            variants={fadeIn}
          >
            <div className="grid lg:grid-cols-2">
              {/* Contact Info */}
              <div className="relative p-12 bg-gradient-to-br from-green-600 to-green-700 text-white">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Let us Connect</h3>
                  <p className="text-green-100 mb-8 text-lg">
                    We are available 24/7 to answer your questions and help you choose the perfect trees for your
                    project.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">📧</div>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-green-100">info@bulbulfarm.co.ke</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">📱</div>
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-green-100">+254 726 931 982</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">📍</div>
                      <div>
                        <div className="font-semibold">Location</div>
                        <div className="text-green-100">Limuru, Kenya</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Contact Form */}
              <div className="p-12">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />

                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}

