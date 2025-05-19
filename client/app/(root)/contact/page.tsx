'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema } from '@/lib/validation/index'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	BookOpen,
	Clock,
	MessageSquare,
	Phone,
	Send,
	ShoppingCart,
	Star,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function BuyBookPage() {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			phone: '',
			message: '',
		},
	})

	function onSubmit(values: z.infer<typeof contactSchema>) {
		setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TETELGRAM_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TETELGRAM_CHAT_ID!

		const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `Kitob nomi: ${values.name}:
Telefon raqami: ${values.phone}:
Xabar: ${values.message}`,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Buyurtma yuborilmoqda...',
			success: 'Buyurtmangiz muvaffaqiyatli yuborildi!',
			error: "Xatolik yuz berdi! Qayta urinib ko'ring.",
		})
	}

	return (
		<div className='container mx-auto py-12 px-4 md:px-6 bg-gradient-to-b from-white to-amber-50 dark:from-slate-900 dark:to-slate-800'>
			<h1 className='text-4xl font-bold text-center mb-4 text-amber-800 dark:text-amber-400'>
				Kitob buyurtma berish
			</h1>
			<p className='text-center mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
				Sevimli kitobingizni tanlang va bizga buyurtma bering! Biz siz bilan tez
				orada bog'lanamiz.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Left Column - Information */}
				<div className='flex flex-col justify-center'>
					<Card className='shadow-lg bg-white dark:bg-slate-900 border-0 overflow-hidden relative'>
						<div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600'></div>
						<CardContent className='pt-8'>
							<h2 className='text-2xl font-semibold mb-6 text-amber-800 dark:text-amber-400 flex items-center'>
								<BookOpen className='h-6 w-6 mr-2' /> Kitoblar dunyosiga xush
								kelibsiz
							</h2>

							<p className='text-gray-600 dark:text-gray-300 mb-8'>
								Bizning kutubxonamizda siz eng sara kitoblarni topishingiz
								mumkin. Maʼnaviy ozuqa olish va bilimlaringizni oshirish uchun
								ajoyib imkoniyat!
							</p>

							<div className='space-y-6'>
								<div className='flex items-start space-x-4 bg-amber-50 dark:bg-slate-800 p-4 rounded-lg'>
									<Star className='h-5 w-5 text-amber-500 mt-1 flex-shrink-0' />
									<div>
										<h3 className='font-medium text-amber-800 dark:text-amber-400'>
											Nega bizni tanlashingiz kerak
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											✓ Eng sifatli kitoblar kolleksiyasi
											<br />
											✓ Qulay va tezkor yetkazib berish
											<br />✓ Hamyonbop narxlar
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<ShoppingCart className='h-5 w-5 text-amber-500 mt-1 flex-shrink-0' />
									<div>
										<h3 className='font-medium text-amber-800 dark:text-amber-400'>
											Buyurtma berish oson
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											Kitob nomini va telefon raqamingizni yozib, bizga
											yuborishingiz yetarli. Qolganini biz hal qilamiz!
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Phone className='h-5 w-5 text-amber-500 mt-1 flex-shrink-0' />
									<div>
										<h3 className='font-medium text-amber-800 dark:text-amber-400'>
											Bizga qo'ng'iroq qiling
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											+998 90 123 45 67
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Clock className='h-5 w-5 text-amber-500 mt-1 flex-shrink-0' />
									<div>
										<h3 className='font-medium text-amber-800 dark:text-amber-400'>
											Ish vaqtimiz
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											Dushanba - Shanba: 9:00 - 18:00
											<br />
											Yakshanba: Dam olish kuni
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Order Form */}
				<div>
					<Card className='shadow-lg bg-white dark:bg-slate-900 border-0 overflow-hidden relative'>
						<div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600'></div>
						<CardContent className='pt-8'>
							<h2 className='text-2xl font-semibold mb-6 text-amber-800 dark:text-amber-400'>
								Kitob buyurtma berish
							</h2>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-6'
								>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='relative'>
														<Input
															placeholder='Kitob nomi'
															disabled={isLoading}
															className='pl-10 bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-slate-700 focus:border-amber-400 dark:focus:border-amber-500'
															{...field}
														/>
														<BookOpen className='absolute left-3 top-2.5 h-5 w-5 text-amber-500' />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='relative'>
														<Input
															placeholder='Telefon raqamingiz'
															disabled={isLoading}
															className='pl-10 bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-slate-700 focus:border-amber-400 dark:focus:border-amber-500'
															{...field}
														/>
														<Phone className='absolute left-3 top-2.5 h-5 w-5 text-amber-500' />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='message'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='relative'>
														<Textarea
															className='resize-none h-32 pl-10 pt-8 bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-slate-700 focus:border-amber-400 dark:focus:border-amber-500'
															placeholder="Qo'shimcha ma'lumotlar (kitob muallifi, nashriyot va boshqa)"
															disabled={isLoading}
															{...field}
														/>
														<MessageSquare className='absolute left-3 top-2.5 h-5 w-5 text-amber-500' />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										className='w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
										size='lg'
										type='submit'
										disabled={isLoading}
									>
										<span>Buyurtma berish</span>
										<Send className='w-4 h-4 ml-2' />
									</Button>
								</form>
							</Form>

							<div className='mt-6 text-sm text-center text-gray-500 dark:text-gray-400'>
								Buyurtmangizni qabul qilganimizdan so'ng, 24 soat ichida siz
								bilan bog'lanamiz
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
