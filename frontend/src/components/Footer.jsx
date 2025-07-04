import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-14 pb-10 px-6 md:px-16 lg:px-12 lg:pb-5 lg:pt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">JobFinder</h2>
          <p className="text-gray-400 leading-relaxed">
            Your one-stop platform to find your dream job or hire top talent
            effortlessly.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            &copy; {year} JobFinder. All rights reserved.
          </p>
        </div>

        {/*  Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-[#F97316] uppercase mb-6 relative">
            <span className="before:absolute before:-left-4 before:top-0 before:w-1 before:h-full before:bg-[#F97316] before:rounded"></span>
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              { label: "Browse Jobs", href: "/jobs" },
              { label: "Companies", href: "/companies" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300"
              >
                <HiOutlineArrowRight className="mr-2 text-orange-400 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative group-hover:underline group-hover:decoration-orange-400">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
          <p className="mb-2 text-gray-400">
            36, Bhawna Plaze, Near Hotel Clerk, Sikandra, Agra-282006
          </p>
          <p className="mb-2 text-gray-400">
            Email:{" "}
            <a
              href="mailto:kishansisodiya.work@gmail.com"
              className="text-orange-400 hover:underline"
            >
              kishansisodiya.work@gmail.com
            </a>
          </p>
          <p className="mb-6 text-gray-400">
            Phone:{" "}
            <a
              href="tel:+919410272845"
              className="text-orange-400 hover:underline"
            >
              +91 94102 72845
            </a>
          </p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-5 text-sm text-center text-gray-500">
        Designed with ❤️ by Kishan Sisodiya
      </div>
    </footer>
  );
};

export default Footer;
