import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL, Google_Client_Id } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Loader } from "../components/Loader";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


// export function Signin() {
//     const usernameRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     const navigate = useNavigate();
//     const { isLoggedIn, setIsLoggedIn } = useAuth();
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         if (isLoggedIn) {
//             navigate("/dashboard")
//         } else {
//             setIsLoading(false)
//         }
//     }, [isLoggedIn])

//     async function signin() {
//         const username = usernameRef.current?.value;
//         const password = passwordRef.current?.value;

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//         })

//         const jwt = response.data.token;
//         localStorage.setItem("token", jwt)
//         setIsLoggedIn(true)
//         navigate("/dashboard")
//         console.log(isLoggedIn)
//     }


//     if (isLoading) {
//         return <Loader />
//     }

//     return <>
//         <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
//             <div className="bg-white rounded-xl border min-w-48 p-8">
//                 <Input reference={usernameRef} placeholder="username" />
//                 <Input reference={passwordRef} placeholder="password" />
//                 <div className="flex justify-center pt-4">
//                     <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
//                 </div>
//                 <div className="flex justify-center pt-4">
//                     <Button onClick={() => { navigate("/signup") }} loading={false} variant="secondary" text="Sign Up" fullWidth={true} />
//                 </div>
//                 <div className="flex justify-center-pt-4 px-6 py-6 rounded-md font-light flex items-center cursor-pointer">
//                     <GoogleOAuthProvider clientId={Google_Client_Id}>
//                         <GoogleLogin
//                             onSuccess={(credentialResponse) => {
//                                 console.log(credentialResponse);
//                                 fetch("http://localhost:3000/auth/google", {
//                                     method: "POST",
//                                     headers: {
//                                         "Content-Type": "application/json",
//                                     },
//                                     body: JSON.stringify({
//                                         idToken: credentialResponse.credential,
//                                     }),
//                                 })
//                                     .then((res) => res.json())
//                                     .then((data) => {
//                                         console.log("Backend response:", data);
//                                         if (data.token) {
//                                             localStorage.setItem("token", data.token);
//                                             setIsLoggedIn(true);
//                                             navigate("/dashboard");
//                                         } else {
//                                             console.error("No token received from backend");
//                                             // Optionally show error UI here
//                                         }
//                                     })
//                                     .catch((err) => {
//                                         console.error("Error:", err);
//                                         // Optionally show error UI here
//                                     });
//                             }}
//                             onError={() => {
//                                 console.log("Login Failed");
//                                 // Optionally show error UI here
//                             }}
//                         />

//                     </GoogleOAuthProvider>
//                 </div>
//             </div>
//         </div>
//     </>
// }

// export function Signin() {
//     const usernameRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     const navigate = useNavigate();
//     const { isLoggedIn, setIsLoggedIn } = useAuth();
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         if (isLoggedIn) {
//             navigate("/dashboard")
//         } else {
//             setIsLoading(false)
//         }
//     }, [isLoggedIn])

//     async function signin() {
//         const username = usernameRef.current?.value;
//         const password = passwordRef.current?.value;

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username,
//             password
//         })

//         const jwt = response.data.token;
//         localStorage.setItem("token", jwt)
//         setIsLoggedIn(true)
//         navigate("/dashboard")
//     }

//     if (isLoading) return <Loader />;

//     return (
//         <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200 transition-all">
//                 <h2 className="text-center text-2xl font-semibold text-purple-600">Sign in to your account</h2>

//                 <div className="space-y-4">
//                     <Input reference={usernameRef} placeholder="Username" />
//                     <Input reference={passwordRef} placeholder="Password" type="password" />
//                 </div>

//                 <div className="space-y-3">
//                     <Button
//                         onClick={signin}
//                         loading={false}
//                         variant="primary"
//                         text="Sign In"
//                         fullWidth={true}
//                         startIcon={<></>}
//                     />
//                     <Button
//                         onClick={() => navigate("/signup")}
//                         loading={false}
//                         variant="secondary"
//                         text="Sign Up"
//                         fullWidth={true}
//                         startIcon={<></>}
//                     />
//                 </div>

//                 <div className="relative text-center">
//                     <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-200" />
//                     </div>
//                     <div className="relative bg-white px-2 text-gray-400 text-sm">OR</div>
//                 </div>

//                 <div className="flex justify-center">
//                     <GoogleOAuthProvider clientId={Google_Client_Id}>
//                         <GoogleLogin
//                             onSuccess={(credentialResponse) => {
//                                 fetch(`${BACKEND_URL}/auth/google`, {
//                                     method: "POST",
//                                     headers: {
//                                         "Content-Type": "application/json",
//                                     },
//                                     body: JSON.stringify({
//                                         idToken: credentialResponse.credential,
//                                     }),
//                                 })
//                                     .then((res) => res.json())
//                                     .then((data) => {
//                                         if (data.token) {
//                                             localStorage.setItem("token", data.token);
//                                             setIsLoggedIn(true);
//                                             navigate("/dashboard");
//                                         }
//                                     })
//                                     .catch(console.error);
//                             }}
//                             onError={() => {
//                                 console.error("Login Failed");
//                             }}
//                         />
//                     </GoogleOAuthProvider>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export function Signin() {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
//   const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate("/dashboard");
//     } else {
//       setIsLoading(false);
//     }
//   }, [isLoggedIn]);

//   async function signin() {
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;

//     const response = await fetch(`${BACKEND_URL}/api/v1/signin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: email, password }),
//     });

//     const data = await response.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       setIsLoggedIn(true);
//       navigate("/dashboard");
//     }
//   }

//   if (isLoading) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="min-h-screen w-full flex">
//       {/* Left side */}
//       <div className="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center p-12">
//         <img
//           src="/assets/illustration.png"
//           alt="Illustration"
//           className="max-w-md rounded-xl shadow-xl"
//         />
//       </div>

//       {/* Right side */}
//       <div className="w-full md:w-1/2 bg-neutral-900 text-white flex flex-col justify-center px-6 sm:px-12 py-12">
//         <div className="w-full max-w-md mx-auto space-y-6">
//           {/* Logo & Title */}
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold">Findr</h1>
//           </div>

//           {/* Google Auth */}
//           <GoogleOAuthProvider clientId={Google_Client_Id}>
//             <GoogleLogin
//               onSuccess={(res) => {
//                 fetch(`${BACKEND_URL}/auth/google`, {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({
//                     idToken: res.credential,
//                   }),
//                 })
//                   .then((r) => r.json())
//                   .then((data) => {
//                     if (data.token) {
//                       localStorage.setItem("token", data.token);
//                       setIsLoggedIn(true);
//                       navigate("/dashboard");
//                     }
//                   });
//               }}
//               onError={() => console.error("Google Sign-in Failed")}
//               theme="filled_black"
//               size="large"
//               width="100%"
//             />
//           </GoogleOAuthProvider>

//           {/* Divider */}
//           <div className="flex items-center gap-3 text-gray-500 text-sm">
//             <hr className="flex-grow border-gray-700" />
//             or sign in with email
//             <hr className="flex-grow border-gray-700" />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-4">
//             <Input
//               placeholder="Enter your email address"
//               reference={emailRef}
//               type="email"
//               id="email"
//               label="Email"
//             />
//             <Input
//               placeholder="Enter your password"
//               reference={passwordRef}
//               type="password"
//               id="password"
//               label="Password"
//             />
//             <div className="text-right text-sm">
//               <a href="#" className="text-primary hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//             <button
//               onClick={signin}
//               className="w-full bg-primary hover:bg-primary-dark transition text-white py-3 rounded-md font-medium"
//             >
//               Sign in
//             </button>
//           </div>

//           <p className="text-sm text-center text-gray-400">
//             New user?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               className="text-primary hover:underline cursor-pointer"
//             >
//               Sign up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await fetch(`${BACKEND_URL}/api/v1/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Gradient Banner */}
      <div className="w-full h-48 bg-[linear-gradient(120deg,_#7164c0,_#9492db,_#d9ddee)] rounded-b-3xl shadow-md">
        {/* TOP LOGO */}
        <div className="w-full flex ml-8 justify pt-8">
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">Brainly</h1>
        </div>
      </div>

      {/* Centered Card */}
      <div className="-mt-32 bg-white rounded-xl shadow-lg w-full max-w-md p-8 space-y-6">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign in to your account</h2>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            reference={emailRef}
            type="email"
            id="email"
            label="Email"
          />
          <Input
            placeholder="Password"
            reference={passwordRef}
            type="password"
            id="password"
            label="Password"
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[--purple-600]" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-[--purple-600] hover:underline">
              Forgot your password?
            </a>
          </div>
          <button
            onClick={signin}
            className="w-full bg-[--purple-600] hover:bg-[--purple-500] text-white font-medium py-3 rounded-md transition"
          >
            Sign in
          </button>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <hr className="flex-grow border-gray-200" />
          OR
          <hr className="flex-grow border-gray-200" />
        </div>

        <GoogleOAuthProvider clientId={Google_Client_Id}>
          <GoogleLogin
            onSuccess={(res) => {
              fetch(`${BACKEND_URL}/auth/google`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  idToken: res.credential,
                }),
              })
                .then((r) => r.json())
                .then((data) => {
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                    navigate("/dashboard");
                  }
                });
            }}
            onError={() => console.error("Google Sign-in Failed")}
            theme="outline"
            width="100%"
          />
        </GoogleOAuthProvider>

        <p className="text-sm text-center text-gray-500">
          New to the platform?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[--purple-600] hover:underline cursor-pointer"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
