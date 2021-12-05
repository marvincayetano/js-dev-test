import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
  children: ReactNode;
}

export function Container({ title, children }: Props) {
  return (
    <>
      <StyledContainer>
        {title && (
          <StyledSubContainer>
            {title && <StyledTitle>{title}</StyledTitle>}
          </StyledSubContainer>
        )}
        {children}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.25rem;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  background: #fff;
  padding: 1.5rem;

  @media (min-width: 640px) {
    margin: 2rem;
    max-width: 48rem;
  }

  overflow-y: scroll;
`;

const StyledSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: bold;
`;
