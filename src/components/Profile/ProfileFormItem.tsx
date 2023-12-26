import { Gender } from '@/utils/types';
import { FaFemale } from 'react-icons/fa';
import { BiMale } from 'react-icons/bi';

interface ProfileFormItemProps {
  name: string;
  type: string;
  value: string;
  onInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

const ProfileFormItem: React.FC<ProfileFormItemProps> = ({
  name,
  type,
  value,
  onInput,
}) => {
  const isGender = name === 'gender';

  if (isGender) {
    return (
      <div className="flex items-center gap-4">
        <label
          htmlFor={Gender.MALE}
          className="cursor-pointer flex items-center"
        >
          <input
            type={type}
            name={name}
            id={Gender.MALE}
            className="mr-2"
            value={Gender.MALE}
            checked={value === Gender.MALE}
            onChange={(e) => onInput(e)}
          />
          {Gender.MALE}
          <BiMale className="text-blue-300 text-3xl" />
        </label>
        <label htmlFor={Gender.FEMALE} className="cursor-pointer flex">
          <input
            type={type}
            name={name}
            id={Gender.FEMALE}
            className="mr-2"
            value={Gender.FEMALE}
            checked={value === Gender.FEMALE}
            onChange={(e) => onInput(e)}
          />
          {Gender.FEMALE}
          <FaFemale className="text-pink-300 text-2xl" />
        </label>
      </div>
    );
  } else {
    return (
      <input
        name={name}
        type={type}
        value={value}
        className="text-black box-border outline-none bg-slate-100 max-w-[180px] px-1 rounded-sm"
        onInput={(e) => onInput(e)}
      />
    );
  }
};

export default ProfileFormItem;
