"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/InvoicePDF";

type Props = {
  searchParams: SearchParams;
};

type SearchParams = {
  bookingId: string;
};

type BookingData = {
  values?: {
    name?: string;
  };
  // Add other fields as necessary
};

function BookingConfirmation({ searchParams }: Props) {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  console.log("object")

  useEffect(() => {
    const bookingId = searchParams.bookingId;
    if (!bookingId) {
      return;
    }
    const bookingid = 'RP00022'

    const fetchBookingData = async () => {
      try {
        const docRef = doc(db, "bookings", bookingid);
        const docSnap = await getDoc(docRef);
        console.log("here im reached")

        if (docSnap.exists()) {
          setBookingData(docSnap.data() as BookingData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [searchParams.bookingId]);

  console.log(bookingData);

  if (!bookingData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold mb-4 text-center">Booking Confirmation</h1>
        <p className="text-lg text-center mb-6">Thank you for your booking!</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Booking Details:</h2>
          <p><strong>Booking ID:</strong> {searchParams.bookingId}</p>
          <p><strong>Customer Name:</strong> {bookingData?.values?.name}</p>
          {/* <p><strong>Date:</strong> {bookingData.date}</p> */}
        </div>

        <PDFDownloadLink
          document={<Invoice bookingData={bookingData} bookingId={searchParams.bookingId} />}
          fileName={`Booking_${searchParams.bookingId}.pdf`}
        >
          {({ loading }) => (
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading ? "Generating PDF..." : "Download Invoice"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default BookingConfirmation;
