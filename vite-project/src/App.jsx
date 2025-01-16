import React from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import "./App.css";

import Book from "./Components/Book";

function App() {
  const [buku, setBuku] = React.useState([]);

  React.useEffect(() => {
    const fetchBuku = async () => {
      try {
        const res = await axios.get("http://localhost:8800/buku");
        setBuku(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBuku();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="search-container">
          <h1>
            Search for the <span>books</span> you want
          </h1>
          <input type="search" />
        </div>
        <div className="books-container">
          {buku.map((book, index) => (
            <Book
              key={index}
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
