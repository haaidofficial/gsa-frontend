import EnquiriesComp from "@/components/Admin/Enquiries";
import protectedRoute from "@/components/hoc/protectedRoute";

const Enquiries = () => {

    return (
        <>
            <EnquiriesComp />
        </>
    )
}

export default protectedRoute(Enquiries)