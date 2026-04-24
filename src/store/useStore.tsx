"use client";

import { create } from 'zustand'; // I'll use a simple state pattern if zustand isn't installed, or just React Context.
// Since I don't want to install more deps unless necessary, I'll use a local React Context provider.

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'renter' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: 'car' | 'bike' | 'scooty';
  subType: string;
  price: number; // Daily rate
  hourlyPrice: number;
  image: string;
  images: string[];
  specs: {
    fuel: string;
    transmission: string;
    seats: number;
    mileage: string;
    km: string;
    year: number;
  };
  owner: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
  features: string[];
  location: string;
  available: boolean;
}

export interface Booking {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  conditionCheck?: {
    pickupImages?: string[];
    returnImages?: string[];
    damageAssessed?: boolean;
    damageDescription?: string;
    deductionAmount?: number;
  };
}

interface AppState {
  user: User | null;
  vehicles: Vehicle[];
  isLoadingVehicles: boolean;
  bookings: Booking[];
  login: (newUser: User) => void;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  addVehicle: (vehicleData: Omit<Vehicle, 'id'>) => Promise<void>;
  toggleAvailability: (vehicleId: string, available: boolean) => Promise<void>;
  updateBookingCondition: (bookingId: string, updates: Partial<Booking['conditionCheck']>, newStatus?: Booking['status']) => void;
}

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Creta 2024',
    brand: 'Hyundai',
    type: 'car',
    subType: 'SUV',
    price: 2500,
    hourlyPrice: 350,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'
    ],
    specs: { fuel: 'Diesel', transmission: 'Automatic', seats: 5, mileage: '18 km/l', km: '12,000', year: 2024 },
    owner: { id: 'o1', name: 'SafeDrive Rentals', rating: 4.8, verified: true },
    features: ['Air Conditioning', 'Bluetooth', 'Reverse Camera', 'Sunroof'],
    location: 'Jaipur, Rajasthan',
    available: true
  },
  {
    id: 'v2',
    name: 'Classic 350',
    brand: 'Royal Enfield',
    type: 'bike',
    subType: 'Cruiser',
    price: 800,
    hourlyPrice: 120,
    image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80'],
    specs: { fuel: 'Petrol', transmission: 'Manual', seats: 2, mileage: '35 km/l', km: '8,500', year: 2023 },
    owner: { id: 'o2', name: 'Arjun BikerHub', rating: 4.9, verified: true },
    features: ['ABS', 'Comfort Seat', 'Engine Guard'],
    location: 'Manali, HP',
    available: true
  },
  {
    id: 'v3',
    name: 'Model 3',
    brand: 'Tesla',
    type: 'car',
    subType: 'Luxury',
    price: 8500,
    hourlyPrice: 1200,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80'],
    specs: { fuel: 'Electric', transmission: 'Automatic', seats: 5, mileage: '500 km/charge', km: '4,000', year: 2024 },
    owner: { id: 'o3', name: 'Premium Fleet', rating: 4.7, verified: true },
    features: ['Autopilot', 'Premium Sound', 'Leather Interior'],
    location: 'Delhi NCR',
    available: true
  },
  {
    id: 'v4',
    name: 'Activa 6G',
    brand: 'Honda',
    type: 'scooty',
    subType: 'Standard',
    price: 450,
    hourlyPrice: 80,
    image: 'https://images.unsplash.com/photo-1621963416944-a641b6e5c320?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1621963416944-a641b6e5c320?w=800&q=80'],
    specs: { fuel: 'Petrol', transmission: 'Automatic', seats: 2, mileage: '45 km/l', km: '15,000', year: 2022 },
    owner: { id: 'o4', name: 'Amit Scooters', rating: 4.5, verified: false },
    features: ['Helmet Included', 'Spacious Boot'],
    location: 'Goa',
    available: true
  },
  {
    id: 'v5',
    name: 'Compass',
    brand: 'Jeep',
    type: 'car',
    subType: 'SUV',
    price: 4500,
    hourlyPrice: 600,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80'],
    specs: { fuel: 'Diesel', transmission: 'Manual', seats: 5, mileage: '15 km/l', km: '20,000', year: 2023 },
    owner: { id: 'o1', name: 'SafeDrive Rentals', rating: 4.8, verified: true },
    features: ['4x4 Capability', 'Hill Assist', 'Panoramic Roof'],
    location: 'Jaipur, Rajasthan',
    available: true
  }
];

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  // Load from localStorage and backend on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rk_user');
    const savedBookings = localStorage.getItem('rk_bookings');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    
    // Fetch live vehicles
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setIsLoadingVehicles(true);
    try {
      const { apiFetch } = await import('@/lib/api');
      const data = await apiFetch('/get-vehicles', { method: "GET" });
      if (data && Array.isArray(data)) {
        // Transform Supabase column names to match the frontend Vehicle interface
        const transformed: Vehicle[] = data.map((v: any) => {
          const rawFeatures = v.features || [];
          const providerToken = rawFeatures.find((f: string) => f.startsWith("__PROVIDER__:"));
          const providerNameToken = rawFeatures.find((f: string) => f.startsWith("__PROVIDER_NAME__:"));
          
          const extractedEmail = providerToken ? providerToken.replace("__PROVIDER__:", "") : null;
          const extractedName = providerNameToken ? providerNameToken.replace("__PROVIDER_NAME__:", "") : null;
          
          const cleanFeatures = rawFeatures.filter((f: string) => !f.startsWith("__PROVIDER"));

          return {
            id: String(v.id),
            name: v.model || v.name || 'Unknown',
            brand: v.brand || 'Unknown',
            type: (v.vehicle_type || v.type || 'car') as 'car' | 'bike' | 'scooty',
            subType: v.variant || v.sub_type || v.subType || v.vehicle_type || 'Standard',
            price: v.daily_rate || v.price || 0,
            hourlyPrice: v.hourly_rate || v.hourlyPrice || 0,
            image: v.image_url || v.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
            images: v.gallery_images || v.images || [],
            specs: {
              fuel: v.fuel_type || v.specs?.fuel || 'Petrol',
              transmission: v.transmission || v.specs?.transmission || 'Manual',
              seats: v.seats || v.specs?.seats || 4,
              mileage: v.mileage || v.specs?.mileage || 'N/A',
              km: v.km_driven || v.specs?.km || '0',
              year: v.manufacture_year || v.specs?.year || 2024,
            },
            owner: {
              id: String(extractedEmail || v.provider_id || v.owner_id || v.provider_email || 'unknown'),
              name: extractedName || v.provider_name || v.owner?.name || (extractedEmail ? extractedEmail.split('@')[0] : (v.provider_email ? v.provider_email.split('@')[0] : 'Provider')),
              rating: v.rating || v.owner?.rating || 5.0,
              verified: true,
            },
            features: cleanFeatures,
            location: v.location || 'India',
            available: v.available !== false,
          };
        });
        setVehicles(transformed);
        console.log("✅ Vehicles fetched and transformed:", transformed.length);
      } else {
        console.warn("⚠️ Received empty or invalid vehicles data from backend");
      }
    } catch (error) {
      console.warn("Could not fetch backend vehicles, falling back to mock dataset", error);
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('rk_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rk_user');
    localStorage.removeItem('rk_token');
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('rk_bookings', JSON.stringify(updatedBookings));

    try {
      const { apiFetch } = await import('@/lib/api');
      // Backend expects snake_case field names
      const backendPayload = {
        user_email: user?.email,
        vehicle_id: bookingData.vehicleId,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
      };
      const backendBooking = await apiFetch('/book-vehicle', {
        method: "POST",
        body: JSON.stringify(backendPayload)
      });
      console.log("✅ Successfully posted booking!", backendBooking);
      // Wait a bit then re-fetch vehicles to update availability (mock)
      setTimeout(() => fetchVehicles(), 1000);
    } catch (error: any) {
      console.error("❌ Failed to post booking:", error);
      alert(`Booking failed: ${error.message || 'Unknown error'}`);
    }
  };

  const addVehicle = async (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `v${Date.now()}`
    };
    
    // Optimistic update
    setVehicles(prev => [newVehicle, ...prev]);

    try {
      const { apiFetch } = await import('@/lib/api');
      
      // Prepare clean payload for backend
      const backendPayload = {
        name: vehicleData.name,
        brand: vehicleData.brand,
        type: vehicleData.type,
        subType: vehicleData.subType,
        price: Number(vehicleData.price),
        hourlyPrice: Number(vehicleData.hourlyPrice),
        image: vehicleData.image,
        images: Array.isArray(vehicleData.images) ? vehicleData.images : [],
        location: vehicleData.location,
        features: Array.isArray(vehicleData.features) ? vehicleData.features : [],
        providerEmail: user?.email,
        specs: {
          fuel: vehicleData.specs?.fuel || 'Petrol',
          transmission: vehicleData.specs?.transmission || 'Manual',
          seats: Number(vehicleData.specs?.seats) || 4,
          mileage: vehicleData.specs?.mileage || 'N/A',
          km: vehicleData.specs?.km || '0',
          year: Number(vehicleData.specs?.year) || 2024,
        },
        owner: {
          id: user?.id,
          name: user?.name || 'Provider'
        }
      };

      console.log("📦 Broadcasting vehicle payload:", backendPayload);
      
      const response = await apiFetch('/add-vehicle', {
        method: "POST",
        body: JSON.stringify(backendPayload)
      });
      
      console.log("✅ Successfully broadcasted vehicle!", response);
      
      // Re-fetch to get real Supabase IDs
      await fetchVehicles();
    } catch (error: any) {
      console.error("❌ Failed to broadcast vehicle:", error);
      // Remove optimistic update
      setVehicles(prev => prev.filter(v => v.id !== newVehicle.id));
      throw error;
    }
  };

  const toggleAvailability = async (vehicleId: string, available: boolean) => {
    // Optimistic UI update
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, available } : v));
    
    try {
      const { apiFetch } = await import('@/lib/api');
      await apiFetch('/toggle-availability', {
        method: "POST",
        body: JSON.stringify({ vehicle_id: vehicleId, available })
      });
      console.log(`✅ Success: Toggled ${vehicleId} to ${available}`);
    } catch (error: any) {
      console.error("❌ Failed to toggle availability:", error);
      // Revert optimistic update on failure
      setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, available: !available } : v));
      throw error;
    }
  };

  const updateBookingCondition = (bookingId: string, updates: Partial<Booking['conditionCheck']>, newStatus?: Booking['status']) => {
    const updatedBookings = bookings.map(b => {
      if (b.id !== bookingId) return b;
      
      const newBooking = {
        ...b,
        status: newStatus || b.status,
        conditionCheck: {
          ...b.conditionCheck,
          ...updates
        }
      };
      
      // Update local storage conceptually or handle backend fetch here
      // For this implementation, we simply optimistically update the state.
      return newBooking;
    });

    setBookings(updatedBookings);
    localStorage.setItem('rk_bookings', JSON.stringify(updatedBookings));

    // Optional: add a backend API call here if there is a 'update-booking' endpoint.
    console.log("✅ Updated booking condition:", bookingId, updates);
  };

  return (
    <AppContext.Provider value={{ user, vehicles, bookings, login, logout, addBooking, addVehicle, toggleAvailability, updateBookingCondition, isLoadingVehicles }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
