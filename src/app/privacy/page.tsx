import React from 'react'
import { NavigationBar } from "@/components/ui/navBar";
import Image from 'next/image';
import { ChakraProvider } from '@chakra-ui/react';

const page = () => {
  /* eslint-disable react/no-unescaped-entities */
  return (
    <ChakraProvider>
      <div className='bg-[#010c1e]'>
        <NavigationBar/>
        <section className="text-white  ">
          <div className='flex flex-col '>
            <div 
              style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/privacy.avif')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                
              }}
              className='mt-11 h-[25vh] sm:h-[35vh] flex items-center justify-around'
            >
              <div> 
                <h1 className='sm:font-bold font-semibold text-3xl sm:text-4xl'>Privacy Policy</h1>
              </div>
            </div>
            <div className='bg-[#001638]  m-4 rounded-xl p-5 uppercase flex flex-col gap-5'>

                <h3 className='capitalize text-slate-300 font-semibold text-lg'>Privacy Policy for PrimeBullTrade</h3>
              <div className='flex flex-col gap-1'>
                <p className='text-slate-400'>
                At PrimeBullTrade, accessible from https://PrimeBullTrade.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PrimeBullTrade and how we use it.

                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in PrimeBullTrade. This policy is not applicable to any information collected offline or via channels other than this website.
                </p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Consent</h3>
                <p className='text-slate-400'>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Information we collect</h3>
                <p className='text-slate-400'>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>How we use your information</h3>
                <p className='text-slate-400'>We use the information we collect in various ways, including to:

                Provide, operate, and maintain our website
                Improve, personalize, and expand our website
                Understand and analyze how you use our website
                Develop new products, services, features, and functionality
                Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
                Send you emails
                Find and prevent fraud</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Log Files</h3>
                <p className='text-slate-400'>PrimeBullTrade follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users movement on the website, and gathering demographic information.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Cookies and Web Beacons</h3>
                <p className='text-slate-400'>Like any other website, PrimeBullTrade uses cookies. These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users experience by customizing our web page content based on visitors browser type and/or other information.

                For more general information on cookies, please read the Cookies article on Generate Privacy Policy website.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Advertising Partners Privacy Policies</h3>
                <p className='text-slate-400'>You may consult this list to find the Privacy Policy for each of the advertising partners of PrimeBullTrade.

                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PrimeBullTrade, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.

                Note that PrimeBullTrade has no access to or control over these cookies that are used by third-party advertisers.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Third Party Privacy Policies</h3>
                <p className='text-slate-400'>PrimeBullTrade’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
                <p className='text-slate-400'>Under the CCPA, among other rights, California consumers have the right to:

                Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.

                Request that a business delete any personal data about the consumer that a business has collected.

                Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.

                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>GDPR Data Protection Rights</h3>
                <p className='text-slate-400'>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

                The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

                The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

                The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

                The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

                The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

                The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-slate-300 font-semibold text-lg'>Children’s Information</h3>
                <p className='text-slate-400'>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

                PrimeBullTrade does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ChakraProvider>
  )
}

export default page