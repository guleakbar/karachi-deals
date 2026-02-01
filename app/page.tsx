'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPlane, FaMapMarkerAlt, FaEnvelope, FaStar, FaFire } from 'react-icons/fa'

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscribed(true)
      setEmail('')
    } catch (error) {
      console.error('Subscription failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const popularRoutes = [
    { city: 'Dubai', code: 'DXB', price: '45,000', image: '🏜️', deals: 12 },
    { city: 'Istanbul', code: 'IST', price: '55,000', image: '🕌', deals: 8 },
    { city: 'Bangkok', code: 'BKK', price: '65,000', image: '🏯', deals: 15 },
    { city: 'London', code: 'LHR', price: '125,000', image: '🏰', deals: 6 },
    { city: 'Kuala Lumpur', code: 'KUL', price: '58,000', image: '🌆', deals: 10 },
    { city: 'Singapore', code: 'SIN', price: '62,000', image: '🌴', deals: 9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptLTggMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0tOCAwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6bTI0IDBjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <FaPlane className="text-8xl text-white drop-shadow-2xl" />
          </motion.div>

          <h1 className="text-7xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-lg">
            Furren <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Deals</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-purple-100 mb-4 font-light"
          >
            ✈️ Handpicked Flight Deals Worldwide
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto"
          >
            Discover unbeatable roundtrip flight deals to your favorite destinations worldwide.
            Subscribe to never miss out on amazing travel opportunities!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link 
              href="/deals" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transform transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50"
            >
              <FaFire className="text-2xl" />
              Explore Hot Deals
              <FaFire className="text-2xl" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Popular Routes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
            <FaStar className="text-yellow-400" />
            Popular Destinations
            <FaStar className="text-yellow-400" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={route.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {route.image}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {route.city}
                  </h3>
                  <p className="text-purple-200 text-sm mb-4 flex items-center justify-center gap-2">
                    <FaMapMarkerAlt className="text-yellow-400" />
                    {route.code}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-purple-300 text-xs">Starting from</p>
                      <p className="text-3xl font-bold text-yellow-400">PKR {route.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-300 text-xs">Available deals</p>
                      <p className="text-2xl font-bold text-white">{route.deals}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <div className="text-center mb-8">
            <FaEnvelope className="text-6xl text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Never Miss a Deal!
            </h2>
            <p className="text-purple-200 text-lg">
              Get exclusive flight deals delivered straight to your inbox
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-2xl font-bold text-yellow-400 mb-2">Thank you for subscribing!</p>
              <p className="text-purple-200">Check your inbox for the latest deals</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 rounded-full text-lg bg-white/20 border-2 border-white/30 text-white placeholder-purple-300 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-8 py-4 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '✈️ Subscribing...' : '🚀 Subscribe Now'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-20 text-center text-purple-200"
        >
          <p className="mb-4">
            <Link href="/admin" className="hover:text-yellow-400 transition-colors underline">
              Admin Dashboard
            </Link>
          </p>
          <p className="text-sm">
            © 2026 Furren. Finding you the best flight deals Worldwide. 🌍✈️
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
