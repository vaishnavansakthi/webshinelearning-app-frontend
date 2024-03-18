import { Header, Footer } from "../../organisms"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-[#f5f5f5] dark:bg-[#282828]">
        <Header />
        <section className="min-h-[72vh]">{children}</section>
        <Footer />
      </div>
    </>
  )
}

export default Layout
