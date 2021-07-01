import "./App.css";
// import Card from "./components/other-utilities/card/card";
// import CircularProgressBar from "./components/other-utilities/circular-progress-bar/circular-progress-bar";
import FilterRows from "./components/other-utilities/filter-rows/filter-rows";
// import RangeSlider from "./components/other-utilities/range-slider/range-slider";
// import MulSelectDropDown from "./components/other-utilities/mul-select-drop-down/mul-select-drop-down";
// import WordSearch from "./components/other-utilities/word-search/word-search";
// import MobileNumberVerification from "./components/firebase-services/mobile-number-verification";

function App() {
  return (
    <div className="App">
      {/* <MobileNumberVerification /> */}
      {/* <WordSearch /> */}
      {/* <MulSelectDropDown
        dropdownName="cities"
        dropdownItems={["Mumbai", "Banglore", "Chennai", "Hydrabad"]}
        howManySelects={3}
      /> */}
      {/* <RangeSlider /> */}
      {/* <Card /> */}
      {/* <CircularProgressBar /> */}
      <FilterRows />
    </div>
  );
}

export default App;
