import Link from 'next/link'

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<h2 className='text-2xl font-bold '>
				Arzon<span className='text-primary'>Kitob</span>
			</h2>
		</Link>
	)
}

export default Logo
