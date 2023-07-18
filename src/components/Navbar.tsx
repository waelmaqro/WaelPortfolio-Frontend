"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { motion } from "framer-motion";
import { Dropdown, Tooltip } from "@nextui-org/react"; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navbar({ globalData }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [padding, setPadding] = useState(25);
  const [top, setTop] = useState(10);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenLearnings, setIsOpenLearnings] = useState(false);

  const variants = {
    visible: { x: "0%" },
    hidden: { x: "200%" },
    exit: { x: "100%" },
    exitActive: { x: 0 },
  };

  useEffect(() => {
    const changePadding = () => {
      if (window.scrollY > 10) {
        setPadding(35);
        setTop(0);
      } else {
        setPadding(25);
        setTop(1);
      }
    };

    window.addEventListener("scroll", changePadding);

    return () => {
      window.removeEventListener("scroll", changePadding);
    };
  }, []);
  const data = globalData.data.attributes;

  const ButtonStyle = {
    borderRadius: "0px",
    backgroundColor: "transparent",
    padding: 0,
  }

  return (
    <div
      className={`sm:text-left fixed top-${top} w-full flex justify-center items-center bg-white px-10 z-[40]`}
    >
      {/* Desktop */}
      <div
        className={`flex justify-between flex-grow max-w-[1200px] items-center  mx-auto min-[0px]:hidden md:flex`}
        style={{
          paddingTop: padding,
          paddingBottom: padding,
          transition: "padding 0.3s",
        }}
      >
        <Link href="/home">
          <div className="flex flex-row items-center w-[177px] justify-between">
            <Image
              src={data.headerLogo.data.attributes.url}
              alt={data.headerLogo.data.attributes.alternativeText}
              className="w-[34px]"
              height={34}
              width={34}
              loading='lazy'
            />
            <h1 className="text-[40px] font-DM font-bold">
              {data.headerTitle}
            </h1>
          </div>
        </Link>

        <div className={`flex flex-row ${searchOpen ? "w-[950px]" : "w-[624px]"} justify-between font-Jost text-[#292F36] text-[22px] leading-[25px] items-center`}>
          {data.NavbarLinks.map((data: any, index: any) => (
            data.DropdownLinks.length === 0 ? (
              <Link
                href={data.href}
                key={index}
                className="hover:opacity-60"
                target={data.target}
                replace={data.href === 'blogs' ? true : false}
              >
                {data.title}
              </Link>
            ) : (
              <Tooltip 
                key={index} 
                placement="bottom" 
                rounded={true}
                hideArrow
                css={{backgroundColor: "#CDA274",
                      color: "White",
                    }}
                content={
                  <div className="flex flex-col text-[22px] p-3">
                    {data.DropdownLinks.map((dropdownData: any, index: number) => (
                      <Link 
                        key={index} 
                        href={dropdownData.href} 
                        className="font-Jost hover:opacity-50">
                        {dropdownData.title}
                      </Link>
                    ))}
                  </div>
                }>
                {data.href === null ? (
                  data.title
                ):(
                  <Link
                    href={data.href}
                    key={index}
                    className="hover:opacity-60"
                    target={data.target}
                    replace={data.href === 'blogs' ? true : false}>
                    {data.title}
                  </Link>
                )}
                
              </Tooltip>
            )      
          ))}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`flex flex-row`}
          >
            <Image
              src={data.searchIcon.data.attributes.url}
              alt={data.searchIcon.data.attributes.alternativeText}
              height={30}
              width={30}
              loading='lazy'
            />
          </button>
          {searchOpen && <input placeholder="Search..." className="text-22px border-[#292F36] border-[1px] rounded-full p-1 px-4 max-w-[150px]"/>}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex justify-between items-center min-[0px]:flex md:hidden w-screen py-5">
        <div className="flex flex-row gap-2">
          <Image
            src={data.headerLogo.data.attributes.url}
            alt={data.headerLogo.data.attributes.alternativeText}
            className="w-[24px]"
            height={24}
            width={24}
            loading='lazy'
          />
          <h1 className="text-[30px] font-DM font-bold">{data.headerTitle}</h1>
        </div>

        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuRoundedIcon fontSize="large" /> Menu
        </button>
        {isOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeOut", duration: 0.2 }}
            exit="exit"
            className="fixed right-0 top-0 bottom-0 height[100%] bg-white p-2 w-screen transition-300 shadow-md px-10 py-10 "
          >
            <div className="flex justify-end py-3">
              <button onClick={() => setIsOpen(!isOpen)}>
                <CloseRoundedIcon fontSize="large" className=" text-[#292F36]" />
              </button>
            </div>
            <div className="flex flex-col items-start justify-between  h-[50%] font-Jost text-[#292F36] mt-5">
              {data.NavbarLinks.map((data: any, index: any) => (
                data.DropdownLinks.length === 0 ? (
                  <Link
                    href={data.href}
                    key={index}
                    target={data.target}
                    className="border-b-[1px] w-full text-start flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <p className="text-[20px]">{data.title}</p>
                    <ArrowForwardIosRoundedIcon className="text-[#292F36]" />
                  </Link>
                ) : (
                  <div key={index} className="w-full border-b-[1px]">
                      {data.href === null ? (
                        <div>
                          <div className="w-full text-start flex justify-between items-center">
                            <p className="text-[20px]">
                              {data.title}
                            </p>
                            <div>
                              {isOpenLearnings === true ? (
                                <button onClick={() => setIsOpenLearnings(!isOpenLearnings)}>
                                  <KeyboardArrowDownIcon fontSize='large' className="text-[#292F36]" />
                                </button>
                              ) : (
                                <button onClick={() => setIsOpenLearnings(!isOpenLearnings)}>
                                  <ArrowForwardIosRoundedIcon className="text-[#292F36]" />
                                </button>
                              )}
                            </div>
                          </div>
                          {isOpenLearnings && (
                            <div className="mx-3 my-6 text-[18px]">
                              {data.DropdownLinks.map((dropdownData: any, index: number) => (
                                <div key={index}>
                                  <Link 
                                    key={index} 
                                    href={dropdownData.href} 
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="font-Jost hover:opacity-50 w-full text-start flex justify-between items-center">
                                    {dropdownData.title}
                                    <ArrowForwardIosRoundedIcon fontSize='small' className="text-[#292F36]" />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        ) : (
                          <div>
                            <div className="w-full text-start flex justify-between items-center">
                              <Link
                                href={data.href}
                                key={index}
                                className="hover:opacity-60"
                                target={data.target}
                                replace={data.href === 'blogs' ? true : false}
                                onClick={() => setIsOpen(!isOpen)}>
                                  <p className="text-[20px]">
                                    {data.title}
                                  </p>
                              </Link>
                              <div>
                                {isOpenSearch === true ? (
                                  <button onClick={() => setIsOpenSearch(!isOpenSearch)}>
                                    <KeyboardArrowDownIcon fontSize='large' className="text-[#292F36]" />
                                  </button>
                                ) : (
                                  <button onClick={() => setIsOpenSearch(!isOpenSearch)}>
                                    <ArrowForwardIosRoundedIcon className="text-[#292F36]" />
                                  </button>
                                )}
                              </div>
                            </div>
                            {isOpenSearch && (
                              <div className="mx-3 my-6 text-[18px]">
                                {data.DropdownLinks.map((dropdownData: any, index: number) => (
                                  <div key={index}>
                                    <Link 
                                      key={index} 
                                      href={dropdownData.href} 
                                      onClick={() => setIsOpen(!isOpen)}
                                      className="font-Jost hover:opacity-50 w-full text-start flex justify-between items-center">
                                      {dropdownData.title}
                                      <ArrowForwardIosRoundedIcon fontSize='small' className="text-[#292F36]" />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            )} 
                          </div>
                      )}
                    

                       

                    
                  
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
