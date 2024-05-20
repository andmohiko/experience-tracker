import type { GetServerSideProps, NextPage } from 'next'

import { UserExperienceContainer } from '~/features/user-experience/components/UserExperienceContainer'

type Props = {
  id: string
}

const UserPage: NextPage<Props> = ({ id }) => {
  return <UserExperienceContainer id={id} />
}

export default UserPage

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { id } = context.query

  if (typeof id !== 'string' || !id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      id,
    },
  }
}
