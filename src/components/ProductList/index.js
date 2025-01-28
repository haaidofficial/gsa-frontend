import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './ProductList.module.css';
import axios from "axios";
import Link from "next/link";

const colors = ["#000", "#808080", "#008080", "#004aad", "#004aad"];

const ProductList = () => {

    const [otherProducts, setOtherProducts] = useState([]);

    useEffect(() => {
        fetchProductsNavigation();
    }, []);

    const fetchProductsNavigation = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}${Endpoints.GetProductsNavigation}?skip=${0}&limit=${10}`
            );

            if (response.data) {
                setOtherProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <>
            {
                (otherProducts?.length > 0) &&
                <Typography
                    variant="h2"
                    sx={{
                        color: "#004aad",
                        marginBottom: "1.5rem",
                    }}
                    className={styles.productHead}
                >
                    Products
                </Typography>
            }


            <List className={`${(otherProducts?.length > 8) ? styles.productsScroller : ''}`}>
                {otherProducts?.slice(0, 8)?.map((item, index) => (
                    <Link className={styles.productsList} href={`/products/${item.pageUrl}`} key={index} passHref>
                        <ListItem
                            sx={{
                                // backgroundColor: colors[index % colors.length],
                                backgroundColor: '#26A69A',
                                color: 'white',
                                marginBottom: "0.5rem",
                                borderRadius: "5px",
                                padding: '10px',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease, color 0.3s ease',
                                '&:hover': {
                                    color: 'white',
                                },
                                '&:before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'left',
                                    transition: 'transform 0.4s ease',
                                },
                                '&:hover:before': {
                                    transform: 'scaleX(1)',
                                },
                            }}
                        // className={styles.productListText}
                        >
                            <Typography variant="h6" component="div" className={styles.titleTxt}>
                                {item.title}
                            </Typography>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    )
}

export default ProductList;