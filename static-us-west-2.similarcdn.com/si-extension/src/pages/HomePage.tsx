import React from 'react';
import { EmptyStateView } from '../components/EmptyStateView';
import { Header } from '../components/Header';
import { StyledContainer } from './styles';

export const HomePage = () => {
  return (
    <>
      <Header />
      <StyledContainer data-automation="HomePage">
        <EmptyStateView
          textKey="home.empty_state.text"
          messageKey="home.empty_state.message"
          img="/images/empty-state-girl-in.svg"
          variant="girl-in"
        />
      </StyledContainer>
    </>
  );
};
