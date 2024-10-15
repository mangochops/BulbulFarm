import { FaInstagram, FaTwitter, FaTiktok, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-white-900 text-white">
      <div className="container relative z-10 mx-auto flex flex-col items-center">
        {/* Logo Section */}
        <Image
          src="/No bg.png" // Update with your logo path
          alt="logo"
          width={50}
          height={50}
          className="mb-6"
        />

        {/* Navigation Links and Social Media */}
        <div className="w-full max-w-4xl flex flex-row md:flex-row justify-center items-center mx-auto mb-6">
          {/* Navigation Links */}
          <ul className="flex space-x-6 mb-6 md:mb-0">
            <li className="hover:text-green-400 cursor-pointer">Home</li>
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Services</li>
            <li className="hover:text-green-400 cursor-pointer">Products</li>
            <li className="hover:text-green-400 cursor-pointer">Customers</li>
            <li className="hover:text-green-400 cursor-pointer">Contact</li>
          </ul>
        </div >
        <div className="w-full max-w-4xl flex flex-row mx-auto justify-center items-center mb-6">

          {/* Social Media Links */}
          <ul className="flex space-x-6 items-center justify-center">
            <li>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-green-400">
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-green-400">
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-green-400">
                <FaTiktok size={24} />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-green-400">
                <FaLinkedin size={24} />
              </a>
            </li>
            <li>
              <a href="https://whatsapp.com" aria-label="WhatsApp" className="hover:text-green-400">
                <FaWhatsapp size={24} />
              </a>
            </li>
          </ul>
        </div>

        {/* Footer Copyright */}
        <p className="text-sm text-center mx-auto mb-4">Copyright © 2024 Willicent Mbugua</p>
      </div>

      {/* Background Image at the end */}
      <div className="w-full">
        <Image
          src="/footer.jpeg" // Update with your footer background image
          alt="Footer Image"
          width={1920}
          height={200}
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>
    </footer>
  );
};

export default Footer;

