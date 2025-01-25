import React from "react";

function Book(props) {
  return (
    <div className="book-card" key={props.id}>
      <img
        src="https://images.unsplash.com/photo-1529590003495-b2646e2718bf?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Book Image"
      />
      <div className="book-content">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function textParser(text, length) {
  let description = "";
  if (text.length > length) {
    for (let i = 0; i < length; i++) {
      description += text[i];
    }
  } else {
    return text;
  }
  return description + "...";
}

export default Book;
