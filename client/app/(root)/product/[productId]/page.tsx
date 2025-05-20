import { getProduct } from '@/actions/user.action'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth-options'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import BuyButton from './_components/buy-button'
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
	const session = await getServerSession(authOptions)

	const isLoggedIn = !!session?.currentUser

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
						<BuyButton isLoggedIn={isLoggedIn} />
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
