/** @format */

import React from "react";

import {LucideIcon, Waypoints} from "lucide-react";
import { cn } from "@/lib/utils";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
}

export default function Card(props: CardProps){
  return(
    <CardContent className="bg-white">
      <section className="flex justify-between gap-2">
        {/*lable */}
        <p className="text-sm">{props.label}</p>

        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400"/>
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </CardContent>
  )
}
export function CardContent(props:React.HTMLAttributes<HTMLDivElement>){
  return <div 
          {...props}
          className={cn(
            "flex w-full flex-col justify-between gap-4 rounded-xl border p-5 shadow",
            props.className
          )}
        />
}