import React from "react";
import { Link } from "react-router-dom";
import { Image } from "primereact/image";
import { Skeleton } from "primereact/skeleton";
import "./card.scss";

const Card = ({ info, loading }) => {
  return (
    <div className="card" data-rating={info ? info.rating : "??"}>
      {loading && <Skeleton width="100%" height="300px"></Skeleton>}
      {!loading && (
        <Image
          preview
          src={info.image}
          alt={info.name}
          className="card__image"
          loading="lazy"
        />
      )}
      {loading && <Skeleton width="100%" height="20px"></Skeleton>}
      {!loading && (
        <h3 className="card__title">
          <Link to={`/recipe/${info.id}`} className="card__title-link">
            {info.name}
          </Link>
        </h3>
      )}
      {loading && <Skeleton width="60%" height="20px"></Skeleton>}
      {!loading && (
        <ul className="card__tags">
          {info.tags.map((item) => (
            <li className="card__tags-item" key={item}>
              <Link to={`/categories?name=${item}`} className="card__tags-link">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {loading && <Skeleton width="25%" height="20px"></Skeleton>}
      {!loading && (
        <span className="card__review">
          <i className="pi pi-eye"></i> {info.reviewCount} views
        </span>
      )}
      {!loading && (
        <ul className="card__mealType">
          {info.mealType.map((item) => (
            <li className="card__mealType-item" key={item}>
              <Link className="card__mealType-link">{item}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
