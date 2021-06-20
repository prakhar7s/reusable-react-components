import React, { useEffect, useState } from "react";

import "./mul-select-drop-down.css";
import uuid from "uuid/v1";

import CheckIcon from "@material-ui/icons/Check";

const MulSelectDropDown = ({ dropdownItems, dropdownName, howManySelects }) => {
  const [dropdownItemsDict, setDropdownItemsDict] = useState([]);
  const [currentSelectsCount, setCurrentSelectsCount] = useState(0);
  const [displayDrodown, setDisplayDropdown] = useState("none");
  const [searchInp, setSearchInp] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  // preprocessing
  /*
    1. create dictionary of menu items with 3 properties
  */
  const preprocessing = () => {
    const dropdownItemsTemp = dropdownItems.map((dropdownItem) => ({
      id: uuid(),
      itemName: dropdownItem,
      isSelected: false,
    }));
    setDropdownItemsDict(dropdownItemsTemp);

    setSearchItems(dropdownItemsTemp);
  };

  const dropdownItemClickHandler = (dropdownItem) => {
    if (currentSelectsCount === howManySelects && !dropdownItem.isSelected) {
      return;
    }

    const elementsIndex = dropdownItemsDict.findIndex(
      (element) => element.id == dropdownItem.id
    );

    let newArray = [...dropdownItemsDict];

    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      isSelected: !newArray[elementsIndex].isSelected,
    };

    setDropdownItemsDict(newArray);

    if (dropdownItem.isSelected) {
      setCurrentSelectsCount((prev) => prev - 1);
    } else {
      setCurrentSelectsCount((prev) => prev + 1);
    }
  };

  const updateSearchItems = (search) => {
    setSearchItems(
      dropdownItemsDict.filter((item) =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    updateSearchItems(searchInp);
  }, [searchInp]);

  useEffect(() => {
    updateSearchItems(searchInp);
  }, [dropdownItemsDict]);

  useEffect(() => {
    preprocessing();
  }, []);
  return (
    <>
      <div className="dropdown-menu-container">
        <div
          className="overlay"
          style={{ display: displayDrodown }}
          onClick={() => setDisplayDropdown("none")}
        ></div>

        <h3
          onClick={() => setDisplayDropdown("block")}
          className="dropdown-heading"
        >
          {dropdownName}
        </h3>
        <ul style={{ display: displayDrodown }} className="dropdown">
          <div className="dropdown-header">
            <input
              type="text"
              placeholder="Search options..."
              value={searchInp}
              onChange={(e) => setSearchInp(e.target.value)}
            />
          </div>
          {searchItems.map((dropdownItem) => {
            const { id, itemName, isSelected } = dropdownItem;
            return (
              <li key={id} className="dropdown-item">
                <span onClick={() => dropdownItemClickHandler(dropdownItem)}>
                  {itemName}
                </span>
                {isSelected && <CheckIcon />}
              </li>
            );
          })}

          {searchItems.length === 0 && <p className="note-line">No options</p>}
        </ul>
      </div>
    </>
  );
};

export default MulSelectDropDown;
