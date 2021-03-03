import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveDocList } from "./actions";
import axios from "axios";

var config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

function Notebook() {
  const [toggleNewBtn, setToggleNewBtn] = useState(false); // input field'i acip kapat
  const [documentList, setDocumentList] = useState([
    { id: 0, docName: "hello.txt", text: "" }, // butun stati obje arrayi olarak tanimladim
  ]);
  const [activeId, setActiveId] = useState(0); // aktif dokumanin index'ini bu degiskenle takip ediyoruz
  const newDocumentName = useRef(); // yeni dokuman adini cekmek icin ref kullandim
  const dispatch = useDispatch();

  function handleChange(e) {
    let val = e.target.value; // Girilen son karakter
    var arr = documentList.map((
      doc,
      i // Stackoverflow'da bir turk arkadas bu yontemi onermis
    ) =>
      i === activeId // https://stackoverflow.com/questions/35628774/how-to-update-single-value-inside-specific-array-item-in-redux/35629785#35629785
        ? doc.text.length > 0 // ilk tek satir if activeId ile id eslesiyor mu diye kontrol ediyor
          ? { ...doc, text: val } // ikinci tek satir if'de dokuman'a daha once karakter girilmis mi diye bakiyoruz
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
    dispatch(saveDocList());
    let data = documentList[activeId]; // aktif dokumani sec
    axios
      .post("http://localhost:5000/save-notebook", data, config)
      .then((response) => {
        console.log(response.data);
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
