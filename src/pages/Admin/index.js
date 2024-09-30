import React, { useEffect, useState } from "react";
import Board from "../../components/Board";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const Admin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken && window.location.pathname !== "/admin/directory") {
      toast.success("Already Loggedin");
      navigate("/admin/directory");
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      toast.success("Login successful!");
      navigate("/admin/directory");
    },
    onError: (error) => {
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const handleLogin = () => {
    if (username && password) {
      loginMutation.mutate();
    } else {
      toast.error("Please enter both username and password.");
    }
  };

  return (
    <div
      className="relative flex text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/auth_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top left",
      }}
    >
      <div className="absolute right-1/2 top-0 flex w-screen max-w-[1358px] translate-x-1/2 items-center justify-center px-[48px] py-[48px]">
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/logo.svg`}
          alt="Group Icon"
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="absolute mt-32 flex w-full items-center justify-center overflow-y-auto">
        <Board className="flex w-full max-w-[560px] flex-col items-center gap-8 px-20 py-6">
          <span className="text-2xl font-bold">Admin Login</span>
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-2">
              <span>Username</span>
              <input
                className="rounded-md border border-[#047857] bg-[#111827] px-[13px] py-[9px] transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span>Password</span>
              <input
                className="rounded-md border border-[#047857] bg-[#111827] px-[13px] py-[9px] transition-all"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <Button label="Login" onClick={handleLogin} />
          </div>
        </Board>
      </div>
    </div>
  );
};

export default Admin;
