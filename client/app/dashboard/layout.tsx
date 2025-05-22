import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Sidebar from './_components/sidebar'

async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) redirect('/sign-in')

	return (
		<div>
			<Navbar session={session} />
			<div className='grid grid-cols-3 gap-4'>
				<div className='col-span-1'>
					<Sidebar />
				</div>
				<div className='col-span-2 pb-10'>{children}</div>
			</div>
		</div>
	)
}

export default Layout
