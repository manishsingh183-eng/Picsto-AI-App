import React from 'react'
import Image from 'next/image'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth"><div className={"flex w-full min-h-screen"}>
      <div className={"w-1/2 min-h-screen"}>
        <img className={"min-h-screen"} src="/assets/images/bg_image.jpg" alt="" />
      </div>
      <div className={"flex-center mx-auto"}>
        {children}
      </div>
    </div>

    </main>
  )
}

export default Layout
