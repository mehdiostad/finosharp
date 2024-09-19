"use client";
import { Button, Drawer } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { ModeToggle } from "./Toggle";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="flex justify-between w-full px-2 items-center ">
      <div className="flex gap-4 items-center">
        <Image src="/Binance-Logo.png" alt="logo" width={150} height={50} />
        <ul className="lg:flex gap-4 hidden">
          <li>Markets</li>
          <li>Trade</li>
          <li>Derivatives</li>
          <li>More</li>
        </ul>
       
      </div>
      <div className="flex gap-4 pr-8 items-center">
        <ul className="flex gap-4 items-center">
          <li>LogIn</li>
          <li className="p-2 bg-yellow-600 rounded-lg text-white font-bold">SingUp</li>
          <ModeToggle/>
        </ul>

        <Button onClick={toggleDrawer(true)} className="flex lg:hidden">
          <Image src="/menu.png" alt="menu" width={30} height={50} className="dark:bg-white p-2 rounded-full"/>
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <ul className="flex flex-col gap-10 p-10">
            <li>Markets</li>
            <li>Trade</li>
            <li>Derivatives</li>
            <li>More</li>
          </ul>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
