import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL, Google_Client_Id } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Loader } from "../components/Loader";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard")
        } else {
            setIsLoading(false)
        }
    }, [isLoggedIn])

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
        setIsLoggedIn(true)
        navigate("/dashboard")
        console.log(isLoggedIn)
    }


    if (isLoading) {
        return <Loader />
    }

    return <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="username" />
                <Input reference={passwordRef} placeholder="password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
                </div>
                <div className="flex justify-center pt-4">
                    <Button onClick={() => { navigate("/signup") }} loading={false} variant="secondary" text="Sign Up" fullWidth={true} />
                </div>
                <div className="flex justify-center-pt-4 px-6 py-6 rounded-md font-light flex items-center cursor-pointer">
                    <GoogleOAuthProvider clientId={Google_Client_Id}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                                fetch("http://localhost:3000/auth/google", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        idToken: credentialResponse.credential,
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        console.log("Backend response:", data);
                                        if (data.token) {
                                            localStorage.setItem("token", data.token);
                                            setIsLoggedIn(true);
                                            navigate("/dashboard");
                                        } else {
                                            console.error("No token received from backend");
                                            // Optionally show error UI here
                                        }
                                    })
                                    .catch((err) => {
                                        console.error("Error:", err);
                                        // Optionally show error UI here
                                    });
                            }}
                            onError={() => {
                                console.log("Login Failed");
                                // Optionally show error UI here
                            }}
                        />

                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    </>
}