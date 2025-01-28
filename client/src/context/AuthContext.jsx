import { createContext, useCallback, useState } from "react";
import { postRequest } from "../utils/services";
import { baseModelName } from "../../../server/Models/userModel";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

const [user, setUser] = useState(null);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
const [registerError, setRegisterError] = useState(null);
const [isRegisterLoading, setIsRegisterLoading] = useState(false);
const [registerInfo, setRegisterInfo] = useState({
    name:"",
    email:"",
    password:"",
});


console.log("registerInfo", registerInfo)
const baseUrl = "http://localhost:5000/api";


const updateRegisterInfo = useCallback((info) => {
      setRegisterInfo(info);
}, []);


    const registerUser = useCallback( async () => {
        setIsRegisterLoading(true)
        setRegisterError(null)

    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo)
    );

         setIsRegisterLoading(false)

        if (response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response) )
        setUser(response)
     }, []);

    return (
        <AuthContext.Provider value = {{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
        }}
        >
            { children }
        </AuthContext.Provider>
        
    )
}