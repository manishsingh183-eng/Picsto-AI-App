import React from 'react'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth"><div className={"flex w-full min-h-screen"}>
      <div className={"relative w-1/2 min-h-screen"}>
        <Image 
          src="/assets/images/bg_image.jpg"
          alt="Authentication background"
          fill
          sizes="50vw"
          priority
          className="object-cover min-h-screen"
        />
      </div>
      <div className={"flex-center mx-auto"}>
        {children}
      </div>
    </div>

    </main>
  )
}

export default Layout
