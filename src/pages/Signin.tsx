import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Loader } from "../components/Loader";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(isLoggedIn){
            navigate("/dashboard")
        }else{
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


    if(isLoading){
        return <Loader />
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="username" />
            <Input reference={passwordRef} placeholder="password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true}/>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={ () => { navigate("/signup") }} loading={false} variant="secondary" text="Sign Up" fullWidth={true}/>
            </div>
        </div>
    </div>
}