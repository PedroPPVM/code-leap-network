import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserName, useAppDispatch } from '../../store';
import Button from '../../components/Button';

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState<string>('');
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);

  const onSubmitLogin = useCallback(() => {
    setIsLoadingLogin(true);

    setTimeout(() => {
      dispatch(createUserName(userName));

      navigate('/home');

      setIsLoadingLogin(false);
    }, 1000);
  }, [userName]);

  return (
    <div className="flex h-lvh w-full items-center justify-center px-2">
      <div className="flex w-[31.25rem] flex-col gap-2.5 rounded-2xl border border-solid border-[#CCCCCC] bg-white p-4">
        <span className="text-[1.375rem] font-bold">
          Welcome to CodeLeap network!
        </span>

        <div className="flex flex-col gap-1">
          <span>Please enter your username</span>

          <input
            className="h-8 rounded-[0.5rem] border border-solid border-[#777777] px-2"
            value={userName}
            placeholder="John doe"
            onChange={({ target }) => setUserName(target.value)}
            onKeyDown={({ key }) =>
              key === 'Enter' && userName.length !== 0 && onSubmitLogin()
            }
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            title="ENTER"
            onSubmit={onSubmitLogin}
            isLoading={isLoadingLogin}
            isDisabled={userName.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
