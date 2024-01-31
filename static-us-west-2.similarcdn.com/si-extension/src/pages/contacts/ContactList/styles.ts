import styled, { keyframes } from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';

export const StyledContactListBackground = styled.div`
  padding-bottom: 4px;
  margin-bottom: 8px;
  background: linear-gradient(180deg, #f8f8f8 0%, #e8f0ff 100%);
`;

export const StyledContactList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 8px 0;
  overflow-y: scroll;
  position: relative;
`;

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledLoaderWrapper = styled.div`
  background-color: ${colorsPalettes.carbon[0]};
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  margin-bottom: -4px;
  padding-bottom: 8px;
`;

export const StyledLoader = styled.div`
  width: 24px;
  height: 24px;
  padding: 10px;
  border: 2.5px solid ${colorsPalettes.midnight[50]};
  border-left-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 0 auto;
`;
