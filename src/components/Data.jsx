import React, { useEffect, useState } from "react";
import { useFirestoreCollection } from "../fireStore";

function Data({ collectionName }) {
  const {
    getDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
  } = useFirestoreCollection(collectionName);

  const [documents, setDocuments] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getDocuments().then((data) => setDocuments(data));
  }, [collectionName, getDocuments]);

  const editDocument = async (documentId) => {
    updateDocument(documentId);
  };

  const deleteDocumentById = async (documentId) => {
    deleteDocument(documentId);
  };

  const submitData = () => {
    addDocument({
      name: name,
      age: Number(age),
    }).then(() => {
      setName("");
      setAge("");
    });
  };

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

      {documents.map((document) => (
        <div key={document.id}>
          <h1>{document.name}</h1>
          <h1>{document.age}</h1>
          <button onClick={() => editDocument(document.id)}>Increase</button>
          <button onClick={() => deleteDocumentById(document.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Data;
