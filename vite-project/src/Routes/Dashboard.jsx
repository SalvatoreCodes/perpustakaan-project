import React from "react";
import axios from "axios";
import editIcon from "../Assets/Icons/edit.png";

function Dashboard() {
  const [buku, setBuku] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  const [deletePopup, setDeletePopup] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [buttonIndex, setButtonIndex] = React.useState(0);

  const buttons = [
    { header: "Edit Buku" },
    { header: "Add Buku" },
    { header: "Add Users" },
  ];

  React.useEffect(() => {
    const fetchBuku = async () => {
      try {
        const res = await axios.get("http://localhost:8800/buku");
        setBuku(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBuku();
    fetchUsers();
  }, []);

  const BukuPopup = () => {
    const [bukuData, setBukuData] = React.useState({
      cover: "",
      title: "",
      description: "",
    });

    const [userData, setUserData] = React.useState({
      name: "",
      username: "",
      password: "",
      is_admin: 0,
    });

    const clickHandler = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("cover", bukuData.cover);
      formData.append("title", bukuData.title);
      formData.append("description", bukuData.description);

      try {
        await axios.post("http://localhost:8800/buku", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setBuku((prev) => [...prev, bukuData]);
      } catch (err) {
        console.log(err);
      }
    };

    const inputHandler = (e) => {
      if (buttonIndex === 1) {
        setBukuData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(bukuData);
      } else if (buttonIndex === 2) {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };

    React.useEffect(() => {
      if (buttonIndex === 0) {
        document.getElementById("add-buku-popup").style.display = "none";
        document.getElementById("add-user-popup").style.display = "none";
      } else if (buttonIndex === 1) {
        document.getElementById("edit-popup").style.display = "none";
        document.getElementById("add-user-popup").style.display = "none";
      } else if (buttonIndex === 2) {
        document.getElementById("edit-popup").style.display = "none";
        document.getElementById("add-buku-popup").style.display = "none";
      }
    }, []);

    return (
      <div className="buku-popup">
        <div
          className="buku-popup-background"
          onClick={() => setPopup(false)}
        ></div>
        <div className="buku-popup-content">
          <div className="buku-popup-header">
            <h1>{buttons[buttonIndex].header}</h1>
            <button onClick={() => setPopup(false)}>X</button>
          </div>
          <section>
            <div className="edit-popup" id="edit-popup">
              <h1>Edit</h1>
            </div>
            <div className="add-popup" id="add-buku-popup">
              <form
                action="/buku"
                method="post"
                encType="multipart/form-data"
                onSubmit={clickHandler}
              >
                <h3>Cover</h3>
                <input type="file" name="cover" onChange={inputHandler} />
                <h3>Title</h3>
                <input type="text" name="title" onChange={inputHandler} />
                <h3>Description</h3>
                <input type="text" name="description" onChange={inputHandler} />
                <input type="submit" value="Submit" className="submit-button" />
              </form>
            </div>
            <div className="add-popup" id="add-user-popup">
              <h3>Name</h3>
              <input type="text" name="name" onChange={inputHandler} />
              <h3>Username</h3>
              <input type="text" name="username" onChange={inputHandler} />
              <h3>password</h3>
              <input type="text" name="password" onChange={inputHandler} />
              <button onClick={clickHandler}>Submit</button>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const DeletePopup = () => {
    const deleteHandler = async (e) => {
      e.preventDefault();
      try {
        if (buttonIndex === 1) {
          await axios.delete("http://localhost:8800/buku/" + deleteId);
          setBuku((prev) => prev.filter((buku) => buku.id !== deleteId));
        } else if (buttonIndex === 2) {
          await axios.delete("http://localhost:8800/users/" + deleteId);
          setUsers((prev) => prev.filter((user) => user.id !== deleteId));
        } else if (buttonIndex === 3) {
          alert("Unable to delete Admin");
        }
        setDeletePopup(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="delete-popup">
        <div className="delete-popup-content">
          <div className="delete-popup-header">
            <h1>Are you sure?</h1>
          </div>
          <section className="delete-popup-buttons">
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={() => setDeletePopup(false)}>Cancel</button>
          </section>
        </div>
      </div>
    );
  };

  const clickHandler = (e) => {
    if (e.target.name === "edit") {
      setButtonIndex(0);
    } else if (e.target.name === "add-buku") {
      setButtonIndex(1);
    } else if (e.target.name === "add-users") {
      setButtonIndex(2);
    }
    setPopup(true);
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
            {buku.map((buku) => (
              <div className="dashboard-buku" key={buku.id}>
                <h5>{buku.title}</h5>
                <div className="dashboard-buku-controls">
                  <button onClick={clickHandler} name="edit">
                    <img src={editIcon} alt="edit icon" name="edit" />
                  </button>
                  <button
                    onClick={() => {
                      setButtonIndex(1);
                      setDeletePopup(!deletePopup);
                      setDeleteId(buku.id);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="add-buku-button"
            name="add-buku"
            onClick={clickHandler}
          >
            Add Buku
          </button>
        </div>
        <div className="users-container">
          <div className="users-header">
            <h3>Users</h3>
          </div>
          <div className="users-data">
            {users.map((user) => (
              <div className="dashboard-users" key={user.id}>
                {user.is_admin ? (
                  <h5>
                    {user.name}
                    <p>ADMIN</p>
                  </h5>
                ) : (
                  <h5>{user.name}</h5>
                )}
                <div className="dashboard-users-controls">
                  <button onClick={clickHandler} name="edit">
                    <img src={editIcon} alt="edit icon" name="edit" />
                  </button>
                  <button
                    onClick={() => {
                      if (user.is_admin === 1) {
                        setButtonIndex(3);
                      } else {
                        setButtonIndex(2);
                      }
                      setDeletePopup(!deletePopup);
                      setDeleteId(user.id);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <button
              className="add-users-button"
              name="add-users"
              onClick={clickHandler}
            >
              Add Users
            </button>
          </div>
        </div>
      </div>
      {popup ? <BukuPopup /> : ""}
      {deletePopup ? <DeletePopup id={setDeleteId} /> : ""}
    </div>
  );
}

export default Dashboard;
