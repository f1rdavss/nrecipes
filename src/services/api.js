import axiosInstance from "../libs/axios"

const recipesApi = {
    getAllRecipes(url) {
        return axiosInstance.get(url)
    },
    getAllRecipesTags(url) {
        return axiosInstance.get(url)
    },
    getRecipeByTag(url) {
        return axiosInstance.get(url)
    },
    getSearchRecipes(url) {
        return axiosInstance.get(url)
    },
    getSingleRecipe(url) {
        return axiosInstance.get(url)
    }
}

export default recipesApi