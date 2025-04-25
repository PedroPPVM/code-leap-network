import { useMemo } from 'react';
import Spinner from '../Spinner';

interface ButtonProps {
  title: string;
  typeButton?: 'default' | 'delete' | 'cancel' | 'save';
  isLoading?: boolean;
  isDisabled?: boolean;
  onSubmit: () => void;
}

const Button = ({
  title,
  typeButton = 'default',
  isLoading = false,
  isDisabled = false,
  onSubmit,
}: ButtonProps) => {
  const textColor = useMemo(() => {
    return typeButton === 'cancel' ? '' : 'text-white';
  }, [typeButton]);

  const backgroundColor = useMemo(() => {
    switch (typeButton) {
      case 'default':
        return 'bg-[#7695EC]';
      case 'delete':
        return 'bg-[#FF5151]';
      case 'save':
        return 'bg-[#47B960]';
      default:
        return '';
    }
  }, [typeButton]);

  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={isLoading || isDisabled}
      className={`flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg ${backgroundColor} px-6 ${textColor} transition-all hover:opacity-70 active:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black ${typeButton === 'cancel' ? 'border border-solid border-[#999999]' : ''} `}
    >
      {isLoading && <Spinner />}

      <p>{title}</p>
    </button>
  );
};

export default Button;
