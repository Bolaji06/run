import clsx from "clsx";
import { CircleAlert, Loader, OctagonAlert, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  loginSchema,
  registerSchema,
  TLoginSchema,
  TRegisterSchema,
} from "@/lib/validation";

import { ZodError } from "zod";
import {
  loginDataResponse,
  registerDataResponse,
  TInputError,
} from "@/lib/definitions";
import { setCookies } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
//import { deleteCookies, getCookie } from "@/lib/utils";

interface LoginSigUpProps {
  closeAuth: () => void;
}

const REGISTER_API = "http://localhost:3000/api/auth/register";
const LOGIN_API = "http://localhost:3000/api/auth/login";

export default function LoginSignupComponent({ closeAuth }: LoginSigUpProps) {
  const [toggleTab, setToggleTab] = useState<string>("login");

  const [loginInput, setLoginInput] = useState<TLoginSchema>({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState<TRegisterSchema>({
    email: "",
    username: "",
    password: "",
  });
  const [inputError, setInputError] = useState<TInputError[] | null>(null);
  const [registerError, setRegisterError] = useState<TInputError[] | null>(
    null
  );
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<loginDataResponse | null>(null);
  const [registerData, setRegisterData] = useState<registerDataResponse | null>(
    null
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleLoginOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  function handleRegisterOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegisterInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleLoginTab() {
    setToggleTab("login");
  }
  function handleRegisterTab() {
    setToggleTab("register");
  }

  async function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLogin(false);
    try {
      setIsLogin(true);
      const validateLoginInput = loginSchema.parse(loginInput);
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateLoginInput),
      };
      const response = await fetch(LOGIN_API, option);
      const data = await response.json();

      setLoginData(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const validateError = error.issues.map((issues) => {
          return {
            message: issues.message,
            path: issues.path,
          };
        });
        console.log(validateError);
        if (validateError && validateError.length) {
          setInputError(validateError);
        }
      }
    } finally {
      setIsLogin(false);
    }
  }

  useEffect(() => {
    if (loginData?.success) {
      toast({
        title: "Login Success",
        description: "You've successfully login",
      });
      navigate(0);

      closeAuth();
    }
  }, [loginData?.success]);

  console.log(loginData);

  useEffect(() => {
    if (registerData?.success) {
      toast({
        title: "Registration success",
        description: "Login to your new account",
      });
      handleLoginTab();
    }
  }, [registerData?.success]);

  useEffect(() => {
    if (loginData && loginData.success) {
      setCookies("login", loginData.token, 1);
    }
  }, [loginData?.success]);

  async function registerOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRegister(false);
    try {
      setIsRegister(true);
      const validateRegisterInput = registerSchema.parse(registerInput);
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateRegisterInput),
      };

      const response = await fetch(REGISTER_API, option);
      const data = await response.json();

      console.log(data);
      setRegisterData(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const validateError = error.issues.map((issues) => {
          return {
            message: issues.message,
            path: issues.path,
          };
        });
        console.log(validateError);
        setRegisterError(validateError);
      }
    } finally {
      setIsRegister(false);
    }
  }

  console.log(registerData);

  return (
    <>
      <section className="h-screen">
        <div className="absolute left-1/2 -translate-x-1/2 z-50 w-[400px]">
          <div className="rounded-xl bg-gray-300 py-1 px-3 pb-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="py-2">
                <h2 className="font-bold text-2xl">Login/Register</h2>
              </div>
              <div
                className="rounded-full hover:bg-slate-100 p-2 cursor-pointer"
                onClick={() => closeAuth()}
              >
                <X />
              </div>
            </div>
            <header className="flex justify-between gap-3 items-center p-2 rounded-full bg-slate-100">
              <div
                onClick={handleLoginTab}
                className={`w-1/2 ${clsx({
                  "bg-black/20 font-semibold": toggleTab === "login",
                })}  rounded-full px-3 transition-colors ease-linear duration-150 py-1 cursor-pointer`}
              >
                <h2 className="text-lg">Login</h2>
              </div>
              <div
                onClick={handleRegisterTab}
                className={`w-1/2 ${clsx({
                  "bg-black/20 font-semibold": toggleTab === "register",
                })}  rounded-full px-3 transition-colors ease-linear duration-150 py-1 cursor-pointer`}
              >
                <h2 className="text-lg pr-2">Register</h2>
              </div>
            </header>

            {toggleTab === "login" && (
              <section className="login mt-2">
                <div>
                  <form
                    action=""
                    noValidate
                    className="space-y-1"
                    onSubmit={loginOnSubmit}
                  >
                    <div>
                      <label className="text-sm text-gray-600" id="email">
                        Email
                      </label>
                      <Input
                        onChange={handleLoginOnChange}
                        value={loginInput.email}
                        onFocus={() => setInputError(null)}
                        name="email"
                        className="rounded-full"
                        id="email"
                        type="email"
                      />
                      {inputError ? (
                        <p className="text-sm text-red-500 first-letter:uppercase">
                          {inputError[0]?.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="py-3">
                      <label className="text-sm text-gray-600" id="password">
                        Password
                      </label>
                      <Input
                        onChange={handleLoginOnChange}
                        value={loginInput.password}
                        onFocus={() => setInputError(null)}
                        name="password"
                        className="rounded-full"
                        id="password"
                        type="password"
                      />
                      {inputError ? (
                        <p className="text-sm text-red-500 first-letter:uppercase">
                          {inputError[1]?.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <Button
                      type="submit"
                      className={`inline-flex gap-3 w-full ${clsx({
                        "cursor-not-allowed": isLogin,
                      })}`}
                      disabled={isLogin}
                      aria-disabled={isLogin}
                    >
                      {isLogin && (
                        <Loader className="animate-spin text-white" size={18} />
                      )}
                      Login
                    </Button>
                  </form>
                  {
                    loginData && !loginData.success && <p className="inline-flex items-center gap-1 text-red-500 text-sm">
                     <OctagonAlert size={15}/> <span className="first-letter:capitalize">{loginData.message}</span>
                      </p>
                  }
                </div>
              </section>
            )}

            {toggleTab === "register" && (
              <section className="register mt-2">
                <div>
                  <form
                    action=""
                    noValidate
                    className="space-y-1"
                    onSubmit={registerOnSubmit}
                  >
                    <div>
                      <label className="text-sm text-gray-600" id="email">
                        Email
                      </label>
                      <Input
                        className="rounded-full"
                        id="email"
                        type="email"
                        onChange={handleRegisterOnChange}
                        name="email"
                        value={registerInput.email}
                        onFocus={() => setRegisterError(null)}
                      />
                      {registerError ? (
                        <p className="text-sm text-red-500 first-letter:uppercase">
                          {registerError[0]?.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-600" id="username">
                        Username
                      </label>
                      <Input
                        className="rounded-full"
                        id="username"
                        type="text"
                        onChange={handleRegisterOnChange}
                        value={registerInput.username}
                        name="username"
                        onFocus={() => setRegisterError(null)}
                      />
                      {registerError ? (
                        <p className="text-sm text-red-500 first-letter:uppercase">
                          {registerError[1]?.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="pb-3">
                      <label className="text-sm text-gray-600" id="password">
                        Password
                      </label>
                      <Input
                        className="rounded-full"
                        id="password"
                        type="password"
                        onChange={handleRegisterOnChange}
                        value={registerInput.password}
                        name="password"
                        onFocus={() => setRegisterError(null)}
                      />
                      {registerError ? (
                        <p className="text-sm text-red-500 first-letter:uppercase">
                          {registerError[2]?.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <Button
                      disabled={isRegister}
                      aria-disabled={isRegister}
                      className={`w-full inline-flex gap-3 items-center ${clsx({
                        "cursor-not-allowed": isRegister,
                      })}`}
                    >
                      {isRegister && (
                        <Loader size={18} className="animate-spin text-white" />
                      )}
                      Register
                    </Button>
                  </form>
                  {registerData?.success === false && (
                    <div className="text-sm text-red-500 inline-flex items-center gap-2">
                      <CircleAlert size={16} />
                      <p className="first-letter:uppercase">
                        {registerData?.message}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
