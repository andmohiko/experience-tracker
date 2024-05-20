import { useUser } from '~/features/user-experience/hooks/useCreateExperienceMutations'
import { FlexBox } from '~/components/Base/FlexBox'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { UserExperienceTracks } from '~/features/user-experience/components/UserExperienceTracks'

type Props = {
  id: string
}

export const UserExperienceContainer = ({ id }: Props): React.ReactNode => {
  const user = useUser(id)
  return (
    <SimpleLayout>
      {user && (
        <FlexBox mt={40} gap={40} align="stretch">
          <TitleText
            text={`${user?.username}さんのエンジニア経験値`}
            level={2}
          />
          <UserExperienceTracks userId={id} />
        </FlexBox>
      )}
    </SimpleLayout>
  )
}
