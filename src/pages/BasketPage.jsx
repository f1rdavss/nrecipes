import React from "react";
import Card from "../components/card/Card";

const BasketPage = () => {
  const basketList = localStorage.basketList
    ? JSON.parse(localStorage.basketList)
    : [];
  return (
    <main>
      <section className="basket">
        <div className="container">
          <h2 className="basket__title title">Basket</h2>
          <div className="basket__cards cards">
            {basketList.map((item) => (
              <Card key={item.id} info={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BasketPage;
