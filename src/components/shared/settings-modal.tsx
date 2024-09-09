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

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='icon' className='min-xl:hidden'>
					<Settings size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] rounded-3xl'>
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
