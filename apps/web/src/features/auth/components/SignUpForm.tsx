import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'

import type { SignUpInputType } from '~/features/auth/types'
import { signUpSchema } from '~/features/auth/types'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'

export const SignUpForm = (): React.ReactNode => {
  const { signUp } = useFirebaseAuthContext()
  const { showErrorToast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const submit = (data: SignUpInputType) => {
    try {
      signUp(data.email, data.password)
    } catch (e) {
      showErrorToast(errorMessage(e))
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FlexBox gap={48} align="stretch">
        <FlexBox gap={32} align="stretch">
          <TextInput
            label="メールアドレス"
            w="100%"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            label="パスワード"
            w="100%"
            {...register('password')}
            error={errors.password?.message}
          />
          <PasswordInput
            label="パスワード（確認）"
            w="100%"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </FlexBox>
        <FlexBox gap={16} align="stretch">
          <BasicButton type="submit" loading={isSubmitting} fullWidth>
            新規登録
          </BasicButton>
          <BasicButton href="/login" importance="tertiary" fullWidth>
            ログインはこちら
          </BasicButton>
        </FlexBox>
      </FlexBox>
    </form>
  )
}
