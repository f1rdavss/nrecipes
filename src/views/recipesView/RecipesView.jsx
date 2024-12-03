import React, { useEffect, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import recipesApi from "../../services/api";
import "./recipesView.scss";
import Card from "../../components/card/Card";
import Error from "../../components/error/Error";
import { useDebounce } from "primereact/hooks";
import { Paginator } from "primereact/paginator";
import noFoodFound from "../../assets/img/empty.webp";

const testArr = Array(8).fill(0);

const RecipesView = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, debouncedValue, setKeyword] = useDebounce("", 500);
  const [total, setTotal] = useState(0);
  const [first, setFirst] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const getAllRecipes = async (offset = 0) => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getAllRecipes(
        `?limit=12&skip=${offset}&select=name,image,mealType,rating,tags,reviewCount&delay=500`
      );
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSearchRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getSearchRecipes(
        `/search?q=${keyword}&limit=12&select=name,image,mealType,rating,tags,reviewCount&delay=500`
      );
      setRecipes(data.recipes);
      setTotal(data.total);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRecipes(first);
  }, [first]);

  useEffect(() => {
    getSearchRecipes();
  }, [debouncedValue]);

  return (
    <section className="recipes">
      <div className="container">
        <div className="recipes__top">
          <h2 className="recipes__top-title title">Recipes</h2>
          {debouncedValue && (
            <p className="recipes__top-count">
              On request "{debouncedValue}", total results {total}
            </p>
          )}
          <IconField className="recipes__top-input">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText
              placeholder="Search recipes"
              onChange={(event) => setKeyword(event.target.value)}
            />
          </IconField>
        </div>
        {error && <Error message={error} />}
        {!total && !loading && (
          <div className="emptyImage">
            <img
              src={noFoodFound}
              alt="no food found"
              width="300"
              loading="lazy"
            />
          </div>
        )}
        <div className="recipes__cards cards">
          {loading &&
            testArr.map((_, index) => <Card key={index} loading={loading} />)}
          {recipes?.map((item) => (
            <Card key={item.id} info={item} loading={loading} />
          ))}
        </div>
        {total > 12 && (
          <Paginator
            first={first}
            rows={12}
            totalRecords={total}
            onPageChange={onPageChange}
            className="recipes__paginator"
          />
        )}
      </div>
    </section>
  );
};

export default RecipesView;
