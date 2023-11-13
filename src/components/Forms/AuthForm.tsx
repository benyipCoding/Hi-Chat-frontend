import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { AuthFormInput } from '@/components/Inputs';
import { Button } from '@/components/Buttons';
import { postRegisterUser, postSignIn } from '@/utils/api';
import { LineWithText } from '@/utils/styles/LineWithText';
import { toast } from 'react-toastify';
import { ErrorData } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from '@/utils/helpers';

type Variant = 'LOGIN' | 'REGISTER';
export type AuthFormDefaultValues = {
  userName: string;
  email?: string;
  password: string;
};
export type KeyOfDefaultValues = keyof AuthFormDefaultValues;

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // axios
    if (variant === 'LOGIN') {
      // login handler
      const trimData: AuthFormDefaultValues = {
        userName: data.userName.trim(),
        password: data.password,
      };
      postSignIn(trimData)
        .then(async (res) => {
          // save token
          setLocalStorage(res.data);
          navigate('/messages', { replace: true, state: '/login' });
        })
        .catch((err: ErrorData) => {
          toast.error(err.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // register handler
      const trimData: AuthFormDefaultValues = {
        userName: data.userName.trim(),
        password: data.password,
        email: data.email.trim(),
      };
      postRegisterUser(trimData)
        .then((res) => {
          console.log('Register Success');
          toast.success(res.message);
        })
        .catch((err: ErrorData) => {
          console.log(err);
          toast.error(err.data);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER');
    else setVariant('LOGIN');
    reset();
  }, [variant]);

  return (
    <div>
      <form
        className="flex flex-col gap-3 md:gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthFormInput
          label="Name"
          placeholder="Your Name"
          name="userName"
          type="text"
          register={register}
          required={true}
          errors={errors}
        />
        {variant === 'REGISTER' && (
          <AuthFormInput
            label="Email"
            placeholder="Your Email"
            name="email"
            type="email"
            register={register}
            required={true}
            errors={errors}
          />
        )}
        <AuthFormInput
          label="Password"
          placeholder="Your Password"
          name="password"
          type="password"
          register={register}
          required={true}
          minLength={4}
          errors={errors}
        />
        <Button
          label={variant === 'LOGIN' ? `SIGN IN` : 'SIGN UP'}
          type="submit"
          disabled={isLoading}
        />
      </form>

      <LineWithText className="mt-10 mx-5 h-[2px] relative" color="red">
        <p
          className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] text-white w-[300px] text-center text-sm md:text-[16px] font-sans cursor-pointer underline"
          onClick={toggleVariant}
        >
          {variant === 'LOGIN' ? 'Create an account!' : 'Already has account?'}
        </p>
      </LineWithText>
    </div>
  );
};

export default AuthForm;
