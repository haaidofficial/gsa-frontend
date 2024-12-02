import ProductList from "@/components/Admin/ProductsList";
import protectedRoute from "@/components/hoc/protectedRoute";

const Dashboard = () => {

    return (
        <>
            <ProductList />
        </>
    )
}

export default protectedRoute(Dashboard)