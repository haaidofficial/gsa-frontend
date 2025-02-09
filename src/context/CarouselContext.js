import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, Endpoints } from "@/constants/apiEndpoints";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadMessage, setLoadMessage] = useState('');

    const fetchCarousels = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}${Endpoints.GetCarousels}`);

            if (response.status === 200 && response.data?.success) {
                if (response.data?.slides) {
                    if (response.data?.slides?.length > 0) {
                        const mappedData = response.data.slides.map((image, index) => ({
                            title: `Slide ${index + 1}`, // You can customize the title logic
                            image: `${BASE_URL}${image}`, // Full image path
                        }));

                        setCarouselData(mappedData);
                    }
                    else {
                        setLoadMessage('No Slides Found!')
                    }
                }
                else {
                    setLoadMessage('No Slides Found!')
                }

            }
            else {
                setLoadMessage('No Slides Found!')
            }
        } catch (error) {
            console.error("Error fetching carousel data:", error.response?.data || error.message);
            setLoadMessage('No Slides Found!')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarousels();
    }, []);

    return (
        <CarouselContext.Provider value={{ carouselData, loading, loadMessage }}>
            {children}
        </CarouselContext.Provider>
    );
};

export const useCarousel = () => {
    return useContext(CarouselContext);
};
