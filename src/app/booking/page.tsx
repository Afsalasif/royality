"use client";
import React, { useEffect, useState } from "react";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useBooking } from "../../../contexts/Bookingcontext";
import { useContext } from "react";
import { BookingContext } from "../../../contexts/Bookingcontext";
import { useRouter } from "next/navigation";
import { roundTripData } from "../../../data/vehicleData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import RentalBooking from "@/components/RentalBooking";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { db } from "../../../firebase";
import InvoicePDF from "@/components/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { truncate } from "fs";

const formSchema1 = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z
      .string()
      .regex(/^\d+$/, "Mobile number must contain only numbers")
      .min(10, "Mobile number must be at least 10 digits"),
    pickup: z.string().min(1, "Pickup address is required"),
    drop: z.string().optional(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
    time: z.string().min(1, "Time is required"),
    specialRequest: z.string().optional(),
    type: z.enum(["25", "100", "none"], {
      required_error: "You need to select a payment type.",
    }),
    gst: z.boolean(),
    gstAddress: z.string().optional(),
    gstNumber: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.gst && (!data.gstAddress || !data.gstNumber)) {
        return false;
      }
      return true;
    },
    {
      message: "GST address and GST number are required when GST is selected",
      path: ["gstAddress", "gstNumber"],
    }
  );
type Props = {
  searchParams: SearchParams;
};
type SearchParams = {
  url: URL;
  end: string;
  start: string;
  stlc: string;
  enlc: string;
  tttyp: string;
  phn: string;
  tlt: string;
  km: number;
  veid: number;
  distance: number;
};

function Page({ searchParams }: Props) {
  const [phone, setPhone] = useState("");

  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      name: "",
      email: "",
      mobile: phone,
      pickup: searchParams.stlc,
      drop: searchParams.enlc || "nan", // Set default to empty string if not provided
      terms: false,
      time: "",
      specialRequest: "",
      gst: false,
      gstAddress: "",
      gstNumber: "",
      type: undefined,
    },
  });
  const { getValues, watch } = form1;
  const pricequota = watch("type");
  const formData = getValues();
  const router = useRouter();
  const [showGstFields, setShowGstFields] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>({});

  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(bookingDetails.tripTotalFare);
  const [driverPayment, setDriverPayment] = useState<number>();
  const [onlinepayment, setonlinepayment] = useState<number>();

  const customFunction = () => {
    const formData = getValues();
    console.log("Custom function form data:", formData);
    // Do something with the form data
  };
  const { booking } = useBooking();
  useEffect(() => {
    // customFunction();
    calculatePercentage(pricequota);
    console.log(pricequota);
  }, [pricequota]);

  const getVehicleDetails = (id: number) => {
    const results = roundTripData.find((obj) => obj.id == id);
    console.log(results);
    return results;
  };

  const getPriceDetail = (vh: any, km: number) => {
    if (searchParams.tttyp == "rental") {
      if (km == 120) {
        return vh.rentper12;
      } else if (km == 80) {
        return vh.rentPerDay;
      }
    } else if (searchParams.tttyp == "oneWay") {
      console.log("here first");
      if (km < 30) {
        const price = vh.minumumOneway;
        return price;
      } else {
        console.log("here seconmd");
        const balance = km - 30;
        const balancee = Math.ceil(balance);
        console.log(balance, "hereerere");
        const kmprice = vh.rentPerKm;
        const one = vh.minumumOneway;
        const rate = balancee * kmprice + one;
        const roundedRate = Math.ceil(rate);
        console.log(roundedRate);
        return roundedRate;
      }
    } else if (searchParams.tttyp == "round") {
      const days = km / 100;
      const bfare = days * vh.rentPerDay;
      return bfare;
    }
  };
  interface OrderData {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  }
  
  const createOrder = async (amount: number): Promise<OrderData> => {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency: "INR" }),
    });
  
    const orderData: OrderData = await response.json();
    return orderData;
  };
  interface PaymentDetails {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
  
  const verifyPayment = async (paymentDetails: PaymentDetails): Promise<{ success: boolean }> => {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });
  
    const verificationResult = await response.json();
    return verificationResult;
  };
  const calculatePercentage = (pricequota: string) => {
    console.log(pricequota);
    if (pricequota == "25") {
      const price = (25 / 100) * bookingDetails?.tripTotalFare;
      console.log(price, "here is the price");
      const dp = bookingDetails?.tripTotalFare - price;
      setonlinepayment(price);
      setTotalAmount(price);
      setDriverPayment(dp);
      const updatedB ={
        ...bookingDetails,
        advance:price|0,
        dp:dp

      }
      setBookingDetails(updatedB)
    } else if (pricequota == "100") {
      const price = (2 / 100) * bookingDetails?.tripTotalFare;
      const finalprice = bookingDetails?.tripTotalFare - price;
      console.log(finalprice);
      setTotalAmount(finalprice);
      setDriverPayment(0);
      setonlinepayment(finalprice);
      const updatedB ={
        ...bookingDetails,
        advance:finalprice|0,
        dp:0

      }
      setBookingDetails(updatedB)
    } else if (pricequota == "none") {
      setonlinepayment(0);
      setDriverPayment(bookingDetails?.tripTotalFare);
      setTotalAmount(bookingDetails?.tripTotalFare);
    }
  };

  useEffect(() => {
    getBookingData();
    setPhone(searchParams.phn);
  }, []);
  const calculateTotalFare = (basefare: number) => {
    const part = 18;
    const partialpercentage = (part / 100) * basefare;
    const total = basefare + partialpercentage;
    return total;
  };
  const t = () => {
    console.log(bookingDetails);
  };
  const getDestination = () => {
    if (searchParams.tttyp === "rental") {
      return "nan";
    } else if (searchParams.tttyp === "oneWay") {
      const t = searchParams.enlc;
      return t;
    }
  };

  const getBookingData = () => {
    let tripdistance = 0;
    if (searchParams.tttyp === "rental") {
      tripdistance = parseInt(searchParams?.tlt) * 10;
    } else if (searchParams.tttyp === "oneWay") {
      tripdistance = searchParams.distance;
    } else if (searchParams.tttyp === "round") {
      tripdistance = searchParams.distance;
    }

    const vehicleDetails = getVehicleDetails(searchParams.veid);
    const baseFare = getPriceDetail(vehicleDetails, tripdistance);
    const total = calculateTotalFare(baseFare);
    const destination = getDestination();

    const bookingData = {
      vehicleId: vehicleDetails?.id || "hey",
      vehicleName: vehicleDetails?.vehicleName || "hey",
      vehicleType: vehicleDetails?.vehicleType || "hey",
      tripRange: searchParams.tlt || "hey",
      tripDistance: tripdistance || "hey",
      tripType: searchParams.tttyp || "hey",
      tripPickupdate: searchParams.start,
      tripDropdate: searchParams.end || "",
      vehicleBaseRate: baseFare || "hey",
      vehicleCapacity: vehicleDetails?.maximumCapacity || "hey",
      tripTotalFare: total,
      tripStartingDestination: searchParams.stlc,
      tripEndingDestination: searchParams.enlc || "nun",
      vehicleperHour: vehicleDetails?.rentPerHour || "hey",
      vehicleperKM: vehicleDetails?.rentPerKm || "hey",
      passengerName: form1.getValues("name") || "hey",
      passengerContact: form1.getValues("mobile") || "hey",
      passengerEmail: form1.getValues("email") || "hey",
      bookingDate: new Date().toISOString(),
      pickupDateTime: form1.getValues("time") || "hey",
      dropoffDateTime: null,
      paymentStatus: "Pending",
      paymentMethod: form1.getValues("type") || "hey",
      specialInstructions: form1.getValues("specialRequest") || "hey",
      baseFare: baseFare || "hey",
      taxes: (18 / 100) * baseFare,
      amount: total,
      gstAddress: form1.getValues("gstAddress") || "hey",
      gstNumber: form1.getValues("gstNumber") || "hey",
      terms: form1.getValues("terms"),
      tripDistanceUnit: "km",
      bookingId: Math.floor(Math.random() * 1000000).toString(),
    };
    setBookingDetails(bookingData);
  };
  async function getNextSerialNumber() {
    const serialDocRef = doc(db, "meta", "serialNumber");
    return runTransaction(db, async (transaction) => {
      const serialDoc = await transaction.get(serialDocRef);
      if (!serialDoc.exists()) {
        transaction.set(serialDocRef, { lastSerial: 1 });
        return 1;
      } else {
        const lastSerial = serialDoc.data().lastSerial;
        const nextSerial = lastSerial + 1;
        transaction.update(serialDocRef, { lastSerial: nextSerial });
        return nextSerial;
      }
    });
  }
  // const [amount, setAmount] = useState('');
  // const [transactionId, setTransactionId] = useState('');

  // const handlePhonePePayment = async (amount:any,val:any) => {
  //   try {
  //     const order = await fetch('/api/create-phonepe-order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount: amount }),
  //     }).then((res) => res.json());

  //     if (order.redirectUrl) {
  //       // Redirect user to PhonePe payment page
  //       window.location.href = order.redirectUrl;
  //     } else {
  //       alert('Order creation failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error during PhonePe payment:', error);
  //   }
  // };
  // const handleRazorpayPayment = async (amount:any,val:any) => {
  //   try {
  //     const order = await fetch('/api/create-order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount: amount }),
  //     }).then((res) => res.json());

  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
  //       amount: order.amount,
  //       currency: 'INR',
  //       name: 'RP ROYALITY',
  //       description: 'Booking Payment',
  //       order_id: order.id,
  //       handler: async (response: PaymentDetails) => {
  //         const verificationResult = await verifyPayment(response);  // Verify payment
          
  //         if (verificationResult.success) {
  //           console.log("Payment verified successfully!");
  //           await saveBookingToFirebase(val);

  //         } else {
  //           console.error("Payment verification failed.");
          
  //         }
  //       },
  //       prefill: {
  //         name: form1.getValues('name'),
  //         email: form1.getValues('email'),
  //         contact: form1.getValues('mobile'),
  //       },
  //       theme: {
  //         color: '#3399cc',
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error('Error during Razorpay payment:', error);
  //   }
  // }


  const handleRazorpayPayment = async (amount:any, val:any) => {
    try {
      setLoading(true); // Set loading to true while creating the order

      const order = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      }).then((res) => res.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: 'INR',
        name: 'RP ROYALITY',
        description: 'Booking Payment',
        order_id: order.id,
        handler: async (response:any) => {
          const verificationResult = await verifyPayment(response); // Verify payment

          if (verificationResult.success) {
            console.log("Payment verified successfully!");
            await saveBookingToFirebase(val);
          } else {
            console.error("Payment verification failed.");
          }
          setLoading(false); // Set loading to false after payment verification
        },
        prefill: {
          name: form1.getValues('name'),
          email: form1.getValues('email'),
          contact: form1.getValues('mobile'),
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false); // Set loading to false after Razorpay window opens
    } catch (error) {
      console.error('Error during Razorpay payment:', error);
      setLoading(false); // Ensure loading is set to false in case of error
    }
  };
  const Spinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema1>) => {
    if (values.type === '25' || values.type === '100') {
      // Trigger Razorpay payment for 25% or 100% payment
       await handleRazorpayPayment(totalAmount,values);
      // await handlePhonePePayment(totalAmount,values)
      

    } else {
      // Handle pay to driver case directly
      await saveBookingToFirebase(values);
      // router.push(`/booking-confirmation?bookingId=${customDocId}`);
    }
  };

  const saveBookingToFirebase = async (values:any) => {
    try {
      const nextSerialNumber = await getNextSerialNumber();
      const customDocId = `RP${String(nextSerialNumber).padStart(5, '0')}`;
      const vehicleDetailss = {
        bookingDetails,
        values,
      };
      await setDoc(doc(collection(db, 'bookings'), customDocId), vehicleDetailss);
      console.log('Document written with ID: ', customDocId);
      router.push(`/booking-confirmation?bookingId=${customDocId}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // const { handleSubmit, formState: { errors } } = form1;
  // const onSubmit = async (values: z.infer<typeof formSchema1>) => {
  //   console.log("here clicked");
  //   const vehicleDetailss = {
  //     bookingDetails,
  //     values,
  //   };

  //   try {
  //     const nextSerialNumber = await getNextSerialNumber();
  //     const customDocId = `RP${String(nextSerialNumber).padStart(5, "0")}`;
  //     await setDoc(
  //       doc(collection(db, "bookings"), customDocId),
  //       vehicleDetailss
  //     );
  //     console.log("Document written with ID: ", customDocId);
  //     router.push(`/booking-confirmation?bookingId=${customDocId}`);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <>
     {loading && <Spinner />} {/* Render Spinner component when loading */}
      <div className="p-4 max-w-6xl lg:flex lg:justify-between  mx-auto">
        <div className="bg-white shadow-md rounded p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">
            CONTACT & PICKUP DETAILS
          </h2>
          <Form {...form1}>
            <form onSubmit={form1.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form1.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NAME</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          {...field}
                          placeholder="Enter your name here"
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          {...field}
                          placeholder="Enter your email here"
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MOBILE</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          defaultValue={phone}
                          placeholder={phone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="pickup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PICKUP</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123 Main St, Cityville"
                          defaultValue="123 Main St, Cityville"
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {searchParams.tttyp != "rental" ? (
                  <FormField
                    control={form1.control}
                    name="drop"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DROP</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <></>
                )}

                <FormField
                  control={form1.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TIME</FormLabel>
                      <FormControl>
                        <input
                          type="time"
                          {...field}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form1.control}
                  name="specialRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SPECIAL REQUEST <span className="text">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Enter any special requests here"
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" items-center">
                  <FormField
                    control={form1.control}
                    name="gst"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have GST?</FormLabel>
                        <FormControl>
                          <input
                            type="checkbox"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            checked={field.value} // Use 'checked' for the checkbox state
                            onChange={(e) => {
                              field.onChange(e); // Update the form state
                              setShowGstFields(e.target.checked); // Custom handler to show additional fields
                            }}
                            onBlur={field.onBlur} // Attach the blur handler
                            ref={field.ref} // Attach the ref
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {showGstFields && (
                  <>
                    <FormField
                      control={form1.control}
                      name="gstAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Buissness name</FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter Buissness name"
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form1.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST NUMBER</FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter GST number"
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <FormField
                control={form1.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select payment mode</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="25" />
                          </FormControl>
                          <FormLabel className="font-normal">Pay 25%</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="100" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pay Full{" "}
                            <span className="font-semibold">
                              (get 2% discount)
                            </span>
                          </FormLabel>
                        </FormItem>
                        {/* <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pay to driver
                          </FormLabel>
                        </FormItem> */}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2 mt-4">
                <FormField
                  control={form1.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="mt-25">
                        <input
                          type="checkbox"
                          checked={field.value} // Use 'checked' for boolean values
                          onChange={field.onChange} // Attach the onChange handler
                          onBlur={field.onBlur} // Attach the onBlur handle
                          ref={field.ref} // Attach the ref
                          className="mr-2"
                        />
                      </FormControl>
                      <FormLabel>
                        I agree to the
                        <a
                          className="text-blue-800"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://keralatourroyality.com/termpage"
                        >
                          terms & conditions
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <div className="bg-white mt-5 flex justify-between  shadow-md rounded p-6">
                  <div>
                    <h2 className="mb-4"></h2>
                    <ol>
                      <li className="text">
                        <span className="text-red-800"> </span>The total Amount:
                        ₹<span>{bookingDetails?.tripTotalFare}</span>
                      </li>
                      <li className="">
                        <span className="text-red-800"></span>Online payment: ₹
                        <span>{onlinepayment}</span>
                      </li>
                      <li className="">
                        <span className="text-red-800"></span>Payment to Driver:
                        ₹ <span>{driverPayment}</span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="float-right">
                  <button
                    type="submit"
                    className="mt-4  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    PROCEED
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="bg-white shadow-md rounded p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">YOUR BOOKING DETAILS</h2>
          <RentalBooking props={bookingDetails} />
        </div>
      </div>
    </>
  );
}

export default Page;
