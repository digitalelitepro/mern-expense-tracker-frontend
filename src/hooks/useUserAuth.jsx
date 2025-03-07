import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/userContext"
import { useEffect } from "react"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const useUserAuth = () => {
    const { user , setUser } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {

           if(user) return ;
           
        let isMounted = true
        
        const fetchUserInfo = async () => {
            try {

                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                console.log('-----------------useUserAuth--------------------')
                console.log(response.data)
                console.log(response.data.data.user)
                console.log('------------------------------------------------')
                if(isMounted && response.data.data.user){
                    setUser(response.data.data.user)
                }
                
            } catch (error) {
                console.log(error.message)
                if(isMounted){
                    setUser(null)
                    navigate('/login') //77 518 88 64   // 
                }
            }
        } // End

        fetchUserInfo()

        return () => {
            isMounted = false
        }


    },[setUser, navigate])

}