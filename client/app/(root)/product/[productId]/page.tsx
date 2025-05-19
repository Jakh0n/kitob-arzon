import { getProduct } from '@/actions/user.action'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProductPageProps {
	params: Params
}

export async function generateMetadata({ params }: ProductPageProps) {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	if (!product) {
		return {
			title: 'Mahsulot topilmadi',
			description: "Kechirasiz, so'ralgan mahsulot mavjud emas",
		}
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [{ url: product.image }],
			title: product.title,
			description: product.description,
		},
	}
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	if (!product) return notFound()

	return (
		<div className='container py-12'>
			<div className='grid gap-6 lg:grid-cols-2'>
				<div className='flex items-center justify-center lg:justify-end'>
					<div className='relative h-[500px] w-[350px] overflow-hidden rounded-lg shadow-lg'>
						<Image
							src={product.image || '/images/placeholder.jpg'}
							alt={product.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				</div>
				<div className='flex flex-col justify-center space-y-6'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
							{product.title}
						</h1>
					</div>

					<div className='flex items-center gap-2'>
						<Badge className='w-fit' variant={'secondary'}>
							# {product.category}
						</Badge>
					</div>

					<p className='text-muted-foreground'>{product.description}</p>

					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-2'>
							<span className='font-semibold'>Price:</span>
							<span>{formatPrice(product.price)}</span>
						</div>
					</div>

					<div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
						<Link href={`/contact`}>
							<Button size='lg' variant='secondary' className='bg-green-500'>
								<span className='text-white'>Sotib olish</span>
								<ShoppingCart className='h-4 w-4' />
							</Button>
						</Link>
						<Button size='lg' variant='outline'>
							Add to Wishlist
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductPage
