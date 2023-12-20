import React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import "../globals.css"

export const metadata: Metadata = {
  title: "Auth Threads",
	description: "Genarated by create next app"
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ 
	children 
}: { children: React.ReactNode 
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-dark-1 text-white`}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}