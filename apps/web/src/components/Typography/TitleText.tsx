import { Title } from '@mantine/core'

type Props = {
  text: string
  level?: 1 | 2 | 3
}

export const TitleText = ({ text, level = 1 }: Props): React.ReactElement => {
  return (
    <Title order={level} style={{ marginBottom: 16 }}>
      {text}
    </Title>
  )
}
