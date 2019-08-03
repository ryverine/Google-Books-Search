import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function ResultList({ children }) {
  return (
    <div>
        <h3>Search Results</h3>
        <div className="result-overflow-container">
        <ul className="result-group">{children}</ul>
        </div>
    </div>
  );
}

export function ResultItem(props) {
  return (<li className="result-group-item">
      <div>
      {props.children}
        <img src={props.image} />
        Title: {props.title} <br />
        Author: {props.author} <br />
        {props.description} <br />
        <a href={props.link}>{props.link}</a>
      </div>
  </li>);
}
