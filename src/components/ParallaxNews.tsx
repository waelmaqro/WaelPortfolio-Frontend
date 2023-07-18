import React from 'react'

export default function ParallaxNews() {

  return (
    <div className="fixed w-[100%] h-[100%] z-40">
      <img className={`relative top-[40%] z-40`} src='/news.gif' alt="hand waving newspaper" />
    </div>
  )
}
