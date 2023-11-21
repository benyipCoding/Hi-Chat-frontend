interface InputProps {
  type: string;
  placeholder: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, onInput, value }) => {
  return (
    <input
      type={type}
      className="form-input flex-1 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      onInput={(e) => onInput(e)}
      value={value}
    />
  );
};

export default Input;
