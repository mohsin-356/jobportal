import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <>
      <hr />
      <footer className="bg-white text-black pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-bold">
              Carbon <span className="text-red-500">Jobs</span>
            </h2>
            <p className="text-sm mt-2 text-gray-700">
              Helping developers find better jobs and companies hire better talent.
            </p>
            <p className="text-xs text-gray-900 mt-4">
              © 2024 Carbon Jobs. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-red-500 transition">Jobs</a></li>
              <li><a href="/browse" className="hover:text-red-500 transition">Browse</a></li>
              <li><a href="/contact" className="hover:text-red-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Spacer or Newsletter (optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-2">Get weekly job updates.</p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Social Icons Bottom Center */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-red-500 transition">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a href="https://github.com" aria-label="GitHub" className="hover:text-red-500 transition">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="https://stackoverflow.com" aria-label="Stack Overflow" className="hover:text-red-500 transition">
            <i className="fab fa-stack-overflow text-xl"></i>
          </a>
          <a href="https://dribbble.com" aria-label="Dribbble" className="hover:text-red-500 transition">
            <i className="fab fa-dribbble text-xl"></i>
          </a>
          <a href="https://behance.net" aria-label="Behance" className="hover:text-red-500 transition">
            <i className="fab fa-behance text-xl"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
