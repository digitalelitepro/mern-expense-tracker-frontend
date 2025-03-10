import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helpers";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/userContext";
import { LuFoldVertical } from "react-icons/lu";
import uploadImage from "../../utils/uploadImage";



const SignUp = () => {
  
  let profileImageUrl = ""
  // const [profilePic, setProfilePic] = useState(null);
  const [profilePic, setProfilePic] = useState("uploads/default.png");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const  {user, setUser} = useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!fullName){
      setError("Please, provide full name ")
      return;
    }
    if(!validateEmail(email)){
      setError('please provide a valid email')
      return;
    }

    if(!password){
      setError('Please provide a password')
      return ;
    }

    if(password.length < 6){
      setError('Your password must be in 8 characters at least')
    } 
    console.log({fullName, email, password, profilePic})

    try {

       if(profilePic){
          const imgUploadRes = await uploadImage(profilePic)
          profileImageUrl = imgUploadRes.data.data.imageUrl || ''
       }

       console.log(profileImageUrl)

        const response  = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl
        })

        console.log(response)

        if(response.data.success){
           const {token} = response.data.data
           setUser(response.data.data)
           localStorage.setItem('accessToken', token )
           console.log(response.data.data)
           navigate('/dashboard')
        }else{
          return ;
        }

    } catch (error) {
        if(error.response && error.response.data.message){ 
            setError(error.response.data.message)
        } 
    }
  };

  return <AuthLayout>

             <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-black">Create an account</h3>
                  <p className="text-xs text-slate-700 mt-[5px] mb-6">
                      Join us today y entering your details below
                  </p>

                  <form onSubmit={handleSubmit}>

                      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> 

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                           <Input  
                              value={fullName}
                              label="Your full name"
                              placeholder="Fullname"
                              onChange={({target}) => setFullName(target.value)}
                              type="text"
                           />
                           <Input  
                              value={email}
                              label="Email address"
                              placeholder="Email address"
                              onChange={({target}) => setEmail(target.value)}
                              type="text"
                           />
                         <div className="col-span-2">

                         <Input  
                              value={password}
                              label="Password"
                              placeholder="Password"
                              onChange={({target}) => setPassword(target.value)}
                              type="password"
                           />
                         </div>


                         {
                            error && <p className="text-xs text-red-400 my-2">{error}</p>
                         }
                         
                      </div>
                      <button className="btn-primary"> Sign Up</button>
                      <p className="text-xs mt-3">
                        Already registered ? <Link to="/login" className="text-purple-400 font-semibold underline"> Sign in</Link>
                      </p>

                  </form>
             </div>
  </AuthLayout>
};

export default SignUp;
