"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/common/Icons"

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button variant="ghost" size="sm" className="h-9 w-9 px-0 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
				<div className="h-4 w-4" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		)
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			className="h-9 w-9 px-0 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<Icons.Sun className="h-4 w-4" />
			) : (
				<Icons.Moon className="h-4 w-4" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
