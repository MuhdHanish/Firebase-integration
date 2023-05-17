import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
import db from "../firebase/config";
import React, { useEffect, useState } from "react";

function Data() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  });

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submitData = () => {
    addDoc(usersRef, {
      name: name,
      age: Number(age),
    })
      .then(() => {
        setName("");
        setAge("");
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      });
  };

  const editUser = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userSnap = await getDoc(userDoc);
    await updateDoc(userDoc, {
      age: userSnap.data().age + 1,
    });
  };

  const deleteUser = async (userId) =>{
    await deleteDoc(doc(db, "users", userId));
  }

  return (
    <>
      <input
        type="text"
        value={name}
        name="name"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        value={age}
        name="age"
        onChange={(event) => setAge(event.target.value)}
      />
      <button onClick={() => submitData()}>Submit</button>

      {users.map((user) => (
        <div key={user.id}>
          <div style={{display:'flex',gap:'5px'}}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
          </div>
          
          <div style={{direction:'flex'}}>
          <button onClick={() => editUser(user.id)}>Increase</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Data;
