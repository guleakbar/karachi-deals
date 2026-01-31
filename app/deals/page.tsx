'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Deal {
  id: number;
  destination: string;
  destination_city: string;
  departure_date: string;
  return_date: string;
  price: number;
  original_price: number;
  discount_percent: number;
  airline: string;
  airline_logo: string;
  stops: number;
  category: string;
  available_months: string[];
  google_flights_url: string;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchDeals();
  }, [selectedCategory, maxPrice]);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      let url = '/api/deals?';
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setDeals(data.deals);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal =>
    deal.destination_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Flight Deals from Karachi</h1>
          <p className="text-xl">Handpicked roundtrip deals - Save up to 70%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md py-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">All Categories</option>
              <option value="common">Common Deals</option>
              <option value="rare">Rare Deals</option>
              <option value="unique">Unique Deals</option>
            </select>

            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Any Price</option>
              <option value="20000">Under PKR 20,000</option>
              <option value="40000">Under PKR 40,000</option>
              <option value="60000">Under PKR 60,000</option>
              <option value="100000">Under PKR 100,000</option>
            </select>

            <button
              onClick={fetchDeals}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading amazing deals...</p>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No deals found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setMaxPrice('');
                fetchDeals();
              }}
              className="mt-4 text-purple-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={deal.airline_logo}
                        alt={deal.airline}
                        className="h-12 w-12 object-contain"
                      />
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        deal.category === 'rare' ? 'bg-yellow-100 text-yellow-800' :
                        deal.category === 'unique' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {deal.category.charAt(0).toUpperCase() + deal.category.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{deal.destination_city}</h3>
                    <p className="text-gray-600 mb-4">{deal.airline} - {deal.stops === 0 ? 'Non-stop' : `${deal.stops} stop`}</p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-purple-600">
                        PKR {deal.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400 line-through">
                        PKR {deal.original_price.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-green-50 px-3 py-2 rounded-lg mb-4">
                      <p className="text-green-700 font-semibold text-center">
                        Save {deal.discount_percent}% (PKR {(deal.original_price - deal.price).toLocaleString()})
                      </p>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <p>Depart: {new Date(deal.departure_date).toLocaleDateString('en-GB')}</p>
                      <p>Return: {new Date(deal.return_date).toLocaleDateString('en-GB')}</p>
                      <p className="mt-2">Available: {deal.available_months.join(', ')}</p>
                    </div>

                    <a
                      href={deal.google_flights_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold"
                    >
                      Book on Google Flights →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
