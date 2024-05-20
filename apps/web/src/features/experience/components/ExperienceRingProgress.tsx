import { RingProgress } from '@mantine/core'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicText } from '~/components/Typography/BasicText'

type Props = {
  label: string
  current: number
  target: number
  color: string
}

export const ExperienceRingProgress = ({
  label,
  current,
  target,
  color,
}: Props): React.ReactNode => {
  const progress = (current / target) * 100

  return (
    <RingProgress
      label={<RingLabel label={label} current={current} target={target} />}
      sections={[
        {
          value: progress,
          color,
        },
      ]}
      size={180}
    />
  )
}

type RingLabelProps = {
  label: string
  current: number
  target: number
}

const RingLabel = ({
  label,
  current,
  target,
}: RingLabelProps): React.ReactNode => {
  return (
    <FlexBox gap={4}>
      <BasicText size="sm" fontWeight={400}>
        {label}
      </BasicText>
      <FlexBox direction="row" gap={4}>
        <BasicText size="xl" fontWeight={400}>
          {current}
        </BasicText>
        <BasicText size="xs">/ {target}</BasicText>
      </FlexBox>
    </FlexBox>
  )
}
