import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main className='max-w-6xl mt-24'>{children}</main>
		</div>
	)
}

export default Layout
