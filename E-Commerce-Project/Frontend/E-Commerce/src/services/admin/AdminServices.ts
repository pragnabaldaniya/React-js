import axios from "axios";
import type { adminForm } from "../../Pages/Admin/AddAdminPage";
import type { adminEditForm } from "../../Pages/Admin/EditAdminPage";

const BASE_URL = "http://localhost:8000/api/admin";
const AUTH_ADD_ADMIN = "http://localhost:8000/api/auth/admin/register";

export const getAuthToken = () => {
    return localStorage.getItem('authAdminToken') || "";
}


export const fetchAllAdmin = async () => {
    try {


        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch All Admin Failed");
        console.log("Error : ", error);
    }
}

// Add Admin API
export const addAdmin = async (body: adminForm) => {
    try {

        console.log("Profile Image:", body.profile_image);

        const formData = new FormData();
        formData.append('first_name', body.first_name);
        formData.append('last_name', body.last_name);
        formData.append('email', body.email);
        formData.append('password', body.password);
        formData.append('phone', body.phone);

        if (body.profile_image) {
            formData.append('profile_image', body.profile_image);
        }

        const res = await axios.post(AUTH_ADD_ADMIN,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            }
        );

        console.log("Response :", res.data);
        return res.data;

    } catch (error: any) {
        console.log("Add Admin Failed");
        console.log("Error :", error);
        console.log("Response :", error.response?.data);

        throw error;
    }
}

// Delete singal Admin
export const deleteSingleAdmin = async (id: string) => {
    try {


        const res = await axios.delete(BASE_URL + `?id=${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch All Admin Failed");
        console.log("Error : ", error);
    }
}

// fetch single admin
export const fetchSingleAdmin = async (id: string) => {
    try {


        const res = await axios.get(BASE_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch Single Admin Failed");
        console.log("Error : ", error);
    }
}

// Update admin
export const updateAdmin = async (body: adminEditForm) => {
    try {

        const formData = new FormData();

        formData.append('first_name', body.first_name);
        formData.append('last_name', body.last_name);
        formData.append('email', body.email);
        formData.append('phone', body.phone);

        console.log("Type : ", typeof body.profile_image);

        if (typeof (body.profile_image) !== "string") {
            formData.append('profile_image', body.profile_image);
        }

        const res = await axios.patch(BASE_URL + `/${body._id}`,
            formData,

            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Update Admin Failed");
        console.log("Error : ", error);
    }
}

// Active InActive Api logic
export const adminActiveOrInactive = async (id: string) => {
    try {


        const res = await axios.put(BASE_URL + `?id=${id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Active Or Inactive Admin Failed");
        console.log("Error : ", error);
    }
}