import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const limit = 10;

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(data.slice(0, limit));

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const handlePagination = (direction) => {
    if (direction === "previous" && offset > 0) {
      setOffset(offset - limit);
    }

    if (direction === "next" && offset + limit < filteredData.length) {
      setOffset(offset + limit);
    }
  };

  const filterTags = (searchTerm) => {
    const term = searchTerm.toLowerCase().trim();

    if (term === "") {
      setFilteredData(data);
      setOffset(0);
      return;
    }

    const results = data.filter((product) =>
      product.tags?.some((tag) =>
        tag.title?.toLowerCase().includes(term)
      )
    );

    setFilteredData(results);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination("previous")}
          disabled={offset === 0}
        />

        <Button
          text="Next"
          handleClick={() => handlePagination("next")}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;