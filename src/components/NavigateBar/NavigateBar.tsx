import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import { IconsMap, NavMenuList } from './constants';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';

const NavigateBar = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dropShadow: string = 'drop-shadow(0px 0px 12px #ec9131)';
  const glowingColor: string = 'text-[#ec9131]';
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTab = (index: number, path: string) => {
    setCurrentIndex(index);
    navigate(path);
  };

  useEffect(() => {
    const target = NavMenuList.find((item) => item.path === location.pathname);
    if (!target) return;
    const index = NavMenuList.indexOf(target);
    if (currentIndex === index) return;
    setCurrentIndex(index);
  }, [location.pathname, currentIndex]);

  return (
    <BlurGlassDiv
      className={`mobile-transition h-16 shadow-lg shadow-black rounded-b-sm flex flex-row lg:h-full lg:flex-col lg:w-16 lg:rounded-md lg:gap-1 xl:w-[100px] xl:gap-4`}
    >
      {NavMenuList.map((menu, index) => {
        const isCurrent = currentIndex === index;

        return (
          <section
            className="text-[22px] w-[25%] cursor-pointer p-1 text-[#b5bac1] lg:w-full"
            key={index}
            onClick={() => toggleTab(index, menu.path)}
          >
            <div
              className={clsx(
                'h-full flex flex-col justify-center items-center gap-1 hover:bg-[#00000048] rounded-md lg:h-14 xl:h-[100px]',
                isCurrent && 'bg-[#00000048]'
              )}
            >
              <Badge count={menu.badge} size="small">
                <DynamicComponent
                  is={isCurrent ? menu.iconFilled : menu.iconOutlined}
                  styles={[
                    'text-[25px] lg:text-[32px] xl:text-[40px]',
                    isCurrent && `${glowingColor}`,
                  ]}
                  resource={IconsMap}
                  inlineStyle={{ filter: `${dropShadow}` }}
                />
              </Badge>
              <span
                className={clsx(
                  'text-[14px] lg:hidden xl:block xl:text-[16px]',
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
    </BlurGlassDiv>
  );
};

export default NavigateBar;
