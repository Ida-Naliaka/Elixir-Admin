import { publicRequest } from "../requestMethods";


export const verifyUser = async(code) => {
 await publicRequest.get(`/auth/admin/${code}`).then((response) => {
        return response.data;
})
};