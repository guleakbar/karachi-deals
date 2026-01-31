import { NextResponse } from 'next/server';

// Mock database - In production, this would be Supabase
const MOCK_DEALS = [
  {
    id: 1,
    origin: 'KHI',
    destination: 'DXB',
    destination_city: 'Dubai',
    departure_date: '2026-03-15',
    return_date: '2026-03-22',
    price: 14500,
    original_price: 29000,
    discount_percent: 50,
    airline: 'Emirates',
    airline_logo: 'https://images.kiwi.com/airlines/64/EK.png',
    stops: 0,
    category: 'common',
    available_months: ['March', 'April', 'May'],
    google_flights_url: 'https://www.google.com/travel/flights?q=flights from KHI to DXB',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    origin: 'KHI',
    destination: 'LHR',
    destination_city: 'London',
    departure_date: '2026-04-10',
    return_date: '2026-04-20',
    price: 64000,
    original_price: 150000,
    discount_percent: 57,
    airline: 'British Airways',
    airline_logo: 'https://images.kiwi.com/airlines/64/BA.png',
    stops: 1,
    category: 'rare',
    available_months: ['April', 'May', 'June'],
    google_flights_url: 'https://www.google.com/travel/flights?q=flights from KHI to LHR',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    origin: 'KHI',
    destination: 'BKK',
    destination_city: 'Bangkok',
    departure_date: '2026-03-25',
    return_date: '2026-04-05',
    price: 27500,
    original_price: 55000,
    discount_percent: 50,
    airline: 'Thai Airways',
    airline_logo: 'https://images.kiwi.com/airlines/64/TG.png',
    stops: 0,
    category: 'common',
    available_months: ['March', 'April'],
    google_flights_url: 'https://www.google.com/travel/flights?q=flights from KHI to BKK',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    origin: 'KHI',
    destination: 'IST',
    destination_city: 'Istanbul',
    departure_date: '2026-05-01',
    return_date: '2026-05-10',
    price: 42000,
    original_price: 90000,
    discount_percent: 53,
    airline: 'Turkish Airlines',
    airline_logo: 'https://images.kiwi.com/airlines/64/TK.png',
    stops: 0,
    category: 'rare',
    available_months: ['May', 'June'],
    google_flights_url: 'https://www.google.com/travel/flights?q=flights from KHI to IST',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    origin: 'KHI',
    destination: 'JED',
    destination_city: 'Jeddah',
    departure_date: '2026-03-20',
    return_date: '2026-03-30',
    price: 24000,
    original_price: 48000,
    discount_percent: 50,
    airline: 'Saudia',
    airline_logo: 'https://images.kiwi.com/airlines/64/SV.png',
    stops: 0,
    category: 'common',
    available_months: ['March', 'April', 'May'],
    google_flights_url: 'https://www.google.com/travel/flights?q=flights from KHI to JED',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const destination = searchParams.get('destination');
    const maxPrice = searchParams.get('maxPrice');

    let filteredDeals = [...MOCK_DEALS];

    // Apply filters
    if (category) {
      filteredDeals = filteredDeals.filter(deal => deal.category === category);
    }

    if (destination) {
      filteredDeals = filteredDeals.filter(deal => 
        deal.destination_city.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (maxPrice) {
      filteredDeals = filteredDeals.filter(deal => 
        deal.price <= parseInt(maxPrice)
      );
    }

    return NextResponse.json({
      success: true,
      deals: filteredDeals,
      total: filteredDeals.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['destination', 'destination_city', 'price', 'original_price', 'airline'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In production, this would save to Supabase
    const newDeal = {
      id: MOCK_DEALS.length + 1,
      origin: 'KHI',
      ...body,
      discount_percent: Math.round(((body.original_price - body.price) / body.original_price) * 100),
      is_active: true,
      created_at: new Date().toISOString(),
    };

    MOCK_DEALS.push(newDeal);

    return NextResponse.json({
      success: true,
      deal: newDeal,
      message: 'Deal created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create deal' },
      { status: 500 }
    );
    }
  }

// PUT - Update a deal
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Deal ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const dealIndex = MOCK_DEALS.findIndex((deal) => deal.id === parseInt(id))

    if (dealIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      )
    }

    // Update the deal
    MOCK_DEALS[dealIndex] = {
      ...MOCK_DEALS[dealIndex],
      ...body,
      id: parseInt(id),
    }

    return NextResponse.json({
      success: true,
      deal: MOCK_DEALS[dealIndex],
      message: 'Deal updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update deal' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a deal
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Deal ID is required' },
        { status: 400 }
      )
    }

    const dealIndex = MOCK_DEALS.findIndex((deal) => deal.id === parseInt(id))

    if (dealIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      )
    }

    // Remove the deal
    const deletedDeal = MOCK_DEALS.splice(dealIndex, 1)[0]

    return NextResponse.json({
      success: true,
      deal: deletedDeal,
      message: 'Deal deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete deal' },
      { status: 500 }
    )
  }
}
