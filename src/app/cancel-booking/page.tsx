'use client'
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
    bookingId: string;
  };
  




function Page({ searchParams }: Props) {
  const router = useRouter();
  const id = searchParams.bookingId;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        try {
          const docRef = doc(db, "bookings", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBooking(docSnap.data());
          } else {
            setError("No such booking found!");
          }
        } catch (err) {
          setError("Failed to fetch booking details.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchBooking();
    }
  }, [id]);

  const cancelBooking = async () => {
    try {
      if (!id) return; // Ensure id is available
  
      const docRef = doc(db, 'bookings', id as string);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const bookingData = docSnap.data();
  
        // Add the booking data to the 'cancelledBookings' collection
        const cancelledRef = doc(db, 'cancelledBookings', id as string);
        // await addDoc(cancelledRef, { ...bookingData, status: 'canceled' });
        // await addDoc(collection(db,))
        await setDoc(doc(collection(db, 'cancelledBookings'), id),{ ...bookingData, status: 'canceled' })
  
        // Delete the booking from the 'bookings' collection
        await updateDoc(docRef, { status: 'canceled' }); // Updating status before delete for consistency
        await deleteDoc(docRef);
  
        alert('Booking canceled and moved to cancelled bookings!');
        router.push('/'); // Redirect to home or another page
      } else {
        alert('Booking not found.');
      }
    } catch (err) {
      alert('Failed to cancel booking.');
      console.error(err);
    }
  };
  

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Booking Details</h1>
      {/* <div className="space-y-2">
        <p className="text-gray-800">
          <strong>ID:</strong> {id}
        </p>
        <p className="text-gray-800">
          <strong>Name:</strong> {booking?.name}
        </p>
        <p className="text-gray-800">
          <strong>Date:</strong> {booking?.date}
        </p>
        <p className="text-gray-800">
          <strong>Status:</strong> {booking?.status}
        </p>
      </div> */}
      <button
        onClick={cancelBooking}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Cancel Booking
      </button>
    </div>
  );
}

export default Page;
