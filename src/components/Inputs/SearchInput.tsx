import { CheckCircleOutlined } from '@ant-design/icons';
import { Input } from '.';

interface SearchInputProps {
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  onClickIcon: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputVal,
  setInputVal,
  onClickIcon,
}) => {
  return (
    <div className="h-[2.25rem] flex items-center w-full gap-2">
      <Input
        placeholder="Please input user name."
        type="text"
        onInput={(e) => setInputVal((e.target as HTMLInputElement).value)}
        value={inputVal}
      />
      <CheckCircleOutlined
        className="w-16 h-full bg-sky-600 flex justify-center items-center text-white rounded-md text-[1.25rem] cursor-pointer"
        onClick={onClickIcon}
      />
    </div>
  );
};

export default SearchInput;
