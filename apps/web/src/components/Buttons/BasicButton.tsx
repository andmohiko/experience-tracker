import { Button } from '@mantine/core'
import Link from 'next/link'

import { isExternalLink } from '~/components/Base/LinkItem'
import type { ButtonImportance, ButtonSize } from '~/components/Buttons/types'
import { getButtonVariant } from '~/components/Buttons/types'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  target?: '_self' | '_blank'
  importance?: ButtonImportance
  color?: string
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  width?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
}

export const BasicButton = ({
  children,
  onClick,
  href,
  target = '_self',
  importance = 'primary',
  color = 'grape.9',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  width,
  fullWidth = false,
  leftIcon,
}: Props): React.ReactElement => {
  // hrefがあるときはaタグとして動作する
  if (href) {
    return isExternalLink(href) ? (
      <Button
        component="a"
        href={href}
        target={target}
        rel="noreferrer noopener"
        variant={getButtonVariant(importance)}
        color={color}
        disabled={disabled}
        loading={loading}
        w={width}
        fullWidth={fullWidth}
        size={size}
        leftSection={leftIcon}
      >
        {children}
      </Button>
    ) : (
      <Link
        href={href}
        target={target}
        style={{
          textDecoration: 'none',
        }}
      >
        <Button
          component="div"
          variant={getButtonVariant(importance)}
          color={color}
          disabled={disabled}
          loading={loading}
          w={width}
          fullWidth={fullWidth}
          size={size}
          leftSection={leftIcon}
        >
          {children}
        </Button>
      </Link>
    )
  }

  // hrefがなければbuttonとして動作する
  return (
    <Button
      onClick={onClick}
      variant={getButtonVariant(importance)}
      color={color}
      disabled={disabled}
      loading={loading}
      type={type}
      w={width}
      fullWidth={fullWidth}
      size={size}
      leftSection={leftIcon}
    >
      {children}
    </Button>
  )
}
