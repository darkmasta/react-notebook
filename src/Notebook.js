import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveText } from "./actions";
import axios from "axios";

function Notebook() {
  const textData = useSelector((state) => state.text);
  const [toggleNewBtn, setToggleNewBtn] = useState(false);
  const [documentList, setDocumentList] = useState([
    { id: 0, docName: "hello.txt", text: "" },
  ]);
  const [activeId, setActiveId] = useState(0);
  const newDocumentName = useRef();
  const dispatch = useDispatch();

  function handleChange(e) {
    let val = e.target.value;
    var arr = documentList.map((doc, i) =>
      i === activeId
        ? doc.text.length > 0
          ? { ...doc, text: val }
          : { ...doc, text: doc.text + val }
        : { ...doc }
    );
    setDocumentList(arr);
  }

  function toggleNewButton() {
    setToggleNewBtn(!toggleNewBtn);
  }

  function newDocument(e) {
    if (e.key === "Enter") {
      let lastId = documentList.slice(-1)[0].id; // En son dokumanin id'si

      setDocumentList([
        ...documentList,
        {
          docName: newDocumentName.current.value + ".txt",
          text: "",
          id: lastId + 1, // Yeni dokuman id'si
        },
      ]);
    } else {
    }
  }

  function postText() {
    axios.post("localhost:5000/").then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="notebook-container">
      <div className="notebook-list">
        {toggleNewBtn ? (
          <input
            type="text"
            placeholder="Enter the document name"
            ref={newDocumentName}
            onKeyPress={newDocument}
          />
        ) : (
          ""
        )}
        <ul>
          {Array.from(documentList).map(function(doc, index) {
            return (
              <li
                className={activeId === doc.id ? "active" : ""}
                onClick={() => setActiveId(doc.id)}
                key={index}
              >
                {doc.docName}
              </li>
            );
          })}
        </ul>
        <button id="new-notebook-button" onClick={toggleNewButton}>
          New Notebook
        </button>
        <button id="save-button" onClick={postText}>
          Save Notebook
        </button>
      </div>
      <textarea
        value={Array.from(documentList)[activeId].text}
        onChange={handleChange}
        className="notebook-text"
      ></textarea>
    </div>
  );
}

export default Notebook;
