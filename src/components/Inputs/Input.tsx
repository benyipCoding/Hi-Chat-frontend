import clsx from 'clsx';

interface InputProps {
  type: string;
  placeholder: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  icon?: React.ReactNode;
  background?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  onInput,
  value,
  icon,
  background = '',
}) => {
  return (
    <div className={clsx('w-full relative', icon && 'p-3')}>
      {icon && (
        <span className="absolute left-5 top-5 text-[gray] text-xl">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={clsx(
          'form-input w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6',
          icon && `pl-10`
        )}
        placeholder={placeholder}
        onInput={(e) => onInput(e)}
        value={value}
        style={{
          backgroundColor: `${background}`,
        }}
      />
    </div>
  );
};

export default Input;
