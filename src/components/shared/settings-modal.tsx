import { useMedia } from 'react-use'

import { Settings } from 'lucide-react'

import { Label } from '../ui/label'
import { useTheme } from '../ui/theme-provider'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { weatherModels } from '@/config'
import { useUserLocality } from '@/hooks/useUserLocality'

export function SettingsModal() {
	const { theme, setTheme } = useTheme()
	const [weatherModel, setWeatherModel] = useUserLocality((state) => [
		state.weatherModel,
		state.setWeatherModel,
	])

	const isMobile = useMedia('(max-width: 768px)')

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button variant='outline' size='icon' className='xl:hidden'>
						<Settings size={16} />
					</Button>
				</DrawerTrigger>
				<DrawerContent className='rounded-t-3xl border-none sm:max-w-[425px]'>
					<DrawerHeader>
						<DrawerTitle>Настройки</DrawerTitle>
					</DrawerHeader>
					<div className='flex items-center space-x-2 p-4'>
						<div className='grid flex-1 gap-4'>
							<Label htmlFor='theme'>Тема</Label>
							<Select value={theme} onValueChange={setTheme}>
								<SelectTrigger>
									<SelectValue placeholder='Тема' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='light'>Светлая</SelectItem>
									<SelectItem value='dark'>Темная</SelectItem>
									<SelectItem value='system'>Системная</SelectItem>
								</SelectContent>
							</Select>
							<Label htmlFor='weather-model'>Погодная модель</Label>
							<Select
								defaultValue='default'
								value={weatherModel}
								onValueChange={(value) => setWeatherModel(value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Погодная модель' />
								</SelectTrigger>
								<SelectContent>
									{weatherModels.map((model) => (
										<SelectItem key={model.name} value={model.value}>
											{model.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter className='p-4'>
						<DialogClose asChild>
							<Button>Готово</Button>
						</DialogClose>
					</DialogFooter>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='icon' className='min-xl:hidden'>
					<Settings size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className='rounded-3xl sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Настройки</DialogTitle>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-4'>
						<Label htmlFor='theme'>Тема</Label>

						<Select value={theme} onValueChange={setTheme}>
							<SelectTrigger>
								<SelectValue placeholder='Тема' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='light'>Светлая</SelectItem>
								<SelectItem value='dark'>Темная</SelectItem>
								<SelectItem value='system'>Системная</SelectItem>
							</SelectContent>
						</Select>

						<Label htmlFor='weather-model'>Погодная модель</Label>

						<Select
							defaultValue='default'
							value={weatherModel}
							onValueChange={(value) => setWeatherModel(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder='Погодная модель' />
							</SelectTrigger>
							<SelectContent>
								{weatherModels.map((model) => (
									<SelectItem key={model.name} value={model.value}>
										{model.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Закрыть
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
