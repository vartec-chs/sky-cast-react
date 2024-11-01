import { AnimatePresence, motion } from 'framer-motion'
import { FC, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useClickAway, useDebounce } from 'react-use'

import { LoaderPinwheel, Search, Star, X } from 'lucide-react'

import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'
import { searchLocality } from '@/services/searchLocality'
import { SecrchLocality } from '@/types/locality'
import { PropsWithClassName } from '@/types/other'

export type Props = {
	onClose?: () => void
} & PropsWithClassName

export const SearchInput: FC<Props> = ({ className, onClose }) => {
	const [searchText, setSearchText] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [focused, setFocused] = useState(false)
	const ref = useRef(null)

	const [locality, setLocality] = useState<SecrchLocality[]>()

	const setUserLocality = useUserLocality((state) => state.setLocality)

	useDebounce(
		async () => {
			setIsLoading(true)
			await searchLocality(searchText)
				.then((data) => setLocality(data))
				.catch((error) => toast.error(error))
				.finally(() => setIsLoading(false))
		},
		500,
		[searchText],
	)

	useClickAway(ref, () => {
		setFocused(false), onClose && onClose()
	})

	const localStorageFavoriteS = window.localStorage.getItem('favoriteLocality')
	const localStorageFavorite = localStorageFavoriteS && JSON.parse(localStorageFavoriteS)

	const onClickAddFavorite = ({ lat, lon, name }: { lat: string; lon: string; name: string }) => {
		window.localStorage.setItem('favoriteLocality', JSON.stringify({ lat, lon, name }))
	}

	const onClickRemoveFavorite = () => {
		window.localStorage.removeItem('favoriteLocality')
	}

	const onSelect = (value: { display_name: string; lat: string; lon: string }) => {
		setSearchText(value.display_name)
		setUserLocality({ lat: value.lat, lon: value.lon, name: value.display_name })
		setFocused(false)
		onClose && onClose()
	}

	return (
		<div ref={ref} className={cn('relative w-full', className)}>
			<div
				ref={ref}
				className={
					'relative flex h-10 w-96 items-center gap-3 rounded-md border bg-slate-50 p-2 px-3 pl-10 transition-all duration-200 hover:border-slate-300 dark:bg-slate-900 dark:hover:border-slate-700 max-md:w-full'
				}
			>
				{isLoading ? (
					<LoaderPinwheel size={20} className='absolute left-3 animate-spin text-slate-400' />
				) : (
					<Search size={20} className='absolute left-3 text-slate-400' />
				)}
				<input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					type='text'
					placeholder='Поиск...'
					className='w-full border-0 bg-transparent px-0 text-sm outline-none placeholder:text-muted-foreground focus:ring-0'
					autoComplete='off'
					onFocus={() => setFocused(true)}
				/>
				<X
					size={20}
					className={cn('hidden cursor-pointer', searchText && focused && 'block')}
					onClick={() => setSearchText('')}
				/>
			</div>

			<AnimatePresence>
				{focused && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ duration: 0.4, type: 'spring', ease: 'easeIn' }}
						className='absolute left-0 top-12 w-full rounded-lg border bg-slate-50 p-2 dark:bg-slate-900'
					>
						{isLoading ? (
							new Array(3)
								.fill(0)
								.map((_, index) => <Skeleton key={index} className='mb-5 h-8 w-full last:mb-0' />)
						) : locality && locality.length ? (
							locality.map((item, index) => (
								<div
									key={index}
									className={
										'flex cursor-pointer flex-col gap-2 rounded-md border-sky-500 p-2 transition-all duration-200 hover:bg-slate-200 hover:text-sky-500 dark:hover:bg-slate-800'
									}
									onClick={() =>
										onSelect({ lat: item.lat, lon: item.lon, display_name: item.display_name })
									}
								>
									<div className='flex flex-row items-center justify-between'>
										<p className='text-md'>{item.display_name}</p>
										<Button
											onClick={() => onClickAddFavorite(item)}
											variant='ghost'
											size='icon'
											className='ml-2 hover:text-yellow-500'
										>
											<Star size={20} />
										</Button>
									</div>

									{locality.length - 1 !== index && <Separator />}
								</div>
							))
						) : searchText ? (
							<p className='text-md text-center'>Ничего не найдено 😔</p>
						) : localStorageFavorite ? (
							<div
								className={
									'flex cursor-pointer flex-col gap-2 rounded-md border-sky-500 p-2 transition-all duration-200 hover:bg-slate-200 hover:text-sky-500 dark:hover:bg-slate-800'
								}
								onClick={() =>
									onSelect({
										lat: localStorageFavorite.lat,
										lon: localStorageFavorite.lon,
										display_name: localStorageFavorite.name,
									})
								}
							>
								<div className='flex flex-row items-center justify-between'>
									<p className='text-md'>{localStorageFavorite.name}</p>
									<Button
										onClick={() => onClickRemoveFavorite()}
										variant='ghost'
										size='icon'
										className='ml-2 text-yellow-500'
									>
										<Star size={20} />
									</Button>
								</div>
							</div>
						) : (
							<p className='text-md text-center'>Пожалуйста, добавьте город в избранное 🙂</p>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
