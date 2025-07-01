import { useEffect, useRef, useState } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, Google_Client_Id } from "../config";
import { useAuth } from "../AuthContext";
import { Loader } from "../components/Loader";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
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

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await fetch(`${BACKEND_URL}/api/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    navigate("/signin");
  }

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Gradient Banner with Logo */}
      <div className="w-full h-48 bg-[linear-gradient(120deg,_#7164c0,_#9492db,_#d9ddee)] rounded-b-3xl shadow-md">
        {/* TOP LOGO */}
        <div className="w-full flex ml-8 justify pt-8">
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">Brainly</h1>
        </div>
      </div>

      {/* Card */}
      <div className="-mt-32 bg-white rounded-xl shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create your account
        </h2>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            reference={usernameRef}
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
          <button
            onClick={signup}
            className="w-full bg-[--purple-600] hover:bg-[--purple-500] text-white font-medium py-3 rounded-md transition"
          >
            Sign up
          </button>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <hr className="flex-grow border-gray-200" />
          OR
          <hr className="flex-grow border-gray-200" />
        </div>

        <GoogleOAuthProvider clientId={Google_Client_Id}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              fetch(`${BACKEND_URL}/auth/google`, {
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
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                    navigate("/dashboard");
                  }
                })
                .catch((err) => {
                  console.error("Google signup error:", err);
                });
            }}
            onError={() => {
              console.error("Google Signup Failed");
            }}
            theme="outline"
            width="100%"
          />
        </GoogleOAuthProvider>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[--purple-600] hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}