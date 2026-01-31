'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Deal {
  id: string
  origin: string
  destination: string
  price: number
  currency: string
  departureDate: string
  returnDate: string
  airline: string
  bookingUrl: string
  discount?: number
  featured: boolean
}

export default function AdminDashboard() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Deal>>({
    origin: 'KHI',
    destination: '',
    price: 0,
    currency: 'PKR',
    departureDate: '',
    returnDate: '',
    airline: '',
    bookingUrl: '',
    discount: 0,
    featured: false
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals')
      const data = await response.json()
      setDeals(data.deals || [])
    } catch (error) {
      console.error('Failed to fetch deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = isEditing ? `/api/deals?id=${editingId}` : '/api/deals'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchDeals()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save deal:', error)
    }
  }

  const handleEdit = (deal: Deal) => {
    setFormData(deal)
    setIsEditing(true)
    setEditingId(deal.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return
    
    try {
      const response = await fetch(`/api/deals?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchDeals()
      }
    } catch (error) {
      console.error('Failed to delete deal:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      origin: 'KHI',
      destination: '',
      price: 0,
      currency: 'PKR',
      departureDate: '',
      returnDate: '',
      airline: '',
      bookingUrl: '',
      discount: 0,
      featured: false
    })
    setIsEditing(false)
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Admin Dashboard</h1>
          <Link href="/" className="text-gray-600 hover:text-purple-600">
            ← Back to Site
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Origin</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Departure Date</label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Return Date</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Airline</label>
              <input
                type="text"
                value={formData.airline}
                onChange={(e) => setFormData({...formData, airline: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Booking URL</label>
              <input
                type="url"
                value={formData.bookingUrl}
                onChange={(e) => setFormData({...formData, bookingUrl: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Discount (%)</label>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="mr-2"
                id="featured"
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Deal</label>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                {isEditing ? 'Update Deal' : 'Add Deal'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Current Deals</h2>
          
          {loading ? (
            <p className="text-center py-8">Loading deals...</p>
          ) : deals.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No deals found. Add your first deal above!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Route</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Dates</th>
                    <th className="px-4 py-3 text-left">Airline</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {deal.origin} → {deal.destination}
                      </td>
                      <td className="px-4 py-3">
                        {deal.currency} {deal.price.toLocaleString()}
                        {deal.discount && deal.discount > 0 && (
                          <span className="ml-2 text-green-600 text-sm">-{deal.discount}%</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(deal.departureDate).toLocaleDateString()}
                        <br />
                        {new Date(deal.returnDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{deal.airline}</td>
                      <td className="px-4 py-3">
                        {deal.featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleEdit(deal)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(deal.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
