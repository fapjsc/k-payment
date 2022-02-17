// Media Query
import { useMediaQuery } from 'react-responsive';

const useRwd = () => {
  // Media query
  const isTablets = useMediaQuery({ query: '(max-width: 991px)' });
  // const isTablets = useMediaQuery({ query: '(max-width: 767px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 450px)' });
  const isTinyScreen = useMediaQuery({ query: '(max-width: 350px)' });
  return {
    isTablets,
    isMobile,
    isSmallScreen,
    isTinyScreen,
  };
};

export default useRwd;
