import { useEffect, useState } from "react";
import "./filter-rows.css";

const FilterRows = () => {
  const headersData = ["name", "age", "date"];
  const rowsData = [
    {
      sno: 1,
      color: "#40c587",
      data: ["Prakhar", "20", "18-9-21"],
    },
    {
      sno: 2,
      color: "#5c8cdc",
      data: ["Akash", "24", "12-9-21"],
    },
    {
      sno: 3,
      color: "#9c7c64",
      data: ["Himesh", "50", "18-9-18"],
    },

    {
      sno: 4,
      color: "#40c587",
      data: ["Rajvardhan", "5", "1-9-18"],
    },
  ];

  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    setFilteredRows(rowsData);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredRows(
        rowsData.filter((row) =>
          row.data.some((d) => d.toLowerCase().includes(search.toLowerCase()))
        )
      );
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredRows(
        rowsData.sort((a, b) => {
          if (filter === 0) {
            return a.data[filter] <= b.data[filter];
          } else if (filter === 1) {
            return a.data[filter] - b.data[filter];
          } else {
            return a.data[filter] - b.data[filter];
          }
        })
      );
    }, 250);

    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div className="mainContainer">
      <div className="filterContainer">
        <div className="searchHeader">
          <input
            type="search"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter">
            <span>Filter:</span>
            <select onChange={(e) => setFilter(e.target.value)}>
              {headersData.map((headerName, idx) => (
                <option value={idx} key={headerName}>
                  {headerName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="tableContainer">
          <table id="itemsTable">
            <thead>
              <tr>
                {headersData.map((headerName) => (
                  <th key={headerName}>{headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.sno}>
                  {row.data.map((rowValue) => (
                    <td
                      key={rowValue}
                      style={{
                        borderLeftColor: row.color,
                      }}
                    >
                      {rowValue}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilterRows;
