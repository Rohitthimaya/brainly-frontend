import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    // Inside component
    useEffect(() => {
        setIsLoading(false);
    }, []);
  

    async function signup() {
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {

            username,
            password

        })
        navigate("/signin")
    }

    if (isLoading) {
        return <Loader />
    }


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="username" reference={usernameRef} />
            <Input placeholder="password" reference={passwordRef} />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Sign Up" fullWidth={true} />
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={() => { navigate("/signin") }} loading={false} variant="secondary" text="Sign In" fullWidth={true} />
            </div>

        </div>
    </div>
}