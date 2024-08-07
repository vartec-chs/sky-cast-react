import { Copy, Settings } from 'lucide-react'

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
import { useUserLocality } from '@/hooks/useUserLocality'

const models: { name: string; value: string }[] = [
	{ name: 'По умолчанию', value: 'default' },
	{ name: 'DWD Германия', value: 'icon_seamless' },
	{ name: 'HOAA США', value: 'gfs_seamless' },
	{ name: 'Метео-Франс', value: 'meteofrance_seamless' },
	{ name: 'ЯМА Япония', value: 'jma_seamless' },
	{ name: 'MET Норвегия', value: 'metno_seamless' },
	{ name: 'GEM Канада', value: 'gem_seamless' },
	{ name: 'CMA Китай', value: 'cma_grapes_global' },
	{ name: 'KNMI Нидерланды', value: 'knmi_seamless' },
	{ name: 'ECMWF', value: 'ecmwf_ifs025' },
]

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

						<Select
							defaultValue='default'
							value={weatherModel}
							onValueChange={(value) => setWeatherModel(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder='Погодная модель' />
							</SelectTrigger>
							<SelectContent>
								{models.map((model) => (
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
