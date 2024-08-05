'use client'
import { createContext, useContext, useState } from 'react';

 export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(null);

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}