"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Customer {
  name: string
  avatar: string
  feedback: string
}

interface CustomerCarouselProps {
  customers: Customer[]
}

const CustomerCarousel: React.FC<CustomerCarouselProps> = ({ customers }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? customers.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === customers.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-4 relative overflow-hidden">
        {/* Quote Icon */}
        <Quote className="absolute top-6 right-6 text-green-100" size={48} />

        <div className="text-center relative z-10">
          {/* Customer Avatar */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-green-100 shadow-lg">
              <Image
                src={customers[currentIndex].avatar || "/placeholder.svg"}
                alt={customers[currentIndex].name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current" size={20} />
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-xl md:text-2xl text-gray-700 font-light italic mb-6 leading-relaxed">
            "{customers[currentIndex].feedback}"
          </blockquote>

          {/* Customer Name */}
          <div className="text-lg font-semibold text-gray-900">{customers[currentIndex].name}</div>
          <div className="text-green-600 font-medium">Verified Customer</div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {customers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-green-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CustomerCarousel
