import axios from "axios";
import crypto from "crypto";
import { generateReceiptNumber } from "../../../../fireorderservice";
import { headers } from "next/headers";

export async function POST(req: any, res: any) {
  if (req.method === "POST") {
    const amount = 5;
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const secretKey = process.env.PHONEPE_SECRET_KEY;
    const transactionId = generateTransactionId();
    const receipt = await generateReceiptNumber();
    const successUrl = "http://localhost:3000/booking-confirmation"; // Your success URL
    const failureUrl = "https://yourwebsite.com/payment-failure"; // Your failure URL
    const customDocId = "RP00001"
    
    const data = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID123",
      amount: 100,
      redirectUrl: `/booking-confirmation?bookingId=${customDocId}`,
      redirectMode: "REDIRECT",
      callbackUrl: failureUrl,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // const checksum = generateChecksum(data, secretKey);
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + secretKey;
    const sha256 =crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 +'###'+keyIndex
    const prod_url ="https://api.phonepe.com/apis/hermes/pg/v1/pay"
    const options ={
        method: 'POST',
        url: prod_url,
        headers:{
            accept:"application/json",
            "Content-Type": "application/json",
            "X-VERIFY":checksum
        },
        data:{
            payloadMain
        }
    }

    try {
      axios.request(
      options
      ).then(function(response){
        console.log(response.data);
      }).catch(function(error){
        console.log(error);
      })

      
    } catch (error) {
      console.error("Error creating PhonePe order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  }
}

// Helper function to generate a unique transaction ID
function generateTransactionId() {
  return `TID-${Date.now()}`;
}

// Helper function to generate a checksum
function generateChecksum(data: any, secretKey: any) {
  const checksumString = `${data.merchantId}${data.transactionId}${data.amount}${secretKey}`;
  return crypto.createHash("sha256").update(checksumString).digest("hex");
}
