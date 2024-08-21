import { useState, useEffect, useCallback } from 'react';

import { useAuthContext } from './use-auth-context';

export const useAuthRedirect = () => {
  const { authenticated } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const checkLoginStatus = useCallback(() => {
    setChecked(authenticated);
  }, [authenticated]);

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkLoginStatus]);

  return checked;
};
