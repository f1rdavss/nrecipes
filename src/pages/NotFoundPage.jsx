import React from "react";
import notFound from "../assets/img/not-found.webp";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notFound">
      <h2 className="notFound__title">Not found page</h2>
      <p className="notFound__txt">Sorry, we couldn't find the page</p>
      <img src={notFound} alt="not found page" className="notFound__image" />
      <Link to="/">
        <Button label="Home" />
      </Link>
    </div>
  );
};

export default NotFoundPage;
