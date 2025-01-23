import React from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import "./App.css";

import Book from "./Components/Book";

function App() {
  const [buku, setBuku] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filteredBuku, setFilteredBuku] = React.useState([]);

  React.useEffect(() => {
    const fetchBuku = async () => {
      try {
        const res = await axios.get("http://localhost:8800/buku");
        setBuku(res.data);
        setFilteredBuku(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBuku();
  }, []);

  console.log(filteredBuku);

  const changeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0) {
      // Reset to the full list when the input is empty
      setFilteredBuku(buku);
    } else {
      // Filter the books based on the search value
      const filteredSearch = buku.filter((buku) =>
        buku.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBuku(filteredSearch);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="search-container">
          <h1>
            Search for the <span>books</span> you want
          </h1>
          <input
            type="search"
            onChange={changeHandler}
            name="search"
            value={search}
          />
        </div>
        <div className="books-container">
          {filteredBuku.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              description={book.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
