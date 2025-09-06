import toast from "react-hot-toast";
import api from "../api/apiInstance";

async function flipFavorite(setIsFavorited, recipeId) {
    setIsFavorited(prevFav => !prevFav);
    try {
        await api.patch("/recipes/favorite", {
            recipeId: recipeId
        })
    } catch (error) {
        toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
    }
}

export default flipFavorite;