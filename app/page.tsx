"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { customers, productItems } from "./constants";
import { servicesItems } from "./constants";
import { AiOutlineArrowDown } from "react-icons/ai";
import CustomerCarousel from "./components/Socialproof";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const scroll = (direction: number) => {
  const container = document.getElementById("product-container");
  
  // Check if container exists before attempting to scroll
  if (container) {
    const scrollAmount = container.clientWidth; // Calculate scroll distance based on container width

    container.scrollBy({
      left: direction * scrollAmount,  // Scroll horizontally
      behavior: "smooth",  // Smooth scrolling
    });
  }
};



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <motion.section
        className="relative w-full text-center py-10 min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <Image
          src="/woodland-silhouette.jpg"
          alt="Hero image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

        {/* Content Section */}
        <motion.div className="relative z-10 text-white max-w-xl px-4" variants={fadeIn}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">More Trees, More Life</h1>
          <h3 className="mb-6 text-base md:text-lg">
            At Bulbul Farm, we cultivate the finest selection of Indigenous tree seedlings for landscaping, reforestation, and home gardens. Let us build a sustainable future, one tree at a time.
          </h3>

          {/* Button */}
          <button className="mx-auto  md:inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-400 transition duration-200">
            Learn More
          </button>

          {/* Scroll Down Arrow */}
          <div className="block  mt-6">
            <AiOutlineArrowDown className="mx-auto text-4xl text-green-600 animate-bounce" />
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-16 px-4 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
        <motion.div className="flex flex-col lg:flex-row lg:space-x-10 max-w-7xl mx-auto">
          {/* Video Section */}
          <motion.div className="lg:w-1/2 w-full flex justify-center items-center mb-8 lg:mb-0" variants={fadeIn}>
            <Image src="/About.jpeg" alt="Video" width={500} height={500} className="w-full max-w-lg rounded-lg shadow-lg" />

          </motion.div>

          {/* Text Section */}
          <motion.div className="lg:w-1/2 w-full flex justify-center items-center" variants={fadeIn}>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Bulbul Farm, we are passionate about growing a greener future. Since 2023, we have provided top-quality tree seedlings for landscaping, farming, and reforestation projects. Our nursery offers a wide range of native, exotic, fruit, and ornamental trees, all grown with expert care and sustainability in mind.
              <br /><br />
              We prioritize healthy, resilient plants and are committed to helping our customers and communities create greener, more sustainable environments. Together, let us plant the seeds for a better tomorrow.
            </p>          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-10 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
        <div className="w-full py-10 bg-gray-50">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesItems.map((service, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg"
                variants={fadeIn}
              >
                <div className="text-green-600 mb-4">
                  <service.icon size={48} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-center text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        className="py-10 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>

        {/* Carousel container */}
        <motion.div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-6 scrollbar-hide">
          <div className="relative w-full">
            {/* Previous Arrow */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-400 transition duration-200 z-10"
              onClick={() => scroll(-1)}
            >
              &#8249; {/* Left arrow symbol */}
            </button>

            {/* Product Cards */}
            <div id="product-container" className="flex flex-nowrap overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory scrollbar-hide">
              {productItems.map((product, index) => (
                <motion.div
                  key={index}
                  className="card card-compact bg-white w-80 min-w-[80%] md:min-w-[40%] lg:min-w-[30%] shadow-xl snap-center rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  variants={fadeIn}
                >
                  <figure className="bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.commonName}
                      height={300}
                      width={400}
                      className="object-cover w-full h-48"
                    />
                  </figure>
                  <div className="card-body p-6">
                    <h2 className="card-title text-xl font-bold text-gray-900">{product.commonName}</h2>
                    <h3 className="card-title text-lg italic text-gray-600">{product.binomialName}</h3>
                    <h3 className="card-title text-lg text-gray-700">{product.size}</h3>
                    <p className="text-base text-gray-500 mt-2">
                      {product.description || "No description available"}
                    </p>
                    <div className="card-actions mt-4 flex justify-between items-center">
                      <h3 className="card-title text-lg font-semibold text-gray-900">
                        {product.price}
                      </h3>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-400 transition duration-200">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-400 transition duration-200 z-10"
              onClick={() => scroll(1)}
            >
              &#8250; {/* Right arrow symbol */}
            </button>
          </div>



        </motion.div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        className="py-10 px-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Happy Customers</h2>
        <CustomerCarousel customers={customers} />
      </motion.section>

      {/* Contact Section */}
      <section className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Contact</h2>
        <div className="w-full py-10 flex justify-center items-center bg-gray-100">
          <div className="bg-white w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">

            {/* Left Section with Background Image */}
            <div
              className="w-1/3 bg-cover bg-center p-8"
              style={{ backgroundImage: "url('/Orangutan.jpeg')" }}
            >
              <div className="text-white">
                <h4 className="text-2xl font-bold mb-4">GET IN TOUCH</h4>
                <p className="text-sm mb-8">
                  We will answer your questions and problems 24/7
                </p>
              </div>
            </div>

            {/* Right Section with Contact Form */}
            <div className="w-2/3 p-8">
              <form>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-1/2 p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="How can we help you?"
                    className="w-full p-3 border border-gray-300 rounded h-32"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-400 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
