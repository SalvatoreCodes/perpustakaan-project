import React from "react";
import axios from "axios";
import editIcon from "../Assets/Icons/edit.png";

function Dashboard() {
  const [buku, setBuku] = React.useState([]);
  const [editBuku, setEditBuku] = React.useState(true);
  const [editAdd, setEditAdd] = React.useState(true);

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

  const BukuPopup = () => {
    const [bukuData, setBukuData] = React.useState({
      cover: "",
      title: "",
      description: "",
    });

    const changeHandler = (e) => {
      setBukuData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const clickHandler = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8800/buku", bukuData);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="buku-popup">
        <div
          className="buku-popup-background"
          onClick={() => setEditBuku(!editBuku)}
        ></div>
        <div className="buku-popup-content">
          <div className="buku-popup-header">
            <h1>{editAdd ? "Edit Buku" : "Add Buku"}</h1>
            <button onClick={() => setEditBuku(!editBuku)}>X</button>
          </div>
          <section>
            {editAdd ? (
              <div className="edit-popup">
                <h1>Edit</h1>
              </div>
            ) : (
              <div className="add-popup">
                <h3>Cover</h3>
                <input type="text" name="cover" onChange={changeHandler} />
                <h3>Title</h3>
                <input type="text" name="title" onChange={changeHandler} />
                <h3>Description</h3>
                <input
                  type="text"
                  name="description"
                  onChange={changeHandler}
                />
                <button onClick={clickHandler}>Submit</button>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  };

  const clickHandler = (e) => {
    setEditBuku(!editBuku);
    if (e.target.name === "edit") {
      setEditAdd(true);
    } else if (e.target.name === "add") {
      setEditAdd(false);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>
      <div className="data-container">
        <div className="buku-container">
          <div className="buku-header">
            <h3>Buku</h3>
          </div>
          <div className="buku-data">
            {buku.map((book, index) => (
              <div className="dashboard-buku" key={index}>
                <h5>{book.title}</h5>
                <div className="dashboard-buku-controls">
                  <button onClick={clickHandler} name="edit">
                    <img src={editIcon} alt="edit icon" name="edit" />
                  </button>
                  <button>-</button>
                </div>
              </div>
            ))}
          </div>
          <button className="add-buku-button" name="add" onClick={clickHandler}>
            Add Buku
          </button>
        </div>
        <div className="users-container">
          <div className="users-header">
            <h3>Users</h3>
          </div>
          <div className="users-data"></div>
        </div>
      </div>
      {editBuku ? "" : <BukuPopup />}
    </div>
  );
}

export default Dashboard;
