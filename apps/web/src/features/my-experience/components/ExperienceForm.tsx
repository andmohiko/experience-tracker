import { zodResolver } from '@hookform/resolvers/zod'
import { NumberInput } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { Controller, useForm } from 'react-hook-form'

import type { CreateExperienceInputType } from '~/features/my-experience/types'
import { createExperienceSchema } from '~/features/my-experience/types'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { TitleText } from '~/components/Typography/TitleText'
import { useCreateExperienceMutations } from '~/features/my-experience/hooks/useCreateExperienceMutations'

export const ExperienceForm = (): React.ReactNode => {
  const { showErrorToast, showSuccessToast } = useToast()
  const { createExperience } = useCreateExperienceMutations()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateExperienceInputType>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: {
      points: 0,
      time: '',
    },
  })

  const submit = async (data: CreateExperienceInputType) => {
    try {
      await createExperience(data)
      showSuccessToast('経験値を貯めました')
    } catch (e) {
      showErrorToast(errorMessage(e))
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TitleText level={3} text="経験値を貯める" />
      <FlexBox gap={24} align="stretch">
        <FlexBox gap={16} align="stretch">
          <TimeInput
            label="稼働時間"
            {...register('time')}
            w={80}
            error={errors.time?.message}
          />
          <Controller
            name="points"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="消化ポイント"
                description="Linearのチケットのポイント"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                error={errors.points?.message}
              />
            )}
          />
        </FlexBox>

        <BasicButton type="submit" loading={isSubmitting}>
          保存
        </BasicButton>
      </FlexBox>
    </form>
  )
}
