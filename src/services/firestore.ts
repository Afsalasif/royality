'use client'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface DocumentData {
  [key: string]: any;
}

export const addDocumentToCollection = async (collectionName: string, documentData: DocumentData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), documentData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};