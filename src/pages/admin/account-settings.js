import AccountSettingsComp from "@/components/Admin/AccountSettings";
import protectedRoute from "@/components/hoc/protectedRoute";

function AccountSettings(params) {
    return (
        <>
            <AccountSettingsComp />
        </>
    )
}

export default protectedRoute(AccountSettings);
