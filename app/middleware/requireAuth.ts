import { GetServerSidePropsContext } from 'next';
import { getAccessToken } from '../utils/authHelpers';

export const requireAuth = async (
  context: GetServerSidePropsContext,
  redirectTo = '/login'
) => {
  const token = getAccessToken();

  if (!token) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
