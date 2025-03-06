import React from "react";
import { useSearch } from "../Context/search";
import Layout from "../Components/Layout/Layout";

function Search() {
  const [values] = useSearch();

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center">Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No products Found"
            : `Found ${values?.results.length} products`}
        </h6>
        
        <div className="d-flex flex-wrap">
          {values?.results.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">Price: ${p.price}</p>
                <button className="btn btn-primary ms-1">More Details</button>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Search;
