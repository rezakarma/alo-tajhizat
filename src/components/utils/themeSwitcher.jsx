"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {Switch} from "@nextui-org/react";
const ThemeSwitcher = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

   const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const setThemeForInput = () => {
    if(resolvedTheme === 'light') {
      return false
    } else {
      return true
    }
  }

  return (
    <div className="flex fixed mr-3 mt-5 z-50">
    
      <label
        for="check"
        className={`${ isVisible ? 'block' : 'hidden'} bg-gray-300 dark:bg-slate-500  cursor-pointer relative w-[87px] h-10 rounded-full`}
      >
        <input
          value= {setThemeForInput()}
          defaultChecked = {setThemeForInput()}
          type="checkbox"
          id="check"
          className="sr-only peer"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        />
        {resolvedTheme === "dark" ? (
          <span className="w-2/5 h-4/5 bg-gray-200 absolute rounded-full left-1 top-1 peer-checked:bg-slate-600 peer-checked:left-11 transition-all duration-500 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </span>
        ) : (
          <span className="w-2/5 h-4/5 bg-gray-200 absolute rounded-full left-1 top-1 peer-checked:bg-blue-600 peer-checked:left-11 transition-all duration-500 ">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </span>
        )}
      </label>
    </div>
  );
};

export default ThemeSwitcher;



import React from "react";