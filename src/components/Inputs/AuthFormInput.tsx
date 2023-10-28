import clsx from 'clsx';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { KeyOfDefaultValues } from '../Forms/AuthForm';

interface AuthFormInputProps {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  name: KeyOfDefaultValues;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  minLength?: number;
  errors: FieldErrors;
}

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  type,
  placeholder,
  name,
  register,
  required,
  minLength = 0,
  errors,
}) => {
  return (
    <div className="flex justify-center gap:2 md:gap-5  flex-col md:flex-row px-8 font-medium relative">
      <label
        htmlFor={name}
        className="leading-10 text-white w-[20%] flex md:justify-end"
      >
        {`${label}:`}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, {
          required: {
            value: required,
            message: `${label} is required`,
          },
          minLength: {
            value: minLength,
            message: `${label} min length is ${minLength}`,
          },
        })}
        className={clsx(
          'form-input flex-1 leading-8 rounded-md border-0 shadow-sm ring-1 ring-inset outline-none py-1 focus:ring-2 focus:ring-inset px-2 ring-orange-300 placeholder:text-gray-300 text-white',
          errors[name] && 'focus:ring-rose-500'
        )}
        placeholder={placeholder}
      />

      {/* Form errors toast */}
      <p
        className={clsx(
          'absolute bottom-[-22px] text-rose-500 opacity-0 transition',
          errors[name] && 'opacity-100'
        )}
      >
        {errors[name]?.message?.toString()}
      </p>
    </div>
  );
};

export default AuthFormInput;
