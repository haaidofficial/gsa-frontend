import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import axios from "axios";
import React from "react";
import ProductComp from "@/components/Product";

const Product = ({ product }) => {

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <ProductComp product={product}/>
       
    );
};
// Update the import paths based on your project structure

export async function getServerSideProps(context) {
    const { productUrl } = context.params;

    try {
        const res = await axios.get(`${BASE_URL}${Endpoints.GetProductByPageUrl}/${productUrl}`);

        if (res.status !== 200 || !res.data) {
            return {
                notFound: true,
            };
        }

        const product = res.data;

        return {
            props: { product }, // Pass product data to the page
        };
    } catch (error) {
        console.error("Error fetching product data:", error.message);

        // Optionally handle different error types (e.g., 404 vs 500)
        if (error.response && error.response.status === 404) {
            return {
                notFound: true,
            };
        }

        return {
            props: { product: null }, // Handle errors gracefully
        };
    }
}


export default Product;
