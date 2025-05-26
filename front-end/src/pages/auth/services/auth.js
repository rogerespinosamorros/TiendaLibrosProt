import instance from '../../../../environment/axiosInstance';

export const signup = async (signupDto) => {
    try {
        const response = await instance.post('api/auth/signup', signupDto)
        return response
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; 
    }
};