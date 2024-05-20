import { ExperienceRingProgress } from './ExperienceRingProgress'

import { FlexBox } from '~/components/Base/FlexBox'
import { TitleText } from '~/components/Typography/TitleText'
import { useUserExperiences } from '~/features/user-experience/hooks/useUserExperiences'

const targetHours = 100
const targetPoints = 2 * 100

type Props = {
  userId: string
}

export const UserExperienceTracks = ({ userId }: Props): React.ReactNode => {
  const experiences = useUserExperiences(userId)
  const totalMinutes = experiences.reduce((acc, cur) => acc + cur.minutes, 0)
  const totalPoints = experiences.reduce((acc, cur) => acc + cur.points, 0)

  // 少数2桁で四捨五入する
  const totalHours = Math.round((totalMinutes / 60) * 100) / 100

  return (
    <FlexBox gap={32} align="stretch">
      <TitleText text="今月の経験値" level={3} />
      <FlexBox direction="row" gap={32} align="stretch">
        <ExperienceRingProgress
          label="稼働時間"
          current={totalHours}
          target={targetHours}
          color="blue"
        />
        <ExperienceRingProgress
          label="Linearポイント"
          current={totalPoints}
          target={targetPoints}
          color="yellow"
        />
      </FlexBox>
    </FlexBox>
  )
}
