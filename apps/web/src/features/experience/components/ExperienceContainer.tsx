import { ExperienceForm } from './ExperienceForm'

import { SignUpForm } from '~/features/auth/components/SignUpForm'
import { FlexBox } from '~/components/Base/FlexBox'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'

export const ExperienceContainer = (): React.ReactNode => {
  return (
    <SimpleLayout>
      <FlexBox mt={40} gap={40} align="stretch">
        <TitleText text="エンジニア経験値" />
        <ExperienceForm />
      </FlexBox>
    </SimpleLayout>
  )
}
