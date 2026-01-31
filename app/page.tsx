export default function Home() {
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
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
            View Deals
          </button>
          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg text-lg font-semibold">
            Sign Up Free
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Routes from Karachi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Dubai 🇦🇪</h3>
            <p className="text-gray-600 mb-4">From PKR 15,000</p>
            <p className="text-sm text-green-600 font-semibold">Save up to 50%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">London 🇬🇧</h3>
            <p className="text-gray-600 mb-4">From PKR 65,000</p>
            <p className="text-sm text-green-600 font-semibold">Save up to 60%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Bangkok 🇹🇭</h3>
            <p className="text-gray-600 mb-4">From PKR 28,000</p>
            <p className="text-sm text-green-600 font-semibold">Save up to 55%</p>
          </div>
        </div>
      </div>
    </main>
  );
}
