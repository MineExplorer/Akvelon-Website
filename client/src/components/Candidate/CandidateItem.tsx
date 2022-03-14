import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { normalizeColor } from 'grommet/utils';

import { Candidate, CandidateStatusText, Seniority, SeniorityText } from '../../data';
import { Typography } from '@mui/material';
import { create } from 'domain';

export interface FlexRowProps {
  justify?: string;
}

export const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: ${props => (props.justify ? props.justify : 'space-between')};
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MainInfo = styled(FlexCol)`
  width: 50%;
`;

export const ExtraInfo = styled(FlexCol)`
  width: 50%;
  align-items: flex-end;
`;

export const StyledLink = styled(Link)`
  width: 900px;
  color: ${props => (props.color ? normalizeColor(props.color, props.theme) : 'initial')};
  display: inline-block;
  box-sizing: border-box;
  padding-left: ${props => props.theme.global.edgeSize.xxsmall};
  padding-right: ${props => props.theme.global.edgeSize.xxsmall};
  padding-bottom: ${props => props.theme.global.edgeSize.xxsmall};
  text-decoration: none;

  :hover > div,
  :focus > div,

  &.active > div {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    border-color: ${props => normalizeColor('brand', props.theme)};
    background-color: ${props => normalizeColor('light-1', props.theme)};
  }
`;

export const ItemWrap = styled.div`
  display: flex;
  overflow: hidden;
  border: 1px solid ${props => normalizeColor('light-3', props.theme)};
  padding: ${props => props.theme.global.edgeSize.xsmall};
  border-radius: 4px;
  flex-direction: column;
  background-color: white;
  transition: all 0.2s ease;
`;

export const DefaultText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const BoldText = styled(DefaultText)`
  font-weight: 600;
`;

export const TitleText = styled(BoldText)`
  max-width: 65%;
  padding-right: 10px;
`;

export const StatusBadgeWrap = styled.div`
  line-height: 1rem;
  padding-left: ${props => props.theme.global.edgeSize.small};
`;

export interface CandidateItemProps {
  candidate: Candidate;
}

export default function CandidateItem({ candidate }: CandidateItemProps) {
  const { id, fullName, position, seniority, experience, city, status, created } = candidate;

  const positionTitle = position?.title ?? 'No position';

  function getExperienceText(years: number) {
    const lastDigit = years % 10;
    const lastDozen = years % 100;
    if (lastDozen > 10 && lastDozen < 20 || lastDigit >= 5) {
      return `${years} лет`;
    }
    if (lastDigit > 1) {
      return `${years} года`;
    }
    return `${years} год`;
  }

  function formatDateTime(timeStamp: string) {
    return timeStamp.slice(0, 16).replace('T', ' ');
  }

  return (
    <StyledLink
      to={{ pathname: `/candidates/${id}` }}
    >
      <ItemWrap>
        <FlexRow>
          <MainInfo>
            <FlexRow justify="flex-start">
              <TitleText title={fullName}>{fullName}</TitleText>
              <Typography>Статус: {CandidateStatusText[status]}</Typography>
            </FlexRow>
          </MainInfo>
          <ExtraInfo>
            <Typography>город: {city}, опыт: {getExperienceText(experience)}, квалификация: {SeniorityText[seniority]}</Typography>
          </ExtraInfo>
        </FlexRow>
        <FlexRow>
          <MainInfo>
            <FlexRow>
              <DefaultText title={positionTitle}>{positionTitle}</DefaultText>
            </FlexRow>
          </MainInfo>
          <ExtraInfo>
            <DefaultText title="Created: ">{formatDateTime(created)}</DefaultText>
          </ExtraInfo>
        </FlexRow>
      </ItemWrap>
    </StyledLink>
  );
}
