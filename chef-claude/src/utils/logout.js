import toast from "react-hot-toast";
import api from "../api/apiInstance";

async function logout(navigate) {
    try {
      await api.delete("/auth/delete_token");
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out. Please try again later.")
    }
  }

export default logout;