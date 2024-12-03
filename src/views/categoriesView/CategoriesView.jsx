import { Dropdown } from "primereact/dropdown";
import "./categoriesView.scss";
import { useEffect, useState } from "react";
import recipesApi from "../../services/api";
import Card from "../../components/card/Card";
import Error from "../../components/error/Error";
import noFoodFound from "../../assets/img/empty.webp";
import { useDebounce } from "primereact/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const testArr = Array(8).fill(0);

const CategoriesView = () => {
  const [selectedTag, debouncedValue, setSelectedTag] = useDebounce(null, 500);
  const [tags, setTags] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const getAllRecipesTags = async () => {
    try {
      const { data } = await recipesApi.getAllRecipesTags("/tags");
      setTags(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRecipeByTag = async (cuisene) => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getRecipeByTag(
        `/tag/${cuisene}?select=name,image,mealType,rating,tags,reviewCount`
      );
      setCategory(data.recipes);
      setTotal(data.total);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRecipesTags();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name) {
      setSelectedTag(name);
    } else {
      getRecipeByTag("Asian");
    }
  }, [navigate, location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (selectedTag) {
      params.set("name", debouncedValue);
      getRecipeByTag(debouncedValue);
      navigate(`?${params.toString()}`);
    }
  }, [debouncedValue]);

  return (
    <section className="categories">
      <div className="container">
        <div className="categories__top">
          <h2 className="categories__title title">Category {debouncedValue}</h2>
          <Dropdown
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.value)}
            options={tags}
            placeholder="Select a category"
            editable
            disabled={error}
          />
        </div>
        {error && <Error message={error} />}
        {!total && !loading && (
          <div className="emptyImage">
            <img
              src={noFoodFound}
              alt="no food found"
              loading="lazy"
              width="300"
            />
          </div>
        )}
        <div className="categories__cards cards">
          {loading &&
            testArr.map((_, index) => <Card key={index} loading={loading} />)}
          {category?.map((item) => (
            <Card info={item} key={item.id} loading={loading} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesView;
