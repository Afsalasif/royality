import Razorpay from "razorpay";
import { createOrder } from "../../../../fireorderservice";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req:any) {
  // Parse request data
  const { amount, currency, receipt } = await req.json();
  console.log("heyyyyyyyyy")

  // Initialize Razorpay instance with your credentials
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  // Create order options
  // const options = {
  //   amount: amount * 100,  // Convert to smallest currency unit (paise)
  //   currency: currency || "INR",
  //   receipt: receipt || "receipt#1",
  // };
  const stringNumber = amount;
  const integerNumber = parseInt(stringNumber, 10)*100;
  const options = await createOrder(integerNumber)

  // Create order
  const order = await razorpay.orders.create(options);
  
  // Return order data as response
  return new Response(JSON.stringify(order), { status: 200 });
}




// import { createOrder } from "@/orderService";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { amount } = req.body;

//     try {
//       const order = await createOrder(amount);
//       res.status(200).json(order);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// };