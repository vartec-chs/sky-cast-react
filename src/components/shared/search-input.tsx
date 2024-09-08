import { FC, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useClickAway, useDebounce } from 'react-use'

import { LoaderPinwheel, Search, X } from 'lucide-react'

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

	const onSelect = (value: SecrchLocality) => {
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
					'flex items-center gap-3 w-96 max-md:w-full h-10 border rounded-md p-2 px-3 transition-all relative duration-200 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-10'
				}
			>
				{isLoading ? (
					<LoaderPinwheel size={20} className='text-slate-400 animate-spin absolute left-3' />
				) : (
					<Search size={20} className='text-slate-400 absolute left-3' />
				)}
				<input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					type='text'
					placeholder='Поиск...'
					className='w-full border-0 bg-transparent px-0 text-sm placeholder:text-muted-foreground focus:ring-0 outline-none'
					autoComplete='off'
					onFocus={() => setFocused(true)}
				/>
				<X
					size={20}
					className={cn('cursor-pointer hidden', searchText && focused && 'block')}
					onClick={() => setSearchText('')}
				/>
			</div>

			<div
				ref={ref}
				className={cn(
					'absolute left-0 top-56 rounded-lg bg-slate-50 dark:bg-slate-900 p-2 w-full border invisible opacity-0 transition-all duration-200',
					{
						'visible opacity-100 top-12': focused && searchText,
					},
				)}
			>
				{locality && locality.length ? (
					locality.map((item, index) => (
						<div
							key={index}
							className='flex transition-all duration-200 flex-col gap-2 hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-md cursor-pointer hover:text-sky-500'
							onClick={() => onSelect(item)}
						>
							<p className='text-md'>{item.display_name}</p>
						</div>
					))
				) : (
					<p className='text-md text-center'>Ничего не найдено</p>
				)}
			</div>
		</div>
	)
}
