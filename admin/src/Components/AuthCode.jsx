import axios from "axios";

export const verifyUser = async(code) => {
 await axios.get(`/api/auth/admin/${code}`).then((response) => {
        return response.data;
})
};