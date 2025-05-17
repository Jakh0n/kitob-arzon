import SessionProvider from '@/components/providers/session.provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-montserrat',
})

export const metadata: Metadata = {
	title: 'Readopia',
	description: 'Readopia is a platform for reading books',
	icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<SessionProvider>
			<html lang='en' suppressHydrationWarning>
				<body
					className={`${montserrat.variable} overflow-x-hidden antialiased`}
				>
					<div className='container max-w-6xl mt-24'>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</div>
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}
