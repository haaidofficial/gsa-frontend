import AddProductComp from "@/components/Admin/AddProduct";
import protectedRoute from "@/components/hoc/protectedRoute";


const AddProduct = () => {

    return (
        <>
            <AddProductComp />
        </>
    )
}

export default protectedRoute(AddProduct)