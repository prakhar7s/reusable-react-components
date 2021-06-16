import React, { useEffect, useState } from "react";

import "./word-search.css";

const WordSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const [paragraph, setParagraph] = useState(
    `Lorem ipsum dolor  consectetur adipisicing elit. Adipisci  soluta, eaque in neque rem repellendus, perspiciatis, magni totam odit  harum modi a hello hello ssumenda nisi qui impedit quam ratione consequatur  deserunt explicabo pariatur. Aperiam accusamus voluptas recusandae  necessitatibus magni adipisci et minus voluptates molestias id.  Exercitationem ut doloribus harum porro. Quam aliquam vero,  voluptatibus unde suscipit repudiandae accusantium nus ullam  distinctio nihil eos alias autem nostrum itaque commodi? Magni iste  doloremque ut, nemo temporibus voluptas tempora ipsum, rerum hello dicta  laboriosam culpa cupiditate recusandae reiciendis sse ab cumque  similique und  hello e a nulla asperiores! A suscipit velit sed a laudantium debitis 2a neque et corporis animi!`
  );

  const [filteredParagraph, setFilteredParagraph] = useState(paragraph);

  useEffect(() => {
    console.log(searchInput);

    const pattern = RegExp(searchInput);

    setFilteredParagraph(
      paragraph.replace(
        pattern,
        `<span class="highlight">${searchInput}</span>`
      )
    );
  }, [searchInput]);

  return (
    <div className="word-search-container">
      <div className="word-search">
        <header>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
          />
        </header>

        <div className="words-container">
          <div dangerouslySetInnerHTML={{ __html: filteredParagraph }} />
        </div>
      </div>
    </div>
  );
};
export default WordSearch;
