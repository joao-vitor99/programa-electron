import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LOG_LEVEL, logger } from './logger'
import { parseEnv } from './parseEnv'

const cn = (...args: Parameters<typeof clsx>) => twMerge(clsx(args))

export { LOG_LEVEL, cn, logger, parseEnv }
