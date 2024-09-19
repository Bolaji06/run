import clsx from "clsx";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TLoginSchema } from "@/lib/validation";

interface LoginSigUpProps {
    closeAuth: () => void
}
export default function LoginSignupComponent({ closeAuth }: LoginSigUpProps) {
  const [toggleTab, setToggleTab] = useState<string>("login");

  const[loginInput, setLoginInput] = useState<TLoginSchema>({
    email: '',
    password: ''
  })

  function handleLoginOnChange(e: ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    setLoginInput((prevState) => {
        return {
            ...prevState,
            [name]: value
        }
    })
  }

  function handleLoginTab() {
    setToggleTab("login");
  }
  function handleRegisterTab() {
    setToggleTab("register");
  }

  function loginOnSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

  }

  return (
    <>
      <section className="h-screen">
        <div className="absolute left-1/2 -translate-x-1/2 z-50 w-[400px]">
          <div className="rounded-xl bg-gray-300 py-1 px-3 pb-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="py-2">
                <h2 className="font-bold text-2xl">Login/Register</h2>
              </div>
              <div className="rounded-full hover:bg-slate-100 p-2 cursor-pointer"
              onClick={() => closeAuth()}>
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
                  <form action="" className="space-y-1" onSubmit={loginOnSubmit}>
                    <div>
                      <label className="text-sm text-gray-600" id="email">Email</label>
                      <Input onChange={handleLoginOnChange} value={loginInput.email} name="email" className="rounded-full" id="email" type="email"/>
                    </div>
                    <div className="py-3">
                      <label className="text-sm text-gray-600" id="password">Password</label>
                      <Input onChange={handleLoginOnChange} value={loginInput.password} name="password" className="rounded-full" id="password" type="password"/>
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </div>
              </section>
            )}

            {toggleTab === "register" && (
              <section className="register mt-2">
                <div>
                  <form action="" className="space-y-1">
                    <div>
                      <label className="text-sm text-gray-600" id="email">Email</label>
                      <Input className="rounded-full" id="email" type="email"/>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600" id="username">Username</label>
                      <Input className="rounded-full" id="username" type="text"/>
                    </div>
                    <div className="pb-3">
                      <label className="text-sm text-gray-600" id="password">Password</label>
                      <Input className="rounded-full" id="password" type="password"/>
                    </div>
                    <Button className="w-full">Register</Button>
                  </form>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
