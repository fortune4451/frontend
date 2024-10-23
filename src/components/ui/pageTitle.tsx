'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { MenuIcon } from 'lucide-react'

import SideNavbar from '../SideNavBar';

type Props = {
  title: string;
  className?: string;
}



const PageTitle = ({ title, className }: Props) => {
  return (
    <div  className=''>
      <h1 className={cn('text-xl sm:text-[20px] font-semibold', className)}>
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
