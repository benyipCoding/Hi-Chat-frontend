import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { AuthFormInput } from '@/components/Inputs';
import { Button } from '@/components/Buttons';
import { getTemp } from '@/utils/api';

type Variant = 'LOGIN' | 'REGISTER';
type AuthFormDefaultValues = {
  userName: string;
  email: string;
  password: string;
};
export type KeyOfDefaultValues = keyof AuthFormDefaultValues;

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      getTemp()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      // register handler
      console.log(data);
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
          label={variant === 'LOGIN' ? 'SIGN IN' : 'SIGN UP'}
          type="submit"
          disabled={isLoading}
        />
      </form>

      <div className="lineWithText mt-10 mx-5 h-[2px] relative">
        <p
          className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] text-white w-[300px] text-center text-sm md:text-[16px] font-sans cursor-pointer underline"
          onClick={toggleVariant}
        >
          {variant === 'LOGIN' ? 'Create an account!' : 'Already has account?'}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
