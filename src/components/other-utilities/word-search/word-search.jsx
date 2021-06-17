import React, { useEffect, useState } from "react";

import "./word-search.css";

const WordSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const [paragraph, setParagraph] = useState(
    `Lorem ipsum dolor  consectetur adipisicing elit. Adipisci  soluta, eaque in neque rem repellendus, perspiciatis, magni totam odit  harum modi a hello hello ssumenda nisi qui impedit quam ratione consequatur  deserunt explicabo pariatur. Aperiam accusamus voluptas recusandae  necessitatibus magni adipisci et minus voluptates molestias id.  Exercitationem ut doloribus harum porro. Quam aliquam vero,  voluptatibus unde suscipit repudiandae accusantium nus ullam  distinctio nihil eos alias autem nostrum itaque commodi? Magni iste  doloremque ut, nemo temporibus voluptas tempora ipsum, rerum hello dicta  laboriosam culpa cupiditate recusandae reiciendis sse ab cumque  similique und  hello e a nulla asperiores! A suscipit velit sed a laudantium debitis 2a neque et corporis animi!`
  );

  const [filteredParagraph, setFilteredParagraph] = useState(paragraph);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setFilteredParagraph(paragraph);
  }, [paragraph]);

  useEffect(() => {
    setFilteredParagraph(
      paragraph
        .toLowerCase()
        .split(searchInput.toLowerCase())
        .join(`<span class="highlight">${searchInput}</span>`)
    );
  }, [searchInput]);

  return (
    <div className="word-search-container">
      <div className="word-search">
        <header>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Type something....."
          />
        </header>

        {!editMode && (
          <div
            className="words-container"
            onClick={() => {
              setEditMode(true);
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: filteredParagraph }} />
          </div>
        )}

        {editMode && (
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            type="text"
            id="user-text"
          ></textarea>
        )}
      </div>

      <button onClick={() => setEditMode(false)}>s</button>
    </div>
  );
};
export default WordSearch;
