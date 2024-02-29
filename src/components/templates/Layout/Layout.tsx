import { Header, Footer } from "../../organisms"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section className="min-h-[72vh]">
      {children}
      </section>
      <Footer />
    </>
  )
}

export default Layout
