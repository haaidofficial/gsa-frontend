import EditProductComp from "@/components/Admin/EditProduct";
import protectedRoute from "@/components/hoc/protectedRoute";


const EditProduct = () => {

    return (
        <>
            <EditProductComp />
        </>
    )
}

// export default EditProduct
export default protectedRoute(EditProduct)