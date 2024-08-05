import { useEffect } from 'react';
import { useRouter } from 'next/router';

const usePreventBack = () => {
  const router = useRouter();

  useEffect(() => {
    // Push a new state to prevent going back
    window.history.pushState(null, '', window.location.pathname);

    const handlePopState = () => {
      router.push('/'); // Redirect to home or any other page
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);
};

export default usePreventBack;