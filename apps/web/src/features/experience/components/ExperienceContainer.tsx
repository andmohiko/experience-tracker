import { ExperienceForm } from '~/features/experience/components/ExperienceForm'
import { FlexBox } from '~/components/Base/FlexBox'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { ExperienceTracks } from '~/features/experience/components/ExperienceTracks'

export const ExperienceContainer = (): React.ReactNode => {
  return (
    <SimpleLayout>
      <FlexBox mt={40} gap={40} align="stretch">
        <TitleText text="エンジニア経験値" level={2} />
        <ExperienceForm />
        <ExperienceTracks />
      </FlexBox>
    </SimpleLayout>
  )
}
