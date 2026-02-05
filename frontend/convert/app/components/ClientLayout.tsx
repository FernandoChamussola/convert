"use client"
import { ReactNode } from "react"
import { AuthProvider } from "../context/AuthContext"
import PageLoader from "./PageLoader"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PageLoader />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  )
}
