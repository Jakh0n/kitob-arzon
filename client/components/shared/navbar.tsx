import { authOptions } from '@/lib/auth-options'
import { User } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './logo'
import ModeToggle from './mode-toggle'
import UserBox from './user-box'

async function Navbar() {
	const session = await getServerSession(authOptions)
	return (
		// <div className='h-20 bg-secondary border-b fixed z-50 inset-0 '>
		// 	<div className='container h-full flex items-center justify-between max-w-6xl'>
		// 		<Logo />
		// 		<div className='flex items-center gap-2 '>
		// 			{session?.currentUser?._id && <UserBox user={session.currentUser} />}
		// 			{!session?.currentUser?._id && (
		// 				<Button asChild size={'icon'}>
		// 					<Link href={'/sign-in'}>
		// 						<User />
		// 					</Link>
		// 				</Button>
		// 			)}
		// 		</div>
		// 	</div>
		// </div>
		<div className='h-[10vh] fixed inset-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-blue-950/30 border-b border-gray-200 dark:border-gray-800 flex items-center'>
			<div className='container mx-auto flex justify-between items-center'>
				<Logo />
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-4 md:gap-6'>
						<Link
							href='/'
							className='text-sm font-medium transition-colors hover:text-primary'
						>
							Home
						</Link>
						<Link
							href='/products'
							className='text-sm font-medium transition-colors hover:text-primary'
						>
							All Products
						</Link>
					</div>

					<ModeToggle />
					<div className='flex items-center gap-2 '>
						{session?.currentUser?._id && (
							<UserBox user={session.currentUser} />
						)}
						{!session?.currentUser?._id && (
							<Button asChild size={'icon'}>
								<Link href={'/sign-in'}>
									<User />
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
