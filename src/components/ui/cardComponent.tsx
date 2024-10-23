/** @format */

import React from "react";

import {LucideIcon, Waypoints} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminCardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
}




export type CardProps = {
  type: string
  status1: string;
  st1Amount: string;
  status2: string;
  st2Amount: string;
  status3: string;
  st3Amount: string;
  icon: LucideIcon;
  amount: string;
  description: string;
}

export default function Card(props: CardProps){
  return(
    <CardContent>
      <section className="flex justify-between gap-2">
        {/*lable */}
        <p className="text-sm">{props.type}</p>

        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400"/>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <div className="grid grid-cols-3 gap-3 font-light">
          <div className="text-xs font-semibold  flex flex-col gap-1">
            <div>{props.status1}</div>
            <div>{props.st1Amount}</div>
          </div>
          <div className="text-xs font-semibold   flex flex-col gap-1">
            <div>{props.status2}</div>
            <div>{props.st2Amount}</div>
          </div>
          <div className="text-xs font-semibold  flex flex-col gap-1">
            <div>{props.status3}</div>
            <div>{props.st3Amount}</div>
          </div>
        </div>
      </section>
      <section className="border-t pt-3 text-xs">
        {props.description}
      </section>
    </CardContent>
  )
}
export function CardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            " flex w-full flex-col justify-between gap-2  border p-5  bg-white  rounded-lg ",
            props.className
          )}
        />
}