import type { MantineSize } from '@mantine/core'
import { ActionIcon } from '@mantine/core'

type Props = {
  icon: React.ReactNode
  onClick?: () => void
  size: MantineSize
  bgColor?: string
  ariaLabel?: string
}

export const IconButton = ({
  icon,
  onClick,
  size = 'md',
  bgColor,
  ariaLabel,
}: Props): React.ReactElement => {
  return (
    <ActionIcon
      onClick={onClick}
      aria-label={ariaLabel}
      color={bgColor}
      size={size}
    >
      {icon}
    </ActionIcon>
  )
}
