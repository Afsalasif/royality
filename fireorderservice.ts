// orderService.ts
import { db } from "./firebase";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

interface OrderData {
 
  amount: number;
  currency: string;
  receipt: string;
}

export const generateReceiptNumber = async (): Promise<string> => {
  const receiptDocRef = doc(db, "orders", "receiptCounter");

  const receiptDoc = await getDoc(receiptDocRef);
  let currentReceiptNumber = 0;

  if (receiptDoc.exists()) {
    currentReceiptNumber = receiptDoc.data().number;
    await updateDoc(receiptDocRef, { number: currentReceiptNumber + 1 });
  } else {
    await setDoc(receiptDocRef, { number: 1 });
    currentReceiptNumber = 1;
  }

  return `REC-${String(currentReceiptNumber).padStart(6, "0")}`;
};

export const createOrder = async (amount: number): Promise<OrderData> => {
  const receipt = await generateReceiptNumber();

  const newOrderRef = doc(collection(db, "orders"));
  const orderData: OrderData = {
    
    amount,
    currency: "INR",
    receipt,
  };

  await setDoc(newOrderRef, orderData);

  return orderData;
};
