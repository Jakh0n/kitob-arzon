import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import Sidebar from './_components/sidebar'

async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) redirect('/sign-in')
	if (session.currentUser?.role !== 'admin') return redirect('/')

	return (
		<div>
			<Navbar />
			<div className='grid grid-cols-3 gap-4'>
				<div className='col-span-1'>
					<Sidebar />
				</div>
				<div className='col-span-2 pb-10'>
					<NextTopLoader />
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
