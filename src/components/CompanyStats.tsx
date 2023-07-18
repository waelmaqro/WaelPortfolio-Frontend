'use client'

import { motion } from "framer-motion";
import React, { useState } from "react";
import CountUp from 'react-countup'

const StatsElement = ({data, index}: {data: any, index: number}) => {
  const [animationTriggered, setAnimationTriggered] = useState(false)

  return (
    <div key={index} className="flex flex-row flex-wrap justify-center items-center ">
      <div className="flex flex-col gap-[16px] items-center justify-center">

        {/* Stats Number Animation */}
        <CountUp start={0} end={parseInt(data.heading)}>
          {({ countUpRef, start }) => (
            <motion.div
              onViewportEnter={() => {
                // check if triggered already
                if (animationTriggered) return
                // trigger animation only once
                setAnimationTriggered(true)
                start()
              }}
              viewport={{ once: true }}
            >
              <div>
                <span className="font-DM font-bold leading-[125%] text-[85px] text-[#CDA274]" ref={countUpRef} />
              </div>
            </motion.div>
          )}
        </CountUp>

        {/* Stat Description */}
        <p className="text-[22px] font-Jost text-[#4D5053]">{data.body}</p>
      </div>

      {/* Divider */}
      {data.divider.data && (
        <img
          src={data.divider.data.attributes.url}
          alt={data.divider.data.attributes.alternativeText}
          className="lg:px-[70px] md:px-[40px] sm:px-[20px] min-[0px]:hidden min-[850px]:block w-auto h-auto "

        />
      )}

    </div>
  )
}

const CompanyStats = ({ blockData, id }: { blockData: any; id: any }) => {

  return (
    <div
      className="flex flex-col min-[850px]:flex-row justify-center items-center bg-[#F4F0EC] w-full max-w-screen min-[850px]:py-[160px] py-[80px] sm:mb-[200px] xxs:mb-[100px] xxxs:mb-[50px] overflow-hidden"
      key={id}
    >
      {blockData.statComponent.map((stat: any, index: any) => 
        <StatsElement key={index} data={stat} index={index}/>
      )}
    </div>
  );
};

export default CompanyStats;
