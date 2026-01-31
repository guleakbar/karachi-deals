'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Implement newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscribed(true)
      setEmail('')
    } catch (error) {
      console.error('Subscription failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold text-center mb-6">
          Karachi Deals
        </h1>
        <p className="text-2xl text-center text-gray-600 mb-4">
          Handpicked roundtrip flight deals from Karachi
        </p>
        <p className="text-xl text-center text-gray-500 mb-12">
          Save up to 70% on international flights to Dubai, London, Bangkok & more
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/deals"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg transition-colors"
          >
            View Deals
          </Link>
          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg text-lg transition-colors">
            Sign Up Free
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Routes from Karachi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { city: 'Dubai', price: 'PKR 35,000', image: 'bg-blue-200' },
            { city: 'London', price: 'PKR 95,000', image: 'bg-red-200' },
            { city: 'Bangkok', price: 'PKR 55,000', image: 'bg-green-200' },
            { city: 'Istanbul', price: 'PKR 65,000', image: 'bg-purple-200' },
            { city: 'Kuala Lumpur', price: 'PKR 48,000', image: 'bg-yellow-200' },
            { city: 'Toronto', price: 'PKR 125,000', image: 'bg-pink-200' },
          ].map((route) => (
            <div key={route.city} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${route.image} h-40 rounded-lg mb-4`}></div>
              <h3 className="text-2xl font-bold mb-2">{route.city}</h3>
              <p className="text-gray-600 mb-4">From {route.price}</p>
              <Link href="/deals" className="text-purple-600 hover:text-purple-700 font-semibold">
                View Deals →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get exclusive flight deals delivered to your inbox
          </p>
          
          {subscribed ? (
            <div className="bg-white text-purple-600 px-8 py-4 rounded-lg inline-block">
              ✓ Successfully subscribed! Check your email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Karachi Deals</h3>
              <p className="text-gray-400">Your trusted source for flight deals from Karachi</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/deals" className="hover:text-white">All Deals</Link></li>
                <li><Link href="#" className="hover:text-white">How It Works</Link></li>
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                <li><Link href="#" className="hover:text-white">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Karachi Deals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
