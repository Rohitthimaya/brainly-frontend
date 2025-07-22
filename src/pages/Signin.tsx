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
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">Recalr</h1>
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
