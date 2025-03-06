import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/cart";

function ProductsDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart ,setCart] = useCart()

  // Fetch product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // Fetch similar products when the product state is updated
  useEffect(() => {
    if (product?._id && product?.category?._id) {
      getSimilarProduct(product._id, product.category._id);
    }
  }, [product]); // Runs only when `product` changes

  // Function to get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Function to get related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row mt-4">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products Found</p>}
        <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">{p.price}</p>
                  
                  <button className="btn btn-secondary ms-1"
                   onClick={() => {
                    setCart([...cart, p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Item added Succesfully");
                    }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
}

export default ProductsDetails;
