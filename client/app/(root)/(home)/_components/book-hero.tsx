import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface BookHeroProps {
	featuredBook: IProduct
}

const BookHero = ({ featuredBook }: BookHeroProps) => {
	return (
		<div className='relative overflow-hidden rounded-lg bg-muted py-10 '>
			<div className='container relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5'>
				<div className='flex flex-col justify-center space-y-4 lg:col-span-3'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
							{featuredBook.title}
						</h1>
					</div>
					<p className='max-w-[600px] text-muted-foreground md:text-lg'>
						{featuredBook.description}
					</p>
					<div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
						<Button size='lg' asChild>
							<Link href={`/product/${featuredBook._id}`}>View Book</Link>
						</Button>
						<Button size='lg' variant='outline'>
							{formatPrice(featuredBook.price)}
						</Button>
					</div>
				</div>
				<div className='flex items-center justify-center lg:col-span-2'>
					<div className='relative h-[350px] w-[250px] overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105'>
						<Image
							src={featuredBook.image || '/images/placeholder.jpg'}
							alt={featuredBook.title}
							fill
							className='object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookHero
