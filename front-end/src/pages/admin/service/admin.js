import instance from "../../../environment/axiosInstance";

export const postBook = async (bookDto) => {
    try {
        const response = await instance.post(`/api/admin/books`, bookDto);
        return response;
    }catch (error) {
        throw error;
    }
}