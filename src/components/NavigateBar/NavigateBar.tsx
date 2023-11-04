import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import { IconsMap, NavMenuList } from './constants';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useState } from 'react';
import clsx from 'clsx';

const NavigateBar = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dropShadow: string = 'drop-shadow(0 0 12px #ec9131)';
  const glowingColor: string = 'text-[#ec9131]';
  const toggleTab = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <BlurGlassDiv className={`h-16 shadow-lg shadow-black rounded-b-sm`}>
      <div className="h-full flex flex-row">
        {NavMenuList.map((menu, index) => {
          const isCurrent = currentIndex === index;

          return (
            <section
              className="text-[22px] w-[25%] cursor-pointer p-1 text-[#b5bac1]"
              key={index}
              onClick={() => toggleTab(index)}
            >
              <div
                className={clsx(
                  'h-full flex flex-col justify-center items-center gap-1 hover:bg-[#00000048] rounded-md',
                  isCurrent && 'bg-[#00000048]'
                )}
              >
                <DynamicComponent
                  is={isCurrent ? menu.iconFilled : menu.iconOutlined}
                  styles={['text-[25px]', isCurrent && `${glowingColor}`]}
                  resource={IconsMap}
                  inlineStyle={{ filter: `${dropShadow}` }}
                />
                <span
                  className={clsx(
                    'text-[14px]',
                    isCurrent && `${glowingColor}`
                  )}
                  style={{
                    filter: isCurrent ? `${dropShadow}` : '',
                  }}
                >
                  {menu.label}
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </BlurGlassDiv>
  );
};

export default NavigateBar;