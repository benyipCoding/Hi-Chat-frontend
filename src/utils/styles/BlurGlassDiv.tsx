import { styled } from 'styled-components';
import { addAlphaToHexColor } from '../helpers';

export const BlurGlassDiv = styled.div`
  background-color: ${({ theme }) =>
    addAlphaToHexColor(theme.glassColor, theme.alpha)};
  backdrop-filter: blur(${({ theme }) => theme.blur}px);
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur}px);
  -moz-backdrop-filter: blur(${({ theme }) => theme.blur}px);
  -ms-backdrop-filter: blur(${({ theme }) => theme.blur}px);
`;
