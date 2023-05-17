import {
 collection,
 getDocs,
 addDoc,
 updateDoc,
 doc,
 getDoc,
 deleteDoc,
} from "firebase/firestore";
import db from "./firebase/config";

export function useFirestoreCollection(collectionName) {
 const collectionRef = collection(db, collectionName);

 const getDocuments = async () => {
   const data = await getDocs(collectionRef);
   return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
 };

 const addDocument = async (data) => {
   try {
     await addDoc(collectionRef, data);
   } catch (error) {
     console.error("Error adding document:", error);
   }
 };

 const updateDocument = async (documentId) => {
   const documentRef = doc(db, collectionName, documentId);
   const documentSnap = await getDoc(documentRef);
   const data = {
    age: documentSnap.data().age + 1,
  };
   if (documentSnap.exists()) {
     await updateDoc(documentRef, data);
   }
 };

 const deleteDocument = async (documentId) => {
   await deleteDoc(doc(db, collectionName, documentId));
 };

 return { getDocuments, addDocument, updateDocument, deleteDocument };
}