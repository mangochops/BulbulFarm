"use client"
// components/CustomerCarousel.tsx
import { useState } from 'react';
import Image from 'next/image';

interface Customer {
  name: string;
  avatar: string;
  feedback: string;
}

interface CustomerCarouselProps {
  customers: Customer[];
}

const CustomerCarousel: React.FC<CustomerCarouselProps> = ({ customers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? customers.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === customers.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-4">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
        >
          Prev
        </button>

        {/* Carousel Slide */}
        <div className="w-full text-center">
          <div key={currentIndex} className="p-4">
            <Image
              src={customers[currentIndex].avatar}
              alt="customer avatar"
              width={50}
              height={50}
              className="rounded-full mx-auto"
            />
            <h3 className="font-bold mt-2">{customers[currentIndex].name}</h3>
            <p className="text-gray-600 mt-1 italic">
              &quot;{customers[currentIndex].feedback}&quot;
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerCarousel;
