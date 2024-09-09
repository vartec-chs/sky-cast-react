import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { LoaderPinwheel, MapPin, Moon, Search, Sun } from 'lucide-react'

import { Button } from '../ui/button'
import { useTheme } from '../ui/theme-provider'
import { Logo } from './logo'
import { SearchInput } from './search-input'
import { SettingsModal } from './settings-modal'
import { useGeolocation } from '@/hooks/useGeolacation'
import { useIpLocality } from '@/hooks/useIpLocality'
import { useUserLocality } from '@/hooks/useUserLocality'
import { cn } from '@/lib/utils'

export const Header: FC = () => {
	const { theme, setTheme } = useTheme()
	const [openSearch, setOpenSearch] = useState(false)

	const isAutoLocality = useUserLocality((state) => state.isAutoLocality)

	const geolocation = useGeolocation({ onError: (error) => toast.error(error) })
	const ipLocality = useIpLocality()

	useEffect(() => {
		if (isAutoLocality) {
			// ipLocality.getLocality()
		}
	}, [])

	return (
		<header className='sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2'>
			<div className='container px-4 flex h-14 max-w-screen-xl items-center justify-between relative'>
				<div
					className={cn(
						'w-full absolute px-4 top-[-100%] right-2 left-0 pointer-events-none transition-all duration-200 invisible opacity-0 ',
						{
							'opacity-100 visible top-2 pointer-events-auto': openSearch,
						},
					)}
					aria-hidden='true'
				>
					<SearchInput onClose={() => setOpenSearch(false)} />
				</div>

				<div className={cn('flex items-center gap-2', { hidden: openSearch })}>
					<Logo className='h-8 w-8' />
					<h1 className='text-2xl font-bold'>SkyCast</h1>
					{ipLocality.loading && <LoaderPinwheel className='animate-spin' size={16} />}
				</div>

				<nav className={cn('flex items-center gap-3', { hidden: openSearch })}>
					<div className='hidden md:block'>
						<SearchInput />
					</div>
					<Button
						variant='outline'
						size='icon'
						className='md:hidden'
						onClick={() => setOpenSearch(true)}
					>
						<Search size={16} />
					</Button>
					<Button
						variant='outline'
						size='icon'
						onClick={geolocation.getLocation}
						disabled={geolocation.loading}
					>
						{geolocation.loading ? (
							<LoaderPinwheel className='animate-spin' size={16} />
						) : (
							<MapPin size={16} />
						)}
					</Button>
					<Button
						className='max-md:hidden'
						variant='outline'
						size='icon'
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
					</Button>
					<SettingsModal />
				</nav>
			</div>
		</header>
	)
}
