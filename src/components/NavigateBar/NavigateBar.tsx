import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import { IconsMap, NavMenuList } from './constants';

const NavigateBar = () => {
  return (
    <div className="blur-glass h-16 fixed bottom-0 w-full">
      <div className="h-full flex flex-row">
        {NavMenuList.map((menu, index) => (
          <section
            className="flex flex-col justify-center items-center text-[22px] gap-1 w-[25%] cursor-pointer p-2 text-white"
            key={index}
          >
            <DynamicComponent
              is={menu.iconOutlined}
              styles={['text-[20px]']}
              resource={IconsMap}
            />
            <span className="text-[14px]">{menu.label}</span>
          </section>
        ))}
      </div>
    </div>
  );
};

export default NavigateBar;
