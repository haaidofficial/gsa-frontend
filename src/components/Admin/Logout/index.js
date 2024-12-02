import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login page
        router.push("/admin/login");
    };

    return (
        <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
                <img src="/assets/icons/logout.png" width={30} height={30} alt="Logout" />
            </IconButton>
        </Tooltip>
    );
};

export default LogoutButton;
