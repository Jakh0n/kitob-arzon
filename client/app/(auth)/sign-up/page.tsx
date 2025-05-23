'use client'

import { register, sendOtp, verifyOtp } from '@/actions/auth-action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { otpSchema, registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignUpPage = () => {
	const [isResend, setIsResend] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)
	const { isLoading, setIsLoading, onError } = UseAction()
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', fullName: '' },
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: '' },
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)
		const res = await sendOtp({ email: values.email })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Xatolik yuz berdi')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'OTP yuborildi' })
			setIsVerifying(true)
			setIsLoading(false)
			setIsResend(false)
		}
	}

	async function onVerify(values: z.infer<typeof otpSchema>) {
		setIsLoading(true)
		const res = await verifyOtp({
			otp: values.otp,
			email: form.getValues('email'),
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Xatolik yuz berdi')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 301) {
			setIsResend(true)
			setIsLoading(false)
			toast({ description: 'OTP vaqti o&apos;tgan. Iltimos, OTP yuboring' })
		}
		if (res.data.status === 200) {
			const response = await register(form.getValues())
			if (
				response?.serverError ||
				response?.validationErrors ||
				!response?.data
			) {
				return onError('Xatolik yuz berdi')
			}
			if (response.data.failure) {
				return onError(response.data.failure)
			}
			if (response.data.user._id) {
				toast({ description: 'User yaratildi' })
				signIn('credentials', {
					userId: response.data.user._id,
					callbackUrl: '/',
				})
			}
		}
	}

	return (
		<Card className='max-md:w-full w-1/2 p-4'>
			<h1 className='text-xl font-bold'>Ro&apos;yxatdan otish</h1>
			<p className='text-muted-foreground text-sm'>
				Arzon<span className='font-semibold text-primary'>Kitob</span> tizimiga
				kirish
			</p>
			<Separator className='my-3' />
			<Form {...form}>
				<form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>To&apos;liq ism</Label>
								<FormControl>
									<Input placeholder='Osman Ali' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Email</Label>
								<FormControl>
									<Input placeholder='namuna@gmail.com' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Parol</Label>
								<FormControl>
									<Input placeholder='****' type='password' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					{!isVerifying && (
						<Button disabled={isLoading} type='submit'>
							Ro&apos;yxatdan otish{' '}
							{isLoading && <Loader className='animate-spin' />}
						</Button>
					)}
				</form>
			</Form>
			{isVerifying && (
				<Form {...otpForm}>
					<form
						className='mt-2 space-y-2'
						onSubmit={otpForm.handleSubmit(onVerify)}
					>
						<FormField
							control={otpForm.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='w-full space-y-0'>
									<Label>OTP kiriting</Label>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage className='text-red-500 text-xs' />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-1'>
							<Button disabled={isLoading || isResend} type='submit'>
								Tasdiqlash {isLoading && <Loader className='animate-spin' />}
							</Button>
							{isResend && (
								<Button
									disabled={isLoading}
									onClick={() => onSubmit(form.getValues())}
									type='button'
								>
									OTP yuborish{' '}
									{isLoading && <Loader className='animate-spin' />}
								</Button>
							)}
						</div>
					</form>
				</Form>
			)}
			<div className='mt-4'>
				<div className='text-sm text-muted-foreground'>
					Hisobingiz bormi?{' '}
					<Button asChild variant={'link'} className='p-0'>
						<Link href='/sign-in'>Tizimga kirish</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default SignUpPage
