import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'

async function Layout({ children }: ChildProps) {
	const session = await getServerSession(authOptions)

	return (
		<div>
			<Navbar session={session} />
			<main className='mt-44 flex justify-center'>{children}</main>
		</div>
	)
}

export default Layout
