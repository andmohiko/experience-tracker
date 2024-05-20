import { SignUpForm } from '~/features/auth/components/SignUpForm'
import { FlexBox } from '~/components/Base/FlexBox'
import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { TitleText } from '~/components/Typography/TitleText'

export const SignUpContainer = (): React.ReactNode => {
  return (
    <SimpleLayout>
      <FlexBox mt={40} gap={40} align="stretch">
        <TitleText text="新規登録" />
        <SignUpForm />
      </FlexBox>
    </SimpleLayout>
  )
}
