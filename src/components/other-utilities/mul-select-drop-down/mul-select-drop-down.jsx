import React, { useEffect, useState } from "react";

import "./mul-select-drop-down.css";
import uuid from "uuid/v1";

import CheckIcon from "@material-ui/icons/Check";

const MulSelectDropDown = () => {
  const [dropdownItems, setDropdownItems] = useState([
    "Hello",
    "Hi",
    "Bye",
    "Hello",
    "Hi",
    "Bye",
    "Hello",
    "Hi",
    "Bye",
    "Hello",
    "Hi",
    "Bye",
  ]);

  const [dropdownItemsDict, setDropdownItemsDict] = useState([]);

  // preprocessing
  /*
    1. create dictionary of menu items
    2.  

  */
  const preprocessing = () => {
    setDropdownItemsDict(
      dropdownItems.map((dropdownItem) => ({
        id: uuid(),
        itemName: dropdownItem,
        isSelected: false,
      }))
    );
  };

  const dropdownItemClickHandler = (dropdownItem) => {
    const clickItem = dropdownItemsDict.filter(
      (item) => item.id === dropdownItem.id
    )[0];

    clickItem["isSelected"] = !dropdownItem.isSelected;

    const allOther = dropdownItemsDict.filter(
      (item) => item.id !== dropdownItem.id
    );

    setDropdownItemsDict([...allOther, clickItem]);
  };

  useEffect(() => {
    preprocessing();
  }, []);
  return (
    <>
      <h1 className="field-name">sdddasd</h1>
      <ul className="field-values">
        <li className="nav-item has-dropdown">
          <a href="#">A</a>
          <ul className="dropdown">
            {dropdownItemsDict.map((dropdownItem) => {
              const { id, itemName, isSelected } = dropdownItem;
              return (
                <li key={id} className="dropdown-item">
                  <a
                    href="#"
                    onClick={() => dropdownItemClickHandler(dropdownItem)}
                  >
                    {itemName}
                  </a>
                  {isSelected && <CheckIcon />}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default MulSelectDropDown;
