import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ReactNode, useMemo, useState } from 'react'
import useMeasure from 'react-use-measure'

import { cn } from '@/lib/utils'

type Tab = {
	id: number
	label: string
	content?: ReactNode
}

interface OgImageSectionProps {
	disabled?: boolean
	defaultTab?: number
	tabs: Tab[]
	isNotContent?: boolean
	className?: string
	rounded?: string
	onChange?: (activeTab: number) => void
}

export const AnimationTabs = ({
	disabled,
	tabs,
	className,
	rounded,
	onChange,
	isNotContent,
	defaultTab = 1,
}: OgImageSectionProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab)
	const [direction, setDirection] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)
	const [ref, bounds] = useMeasure()

	const content = useMemo(() => {
		const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content
		return activeTabContent || null
	}, [activeTab, tabs])

	const handleTabClick = (newTabId: number) => {
		if (newTabId !== activeTab && !isAnimating) {
			const newDirection = newTabId > activeTab ? 1 : -1
			setDirection(newDirection)
			setActiveTab(newTabId)
			onChange ? onChange(newTabId) : null
		}
	}

	const variants = {
		initial: (direction: number) => ({
			x: 300 * direction,
			opacity: 0,
			filter: 'blur(4px)',
		}),
		active: {
			x: 0,
			opacity: 1,
			filter: 'blur(0px)',
		},
		exit: (direction: number) => ({
			x: -300 * direction,
			opacity: 0,
			filter: 'blur(4px)',
		}),
	}

	return (
		<div className='flex w-full flex-col items-center'>
			<div
				className={cn(
					'shadow-inner-shadow flex cursor-pointer space-x-1 rounded-lg border border-zinc-200 bg-zinc-50 px-[3px] py-[3.2px] dark:border-slate-700 dark:bg-slate-800',
					className,
					rounded,
				)}
			>
				{tabs.map((tab) => (
					<button
						type='button'
						disabled={disabled}
						key={tab.id}
						onClick={() => handleTabClick(tab.id)}
						className={cn(
							'relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium text-black transition focus-visible:outline-none focus-visible:outline-1 focus-visible:ring-1',
							activeTab === tab.id
								? 'text-black dark:text-white'
								: 'text-slate-500 hover:text-slate-400',
							rounded,
						)}
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						{activeTab === tab.id && (
							<motion.span
								layoutId='bubble'
								className='shadow-inner-shadow absolute inset-0 z-10 rounded-lg border-white/10 bg-zinc-900/40 mix-blend-difference dark:bg-zinc-900'
								// style={rounded ? { borderRadius: 9 } : { borderRadius: 12 }}
								transition={{ type: 'spring', bounce: 0.19, duration: 0.4 }}
							/>
						)}

						{tab.label}
					</button>
				))}
			</div>
			{!isNotContent && (
				<MotionConfig transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}>
					<motion.div
						className='relative mx-auto h-full w-full overflow-hidden'
						initial={false}
						animate={{ height: bounds.height }}
					>
						<div className='p-1' ref={ref}>
							<AnimatePresence
								custom={direction}
								mode='popLayout'
								onExitComplete={() => setIsAnimating(false)}
							>
								<motion.div
									key={activeTab}
									variants={variants}
									initial='initial'
									animate='active'
									exit='exit'
									custom={direction}
									onAnimationStart={() => setIsAnimating(true)}
									onAnimationComplete={() => setIsAnimating(false)}
								>
									{content}
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				</MotionConfig>
			)}
		</div>
	)
}
