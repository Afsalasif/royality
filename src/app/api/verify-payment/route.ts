import crypto from "crypto";

export async function POST(req :any) {
  // Parse request data
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  // Create hash using Razorpay secret key
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Verify if generated signature matches Razorpay's signature
  if (generated_signature === razorpay_signature) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}
