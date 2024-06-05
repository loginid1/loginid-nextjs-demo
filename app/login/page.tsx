'use client';

import { LoginIDWebSDK } from "@loginid/websdk3";
import { useEffect, useRef, useState } from "react";
import { submitLoginToken } from "../lib/front";

const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
  appId: process.env.NEXT_PUBLIC_APP_ID || "",
};

const lid = new LoginIDWebSDK(config);

export default function Login() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [abortController, setAbortController] = useState(new AbortController());
    const effectRan = useRef(false);

    // WebAuthn Autofill
    useEffect(() => {
      if (!effectRan.current) {
        return () => effectRan.current = true;
      }

      const abortController = new AbortController();
      setAbortController(abortController);

      // WebAuthn Autofill
      lid.authenticateWithPasskey(undefined, {
        autoFill: true,
        abortSignal: abortController.signal
      })
      .then(({ jwtAccess }) => {
        return submitLoginToken(jwtAccess);
      })
      .then(() => {
        setError("Login successful")
        window.location.href = "/checkout";
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setError('Autofill aborted');
        } else {
          if (error.code !== "ERROR_PASSKEY_ABORTED") {
            setError(error.message);
          }
        }
      });
  
      // Cleanup function that will be called when the component unmounts
      return () => {
        console.log("Cleanup");
        abortController.abort();
      };
    }, []);  // Empty dependency array means this effect runs once on mount and cleanup on unmount

    async function handleLogin(e) {
        e.preventDefault()
        abortController.abort();
        try {
          const { jwtAccess } = await lid.authenticateWithPasskey(email);
            
          await submitLoginToken(jwtAccess);
          
          setError("Login successful")

          window.location.href = "/checkout";
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email webauthn"
                    required
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            <div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
            </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }