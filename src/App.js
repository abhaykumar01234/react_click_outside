import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import "./App.scss";

const useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    const mayBeHandler = (event) => {
      if (!domNode.current?.contains(event.target)) handler();
    };
    document.addEventListener("mousedown", mayBeHandler);
    return () => document.removeEventListener("mousedown", mayBeHandler);
  });

  return domNode;
};

function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((s) => !s);

  const items = [
    { id: 1, text: "Link1" },
    { id: 2, text: "Link2" },
    { id: 3, text: "Link3" },
    { id: 4, text: "Link4" },
    { id: 5, text: "Link5" },
  ];

  let menuRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="container">
      <div className="dropdown" ref={menuRef}>
        <button className="dropbtn" onClick={toggle}>
          Dropdown
        </button>
        <div className={cx("dropdown-content", { open: isOpen })}>
          {items.map(({ id, text }) => (
            <div key={id} onClick={() => setSelectedItem(text)}>
              {text}
            </div>
          ))}
        </div>
      </div>
      <p>Selected Item is {selectedItem}</p>
    </div>
  );
}

export default App;
