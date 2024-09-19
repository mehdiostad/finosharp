"use client";
import React from "react";
import Chart from "@/app/components/Chart";
import Navbar from "./components/Navbar";


const page = () => {
  return (
    <div className="flex h-screen items-center flex-col dark:bg-black overflow-hidden w-full ">
      <Navbar />
      <Chart />
    </div>
  );
};

export default page;
