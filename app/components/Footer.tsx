import { FaInstagram, FaTwitter, FaTiktok, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { Mail, Phone, MapPin, Heart } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image src="/No bg.png" alt="Bulbul Farm Logo" width={50} height={50} className="max-w-full h-auto" />
                <span className="text-2xl font-bold">Bulbul Farm</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Cultivating the finest selection of Indigenous tree seedlings for a greener, more sustainable future.
                Growing life, one tree at a time.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={18} className="text-green-400" />
                  <span>info@bulbulfarm.co.ke</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone size={18} className="text-green-400" />
                  <span>+254 729 931 982</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={18} className="text-green-400" />
                  <span>Limuru, Kenya</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "About Us", "Services", "Products"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                {["Landscaping", "Tree Consultation", "Garden Design", "Maintenance"].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* Social Media */}
              <div className="flex items-center space-x-6">
                <span className="text-gray-300 font-medium">Follow Us:</span>
                {[
                  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
                  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: FaWhatsapp, href: "https://whatsapp.com", label: "WhatsApp" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110 p-2 hover:bg-green-400/10 rounded-full"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="flex items-center space-x-4">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm flex items-center">
                © 2024 Bulbul Farm. Made with <Heart className="mx-1 text-red-500" size={16} /> by Eng.Mbugua
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-green-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


