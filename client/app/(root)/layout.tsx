import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'

async function Layout({ children }: ChildProps) {
	const session = await getServerSession(authOptions)

	return (
		<div>
			<Navbar session={session} />
			<main className='max-w-6xl mt-24'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
