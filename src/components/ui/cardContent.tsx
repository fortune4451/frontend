import React, { useState, useEffect } from 'react';

import { cn } from "@/lib/utils";

export function CardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex w-full flex-col justify-between gap-4 rounded-xl border p-5 hover:shadow cursor-pointer",
            props.className
          )}
        />
}

export function InvestCard(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            " w-full sm:flex grid grid-cols-2 items-center gap-5 justify-between rounded-xl border p-4 hover:shadow cursor-pointer bg-white text-center sm:text-left",
            props.className
          )}
        />
}

export function WorksCardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "border border-[#001638] md:h-[300px] sm:h-[350px]  h-[290px] flex flex-col sm:gap-5 rounded-sm p-3 items-center text-center justify-around cursor-pointer transition duration-300 hover:scale-105 ",
            props.className
          )}
        />
}

export function OfferCardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex flex-col gap-5 border border-[#001638] p-3 rounded-sm items-center text-center transition duration-300 hover:scale-105 cursor-pointer",
            props.className
          )}
        />
}

export function SectionCardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "my-20 mt-10 flex flex-col items-center gap-12 ",
            props.className
          )}
        />
}

export function GridCardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5",
            props.className
          )}
        />
}

export function HeaderContainer(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "text-center flex flex-col gap-3",
            props.className
          )}
        />
}

export function HeaderContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "text-[#0071ff] sm:text-3xl text-2xl font-semibold",
            props.className
          )}
        />
}

export function HeaderContentTwo(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "capitalize font-bold sm:text-4xl text-3xl",
            props.className
          )}
        />
}



export function ServiceCard(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex flex-col relative  transition-all ease-in-out duration-300  w-[250px] h-[350px]  cursor-pointer",
            props.className
          )}
        />
}

export function TestimonialCard(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex flex-col  bg-[#031e49] p-3 rounded-sm gap-5 items-center w-[250px] sm:w-[300px] ",
            props.className
          )}
        />
}

export function GradeCard(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex flex-col  bg-[#031e49] rounded-sm  items-center w-[250px] sm:w-[300px] relative ",
            props.className
          )}
        />
}