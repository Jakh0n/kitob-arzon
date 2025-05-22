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
import { toast } from '@/hooks/use-toast'
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

		fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
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
		})
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast({
			title: 'Buyurtma yuborildi',
			description: 'Biz siz bilan tez orada bog&apos;lanamiz',
		})
	}

	return (
		<div className='container mx-auto bg-gradient-to-b from-white to-green-50 px-4 py-12 dark:from-slate-900 dark:to-slate-800 md:px-6'>
			<h1 className='mb-4 text-center text-4xl font-bold text-green-800 dark:text-green-400'>
				Kitob buyurtma berish
			</h1>
			<p className='mx-auto mb-10 max-w-2xl text-center text-gray-600 dark:text-gray-300'>
				Sevimli kitobingizni tanlang va bizga buyurtma bering! Biz siz bilan tez
				orada bog&apos;lanamiz.
			</p>

			<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
				{/* Left Column - Information */}
				<div className='flex flex-col justify-center'>
					<Card className='relative overflow-hidden border-0 bg-white shadow-lg dark:bg-slate-900'>
						<div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-green-400 to-green-600'></div>
						<CardContent className='pt-8'>
							<h2 className='mb-6 flex items-center text-2xl font-semibold text-green-800 dark:text-green-400'>
								<BookOpen className='mr-2 size-6' /> Kitoblar dunyosiga xush
								kelibsiz
							</h2>

							<p className='mb-8 text-gray-600 dark:text-gray-300'>
								Bizning kutubxonamizda siz eng sara kitoblarni topishingiz
								mumkin. Maʼnaviy ozuqa olish va bilimlaringizni oshirish uchun
								ajoyib imkoniyat!
							</p>

							<div className='space-y-6'>
								<div className='flex items-start space-x-4 rounded-lg bg-green-50 p-4 dark:bg-slate-800'>
									<Star className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
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
									<ShoppingCart className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Buyurtma berish oson
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											Kitob nomini va telefon raqamingizni yozib, bizga
											yuborishingiz yetarli. Qolganini biz hal qilamiz!
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Phone className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Bizga qo&apos;ng&apos;iroq qiling
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											+998 90 123 45 67
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Clock className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
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
					<Card className='relative overflow-hidden border-0 bg-white shadow-lg dark:bg-slate-900'>
						<div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-green-400 to-green-600'></div>
						<CardContent className='pt-8'>
							<h2 className='mb-6 text-2xl font-semibold text-green-800 dark:text-green-400'>
								Kitob buyurtma berish
							</h2>

							<Form {...form}>
								<form
									className='space-y-6'
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='relative'>
														<Input
															className='border-green-200 bg-green-50 pl-10 focus:border-green-400 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-green-500'
															disabled={isLoading}
															placeholder='Kitob nomi'
															{...field}
														/>
														<BookOpen className='absolute left-3 top-2.5 size-5 text-green-500' />
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
															className='border-green-200 bg-green-50 pl-10 focus:border-green-400 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-green-500'
															disabled={isLoading}
															placeholder='Telefon raqamingiz'
															{...field}
														/>
														<Phone className='absolute left-3 top-2.5 size-5 text-green-500' />
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
															className='h-32 resize-none border-green-200 bg-green-50 pl-10 pt-8 focus:border-green-400 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-green-500'
															disabled={isLoading}
															placeholder="Qo'shimcha ma'lumotlar (kitob muallifi, nashriyot va boshqa)"
															{...field}
														/>
														<MessageSquare className='absolute left-3 top-2.5 size-5 text-green-500' />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										className='w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
										disabled={isLoading}
										size='lg'
										type='submit'
									>
										<span>Buyurtma berish</span>
										<Send className='ml-2 size-4' />
									</Button>
								</form>
							</Form>

							<div className='mt-6 text-center text-sm text-gray-500 dark:text-gray-400'>
								Buyurtmangizni qabul qilganimizdan so&apos;ng, 24 soat ichida
								siz bilan bog&apos;lanamiz
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
