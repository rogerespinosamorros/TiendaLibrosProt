import instance from "../../../environment/axiosInstance";

export const getBooks = async () => {
    try {
        const response = await instance.get(`/api/customer/book`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const searchBook = async (genre) => {
    try {
        const response = await instance.get(`/api/customer/book/search/${genre}`);
        return response;
    } catch (error) {
        throw error;
    }
}