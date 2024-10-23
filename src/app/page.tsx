'use client'

import { DepositProvider } from '@/components/depositContext';
import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup';
import Autoplay from 'embla-carousel-autoplay'

import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/ui/navBar";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Select, Input,  } from '@chakra-ui/react'

import { FaWhatsapp  } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

import Image from "next/image";
import Link from 'next/link';

import { ChakraProvider } from '@chakra-ui/react';

import { 
  SectionCardContent, 
  OfferCardContent, 
  GridCardContent, 
  HeaderContent, 
  HeaderContentTwo, 
  HeaderContainer, 
  WorksCardContent,
  ServiceCard,
  TestimonialCard,
  GradeCard 
} from '@/components/ui/cardContent';

import { ChartCandlestick } from 'lucide-react'



export default function Home() {
  
  const testimonial = [
    <TestimonialCard key="1">
      <div className='w-[200px]  '>
          <Image
            src="/t-1.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-slate-400 text-sm'>As an Entrepreneur, I come across a lot of opportunities. Few are legit and do what they preach but PrimeBullTrade has a solid business model that is tapping an unknown market and analytics and past performance showed me that it is a valid opportunity.</p>
        <h3 className='uppercase font-semibold'>Aarav Dhruv</h3>
      </div>
    </TestimonialCard>,

    <TestimonialCard key="2">
      <div className='w-[200px]  '>
          <Image
            src="/t-2.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-slate-400 text-sm'>I had never heard of PrimeBullTrade before, a friend introduced me. I was skeptical at first, but after a while it turned out to be a total no-brainer, and a very lucrative opportunity. Thought the best time to start investing is now. It has been awesome using them.</p>
        <h3 className='uppercase font-semibold'>Saanvi Kabir</h3>
      </div>
    </TestimonialCard>,

    <TestimonialCard key="3">
      <div className='w-[200px]  '>
          <Image
            src="/t-3.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-slate-400 text-sm'>PrimeBullTrade provides an excellent service, be it on a business or on a personal level. I am very pleased to see the results in comparison to the experiences one reads or hears about in the media online. I get the feeling that PrimeBullTrade are very much ahead of the game.</p>
        <h3 className='uppercase font-semibold'>Samantha Luigi</h3>
      </div>
    </TestimonialCard>,

    <TestimonialCard key="4">
      <div className='w-[200px]  '>
          <Image
            src="/t-4.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-slate-400 text-sm'>I just want to pass on a big thank you to the whole team at PrimeBullTrade. We feel as though they truly care about our financial future. A thoroughbred company with a first class package guiding us towards financial freedom, thank you all and wish you all the best in years to come.</p>
        <h3 className='uppercase font-semibold'>Oleg Silvian</h3>
      </div>
    </TestimonialCard>,

    <TestimonialCard key="5">
      <div className='w-[200px] rounded-full '>
          <Image
            src="/t-5.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-slate-400 text-sm'>We have been with PrimeBullTrade for three years. The team have made an effort to get to know us and so the service we receive feels very personal. They have helped us realize our plans. The peace of mind we have from knowing our finances are being so well managed is priceless.</p>
        <h3 className='uppercase font-semibold'>Samuel Ludwig</h3>
      </div>
    </TestimonialCard>,
  ].map((divContent, index) => (
    <div key={index}>
      {divContent}
    </div>
  ));

  const plans = [
    <GradeCard key="1">
      <div className='w-full  '>
          <Image
            src="/02.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3 p-3 w-full px-7 border-t border-red-700'>
        <div className='flex flex-col gap-3 text-sm sm:text-base text-center w-full '>
          <div className='flex justify-between'>
            <p className='font-semibold'>Duration</p>
            <p className='text-green-400'>5 Days</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Percentage</p>
            <p className='text-green-400'>2.14% Daily</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Referral Bonus </p>
            <p className='text-green-400'>3%</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-semibold'>Amount</p>
            <p className='text-green-400'>$50 - $499.99</p>
          </div>
          <Link href="/register"> 
            <Button variant={'destructive'}>Invest</Button>
          </Link>
        </div>
      </div>
        <h3 className='uppercase font-semibold text-center rounded-md bg-[#031e49] p-2 py-1 absolute top-[39%] sm:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-700'>Grade 1</h3>
    </GradeCard>,
    <GradeCard key="2">
    <div className='w-full  '>
        <Image
          src="/02.jpg"
          alt='Winner 2018'
          width={400}
          height={200}
          // layout='responsive'
          // objectFit='contain'
        />
    </div>
    <div className='flex flex-col gap-3 p-3 w-full px-7 border-t border-red-700'>
      <div className='flex flex-col gap-3 text-sm sm:text-base text-center w-full '>
        <div className='flex justify-between'>
          <p className='font-semibold'>Duration</p>
          <p className='text-green-400'>5 Days</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Percentage</p>
          <p className='text-green-400'>4% Daily</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Referral Bonus</p>
          <p className='text-green-400'>3%</p>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <p className='font-semibold'>Amount</p>
          <p className='text-green-400'>$500 - $4,999.99</p>
        </div>
        <Link href="/register"> 
            <Button variant={'destructive'}>Invest</Button>
          </Link>
      </div>
    </div>
      <h3 className='uppercase font-semibold text-center rounded-md bg-[#031e49] p-2 py-1 absolute top-[39%] sm:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-700'>Grade 2</h3>
    </GradeCard>,
    <GradeCard key="3">
      <div className='w-full  '>
          <Image
            src="/02.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3 p-3 w-full px-7 border-t border-red-700'>
        <div className='flex flex-col gap-3 text-sm sm:text-base text-center w-full '>
          <div className='flex justify-between'>
            <p className='font-semibold'>Duration</p>
            <p className='text-green-400'>5 Days</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Percentage</p>
            <p className='text-green-400'>5.40% Daily</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Referral Bonus</p>
            <p className='text-green-400'>3%</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-semibold'>Amount</p>
            <p className='text-green-400'>$5,000 - $49,999.99</p>
          </div>
          <Link href="/register"> 
            <Button variant={'destructive'}>Invest</Button>
          </Link>
        </div>
      </div>
    <h3 className='uppercase font-semibold text-center rounded-md bg-[#031e49] p-2 py-1 absolute top-[39%] sm:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-700'>Grade 3</h3>
    </GradeCard>,
    <GradeCard key="4">
      <div className='w-full  '>
          <Image
            src="/02.jpg"
            alt='Winner 2018'
            width={400}
            height={200}
            // layout='responsive'
            // objectFit='contain'
          />
      </div>
      <div className='flex flex-col gap-3 p-3 w-full px-7 border-t border-red-700'>
        <div className='flex flex-col gap-3 text-sm sm:text-base text-center w-full '>
          <div className='flex justify-between'>
            <p className='font-semibold'>Duration</p>
            <p className='text-green-400'>5 Days</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Percentage</p>
            <p className='text-green-400'>7% Daily</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Referral Bonus</p>
            <p className='text-green-400'>3%</p>
          </div>
          <div className='flex flex-col gap-1 items-start'>
            <p className='font-semibold'>Amount</p>
            <p className='text-green-400'>$50,000 - $499,999.99</p>
          </div>
          <Link href="/register"> 
            <Button variant={'destructive'}>Invest</Button>
          </Link>
        </div>
      </div>
        <h3 className='uppercase font-semibold text-center rounded-md bg-[#031e49] p-2 py-1 absolute top-[39%] sm:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-700'>Grade 4</h3>
    </GradeCard>,
  ].map((divContent, index) => (
    <div key={index}>
      {divContent}
    </div>
  ));

  const customDivs = [
    <ServiceCard key="1">
      <div >
        <Image
          src="/estate.jpg"
          alt='Winner 2018'
          width={300}
          height={200}
          layout='responsive'
          // objectFit='contain'
        />
      </div>
      <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2'>
        <h2 className='font-semibold text-[#d89c37]'>Real Estate</h2>
        <p className='text-slate-400 text-sm'>
          This involves the purchase, management, rental and/or sale of real estate for profit. Improvement of realty property as part of a real estate investment strategy is generally considered to be a sub-specialty of real estate investing.
        </p>
      </div>
      <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>1</div>
    </ServiceCard>,

    <ServiceCard key="2">
    <div >
      <Image
        src="/gold.jpg"
        alt='Winner 2018'
        width={300}
        height={200}
        layout='responsive'
        // objectFit='contain'
      />
    </div>
    <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2'>
      <h2 className='font-semibold text-[#d89c37]'>Gold</h2>
      <p className='text-slate-400 text-sm'>
        This involves the purchase, management, rental and/or sale of real estate for profit. Improvement of realty property as part of a real estate investment strategy is generally considered to be a sub-specialty of real estate investing.
      </p>
    </div>
    <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>2</div>
  </ServiceCard>,

    <ServiceCard key="3">
    <div >
      <Image
        src="/cannabis.jpg"
        alt='Winner 2018'
        width={300}
        height={200}
        layout='responsive'
        // objectFit='contain'
      />
    </div>
    <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2'>
      <h2 className='font-semibold text-[#d89c37]'>Medical Cannabis</h2>
      <p className='text-slate-400 text-sm'>
        For many years we have been working conscientiously and with the most diverse technologies and means. We have completed numerous investments across multiple verticals and sectors in the cannabis industry.

      </p>
    </div>
    <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>3</div>
  </ServiceCard>,

    <ServiceCard key="4">
    <div >
      <Image
        src="/oil.jpg"
        alt='Winner 2018'
        width={300}
        height={200}
        layout='responsive'
        // objectFit='contain'
      />
    </div>
    <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2'>
      <h2 className='font-semibold text-[#d89c37]'>Oil & Gas</h2>
      <p className='text-slate-400 text-sm'>
        Surprising as it might be, anyone can invest in the oil and gas market to make a profit. Indeed, the development of online trading platforms has allowed individuals to use their savings to speculate on rising or falling oil prices.
      </p>
    </div>
    <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>4</div>
  </ServiceCard>,

    <ServiceCard key="5">
    <div >
      <Image
        src="/crypto.jpg"
        alt='Winner 2018'
        width={300}
        height={200}
        layout='responsive'
        // objectFit='contain'
      />
    </div>
    <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2'>
      <h2 className='font-semibold text-[#d89c37]'>Crypto & Forex</h2>
      <p className='text-slate-400 text-sm'>
        Crypto trading is the buying and selling of digital assets, such as cryptocurrencies, tokens and NFTs (non-fungible tokens). Forex trading means swapping one fiat currency for another in the hope the currency will rise in value.
      </p>
    </div>
    <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>5</div>
  </ServiceCard>,

    <ServiceCard key="6">
    <div >
      <Image
        src="/agric.jpg"
        alt='Winner 2018'
        width={300}
        height={200}
        layout='responsive'
        // objectFit='contain'
      />
    </div>
    <div className='text-center bg-[#031e49] py-5 p-2 flex flex-col gap-2 '>
      <h2 className='font-semibold text-[#d89c37]'>Agriculture</h2>
      <p className='text-slate-400 text-sm'>
        Investing in agriculture means putting your money behind food and crop production, processing, and distribution. As the world needs to feed a growing population and with less land, interest in agriculture production increases.
      </p>
    </div>
    <div className='text-center font-semibold w-9 h-9 rounded-sm bg-[#031e49] text-white p-2 absolute top-[47.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>6</div>
  </ServiceCard>,

  ].map((divContent, index) => (
    <ServiceCard key={index}>
      {divContent}
    </ServiceCard>
  ));



  
  /* eslint-disable react/no-unescaped-entities */
  return (
    <DepositProvider>
      <ChakraProvider>
        <div className='bg-[#010c1e] relative h-[100vh] '>
        <NavigationBar/>
          <div className="bg-[#010c1e] text-white px-7 md:px-10 sm:pt-[90px] pt-[5px] lg:pt-[0px]">
            <div className="md:mx-[5%] flex flex-col"> 

              {/* HERO SECTION */}
              <div className="lg:grid lg:grid-cols-2 flex flex-col  items-center justify-center md:gap-12 gap-5 h-screen">
                <div className="flex flex-col items-start md:gap-12 gap-5 ">
                  <h1 className="uppercase font-bold md:text-5xl leading-normal lg:leading-[60px] text-4xl text-[#a7e6ff]  ">High quality <br/> Investment <br/> services</h1>
                  <p>PrimeBullTrade provides you with multiple investment options to get you on the right track financially</p>
                  <Link href="/register">
                    <Button variant="destructive" size="lg" >Register</Button>
                  </Link>
                </div>
                <div >
                <Image
                    src="/chart.jpg"
                    alt=""
                    width={1200} // Desired aspect ratio width
                    height={800}  // Desired aspect ratio height
                    layout="responsive"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Plans */}
              <div className="my-20 mt-10 flex flex-col items-center md:grid md:grid-cols-3 md:gap-[10vw] grid-cols-1 ">

                <div className="flex flex-col gap-3 md:gap-5 md:text-left text-center">
                  <h3 className="text-[#0043b3] text-[7vw] md:text-3xl font-bold">PrimeBullTrade Trade</h3>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[7vw] md:text-[3vw] font-medium ">Trusted and Secured</h1>
                    <p className='text-slate-400 '>Because PrimeBullTrade manages the asset themselves, investors can gain exposure to digital currency investing without any challenges.</p>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between ">
                  <Carousel 
                  className="w-[70vw] md:w-[50vw] "
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-1 flex items-center justify-between">
                    {plans.map((divContent, index) => (
                      <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2  flex justify-around">
                        {divContent}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  </Carousel>
                </div>
              </div>

              {/* How it works  */}
              <SectionCardContent>
                {/* Header */}
                <div>
                  <h1 className='uppercase text-3xl font-semibold'>How it Works</h1>
                </div>

                {/* Content */}
                <div className='flex sm:grid lg:grid-cols-3 md:grid-cols-2 flex-col gap-5  items-center'>
              
                    <WorksCardContent>
                      <Image
                        src='/handshake.png'
                        alt="become a member"
                        width={200}
                        // layout='responsive'
                        height={200}
                      />
                      <div className='flex flex-col gap-3'>
                        <h2 className='uppercase font-semibold text-xl'>1. Become A Member</h2>
                        <p className='font-light text-sm text-wrap text-slate-400'>Becoming a member of PrimeBullTrade is easy. Please register on our website & follow the instructions.</p>
                      </div>
                    </WorksCardContent>
                    
                  
                    <WorksCardContent>
                      <Image
                        src='/stashing.png'
                        alt="become a member"
                        width={150}
                        // layout='responsive'
                        height={200}
                      />
                      <div className='flex flex-col gap-3'>
                        <h2 className='uppercase font-semibold text-xl'>2. Make Deposit</h2>
                        <p className='font-light text-sm text-wrap text-slate-400'>Choose an investment plan and payment system that will be used for depositing and withdrawing your funds.</p>
                      </div>
                    </WorksCardContent>
                    
                  
                    <WorksCardContent>
                      <Image
                        src='/withdraw.png'
                        alt="become a member"
                        width={150}
                        // layout='responsive'
                        height={200}
                      />
                      <div className='flex flex-col gap-3'>
                        <h2 className='uppercase font-semibold text-xl'>3. Withdraw</h2>
                        <p className='font-light text-sm text-wrap text-slate-400'>After your investment, you will receive your profit which you can withdraw to your personal cryptocurrency wallet.</p>
                      </div>
                    </WorksCardContent>
                    
                  
                </div>

                {/* Button */}

                <div>
                <Link href="/register"> 
                  <Button variant="destructive" size="lg" >Register</Button>
                </Link>
                </div>
                </SectionCardContent>

              {/* Offers */}
              <section className='my-5 mt-10 flex flex-col items-center gap-12 '>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent>Boost Offers</HeaderContent>
                  <HeaderContentTwo>What we offer</HeaderContentTwo>
                </HeaderContainer>

                {/* Offers Content */}

                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
                  <OfferCardContent>
                    <div className='h-[200px]'>
                        <Image
                          src='/borrow.png'
                          alt="become a member"
                          width={200}
                          // layout='responsive'
                          height={200}
                        />
                      </div>
                      <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg sm:text-xl'>PrimeBullTrade Loan Program</h1>
                        <p className='font-light text-sm'>PrimeBullTrade offers loan to all investors for various purposes. To become eligible for the PrimeBullTrade loan offer you have to be an active investor with up to $25k worth of investment in your PrimeBullTrade investment account.</p>
                      </div>
                  </OfferCardContent>


                  <OfferCardContent>
                    <div className='h-[200px]'>
                        <Image
                          src='/shareholder.png'
                          alt="become a member"
                          width={200}
                          // layout='responsive'
                          height={200}
                        />
                      </div>
                      <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg sm:text-xl'>Ambassador Program</h1>
                        <p className='font-light text-sm'>You can become an PrimeBullTrade ambassador to unlock unique investment options and earn more affiliate rewards. To become eligible, members will need to be active investors in either the Diamond or VIP plan.</p>
                      </div>
                  </OfferCardContent>

                  <OfferCardContent>
                    <div className='h-[200px]'>
                        <Image
                          src='/shareholder.png'
                          alt="become a member"
                          width={200}
                          // layout='responsive'
                          height={200}
                        />
                      </div>
                      <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg sm:text-xl'>PrimeBullTrade Shareholders </h1>
                        <p className='font-light text-sm'>The PrimeBullTrade company shares is a unique financial option where members can invest to earn more rewards. To become eligible for this scheme, members will need to be active investors in the Moon plan.</p>
                      </div>
                  </OfferCardContent>

                  <OfferCardContent>
                    <div className='h-[200px]'>
                        <Image
                          src='/shareholder.png'
                          alt="become a member"
                          width={200}
                          // layout='responsive'
                          height={200}
                        />
                      </div>
                      <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg sm:text-xl'>Recognition Awards</h1>
                        <p className='font-light text-sm'>PrimeBullTrade does not neglect hardworking investors. We observe and award all our active investors with the most referrals every year. Investors that fall in this category receive special rewards and incentives from PrimeBullTrade.</p>
                      </div>
                  </OfferCardContent>

                </div>
              </section>


              {/* Sponsorship */}
              <SectionCardContent>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent><span>Sponsorship Awards</span></HeaderContent>
                  <HeaderContentTwo><span>Previous Winners</span></HeaderContentTwo>
                </HeaderContainer>

                
                {/* Content */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 grid-col-1 gap-5'>
                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div className=''>
                      <Image
                        src="/winner-1.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Heugel Patrick</h2>
                      <p className='text-slate-400'>2020</p>
                    </div>
                  </div>

                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div >
                      <Image
                        src="/winner2.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Fred Stewart</h2>
                      <p className='text-slate-400'>2021</p>
                    </div>
                  </div>

                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div >
                      <Image
                        src="/winner3.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Matteo Fernandez</h2>
                      <p className='text-slate-400'>2022</p>
                    </div>
                  </div>

                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div >
                      <Image
                        src="/winner4.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Engelbrecht Louis</h2>
                      <p className='text-slate-400'>2023</p>
                    </div>
                  </div>
                </div>
              </SectionCardContent>


              {/* Facts */}
              <SectionCardContent>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent><span>Facts</span></HeaderContent>
                  <HeaderContentTwo><span>Numbers Don't Lie</span></HeaderContentTwo>
                </HeaderContainer>

                {/* Content */}
                <GridCardContent>
                  <div className='bg-[#031e49] p-5 w-full flex flex-col gap-3 text-center'>
                    <h2 className='font-semibold text-xl'>$ <CountUp start={0} end={18203728} duration={4} separator="," /></h2>
                    <p className='text-slate-400'>In community assets</p>
                  </div>

                  <div className='bg-[#031e49] p-5 w-full flex flex-col gap-3 text-center'>
                    <h2 className='font-semibold text-xl'><CountUp start={0} end={287649} duration={4} separator="," /></h2>
                    <p className='text-slate-400'>Happy PrimeBullTrade Users</p>
                  </div>

                  <div className='bg-[#031e49] p-5 w-full flex flex-col gap-3 text-center'>
                    <h2 className='font-semibold text-xl'>$ <CountUp start={0} end={7695043} duration={4} separator="," /></h2>
                    <p className='text-slate-400'>Annual Yield Paid</p>
                  </div>

                  <div className='bg-[#031e49] p-5 w-full flex flex-col gap-3 text-center'>
                    <h2 className='font-semibold text-xl'><CountUp start={0} end={172094739} duration={4} separator="," /></h2>
                    <p className='text-slate-400'>Transactions</p>
                  </div>
                </GridCardContent>
              </SectionCardContent>


              {/* Services */}
              <SectionCardContent>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent>Explore</HeaderContent>
                  <HeaderContentTwo>Our Services</HeaderContentTwo>
                </HeaderContainer>
                
                <Carousel 
                  className="w-[70vw] "
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-1 flex items-center justify-between">
                    {customDivs.map((divContent, index) => (
                      <CarouselItem key={index} className="pl-1 h-[400px] md:basis-1/2 lg:basis-1/3 flex justify-around">
                        {divContent}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </SectionCardContent>

              {/* Testimonials */}
              <SectionCardContent>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent>Testimonial</HeaderContent>
                  <HeaderContentTwo>What clients say</HeaderContentTwo>
                </HeaderContainer>

                <Carousel 
                  className="w-[70vw] "
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-1  flex items-center justify-between">
                    {testimonial.map((divContent, index) => (
                      <CarouselItem key={index} className="pl-1 h-[500px] md:basis-1/2 lg:basis-1/3 flex justify-around">
                        {divContent}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </SectionCardContent>

              {/* Meet the team */}
              <SectionCardContent>
                {/* Header */}
                <HeaderContainer>
                  <HeaderContent>Team</HeaderContent>
                  <HeaderContentTwo>Meet the crew</HeaderContentTwo>
                </HeaderContainer>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 grid-col-1 gap-5'>
                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div className=''>
                      <Image
                        src="/ceoMain.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Larry Fink</h2>
                      <p className='text-slate-400'>CEO & Founder</p>
                    </div>
                  </div>

                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div >
                      <Image
                        src="/CEO3.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Anthony Nathan</h2>
                      <p className='text-slate-400'>Public Relations Officer</p>
                    </div>
                  </div>

                  <div className='flex flex-col  relative w-full transition-all ease-in-out duration-300 hover:scale-105'>
                    <div >
                      <Image
                        src="/CEO2.jpg"
                        alt='Winner 2018'
                        width={300}
                        height={200}
                        layout='responsive'
                        // objectFit='contain'
                      />
                    </div>
                    <div className='flex flex-col bg-[#031e49] p-3 text-center gap-1'>
                      <h2 className='text-2xl'>Samuel Dzue</h2>
                      <p className='text-slate-400'>Manager</p>
                    </div>
                  </div>
                </div>
              </SectionCardContent>

              {/* Contact Us */}
              <div className='my-20 mt-10 flex flex-col items-center gap-12 md:border rounded-xl py-2'>
                  {/* Header */}
                  <HeaderContainer>
                    <HeaderContentTwo>Contact us</HeaderContentTwo>
                  </HeaderContainer>

                  <div className='flex gap-10 md:gap-[150px] md:justify-between md:flex-row flex-col p-2 '>
                    <div className='flex flex-col gap-4 text-center'>
                      <h2 className='font-bold text-xl'>Get in Touch</h2>
                      <div>
                        <p className=''>Phone Number: +447462136787</p>
                        <p className=''>Email: primebultradeinvestco@gmail.com</p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 text-center md:w-[400px] '>
                      <h2 className='font-bold text-xl'>Send Us An Email</h2>
                      <form action="" className='flex flex-col gap-3 text-white'>
                        <Input type="text" className='p-1 rounded-sm  outline-none text-sm bg-white' placeholder='Name' />
                        <Input type="email" className='p-1 rounded-sm  outline-none text-sm' placeholder='abc@gmail.com'/>
                        <Input type="text" className='p-1 rounded-sm  outline-none text-sm' placeholder='Subject'/>
                        <input type="submit" value="Submit" className='bg-white w-fit text-black p-1 px-6 cursor-pointer text-sm rounded-sm font-semi-bold mx-auto border hover:bg-transparent hover:text-white transition duration-300 ' />
                      </form>
                    </div>
                  </div>
              </div>

              {/* Footer */}
              <SectionCardContent>
                <div className="flex items-center ">
                  <ChartCandlestick size={24} color='#e99a2b' stroke="#e99a2b" strokeWidth={2}/> 
                  <div className="uppercase font-semibold font-mono text-2xl ">primebullTrade</div> 
                </div>

                <div className='flex gap-4'>
                  <Button variant="default" size="icon">
                    <FaTelegramPlane size={21}/>
                  </Button>
                  
                  <a 
                    href="https://wa.me/+1(918)442-0971?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services" 
                    target="_blank" 
                    rel="noopener noreferrer">
                      <Button variant="default" size="icon">
                        <FaWhatsapp size={21}/>
                      </Button>
                  </a>
                </div>

                <div className='capitalize flex gap-2 text-sm sm:text-base'>
                    <p className='cursor-pointer hover:text-[#0641B6]'>
                    <Link href="/legal">legal</Link>
                    </p>|
                  <p className='cursor-pointer hover:text-[#0641B6]'><Link href="/privacy">privacy policy</Link></p>|
                  <p className='cursor-pointer hover:text-[#0641B6]'><Link href="/terms">terms & conditions</Link></p>
                  
                </div>
              </SectionCardContent>
            </div>

{/* https://wa.me/message/JG2UIRB2DVQNF1 */}
          </div>
          <div className='fixed bottom-0 left-0 z-50 text-white bg-green-600 p-2 sm:p-2 rounded-full flex items-center gap-1 cursor-pointer m-4'>
        <a 
          href="https://wa.me/message/JG2UIRB2DVQNF1" 
          target="_blank" 
          rel="noopener noreferrer"
          className='flex items-center gap-1'>
          <FaWhatsapp size={23} />
          <p className='text-sm sm:text-base'>Help Desk!</p>
        </a>
      </div>
        </div>
      </ChakraProvider>
    </DepositProvider>
  );
}

{/* <Link href="/terms"> </Link> */}

// 
