import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CardDataDiv from '../UI/CardDataDiv';
import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';


// const CARD_DATA = [
//   {
//     name: '김수빈 Subin Kim',
//     company: '(주)비바리퍼블리카',
//     department: 'Internal Platform Team',
//     address: '서울특별시 강남구 테헤란로 142,12층 (역삼동, 아크플레이스)',
//     position: 'Python Developer',
//     tel: null,
//     mobile: '010 63151317',
//     fax: null,
//     email: 'subin.kim@toss.im',
//     homepage: null,
//   },
//   {
//     name: '최태준 Taejoon, Choi',
//     company: 'PREMIER PLASTICSURGERY',
//     department: '성형외과',
//     address: '서울시 강남구 테헤란로 107 메디타워 8,10F',
//     position: '원장 전문의 Plasticsurgeon',
//     tel: '02-554-3388',
//     mobile: null,
//     fax: '02-554-3381',
//     email: null,
//     homepage: 'premierps.co.kr',
//   },
//   {
//     name: '김종혁 Jonghyuk Kim',
//     company: null,
//     department: null,
//     address: '서울특별시 서초구 서초대로77길 17,14층 flex',
//     position: 'Product Engineer',
//     tel: null,
//     mobile: '010 5018 4291',
//     fax: null,
//     email: 'jonghyuk@flex.team',
//     homepage: null,
//   },
//   {
//     name: '김성일',
//     company: 'KB금융그룹',
//     department: '더플랫폼추진부',
//     address: '07328 서울특별시 영등포구 여의나루로50 The-K 타워 6층 KB증권 더플랫폼추진부',
//     position: '주임',
//     tel: '0261142161',
//     mobile: '010 9441 8131',
//     fax: null,
//     email: 'Esikim@kbfg.com',
//     homepage: 'www.kbsec.com',
//   },
//   {
//     name: '김민석',
//     company: null,
//     department: '연구개발팀',
//     address: '경기도 성남시 분당구 성남대로331번길 8. B동316호 (정자동, 킨스타워)',
//     position: '연구원',
//     tel: '031-8022-7534',
//     mobile: '010-9086-8996',
//     fax: null,
//     email: 'MINSEOK@INEEJI.COM',
//     homepage: 'www.ineeji.com',
//   },
//   {
//     name: '이슬비 루비아',
//     company: 'LLUVIA TOTALBEAUTYSTUDIO',
//     department: null,
//     address: 'Tintlip, Pointdot, Eyelash perm',
//     position: '대표원장',
//     tel: 'Semi-permanent make-up )',
//     mobile: '010.8313.5567',
//     fax: null,
//     email: null,
//     homepage: null,
//   },
//   {
//     name: 'Nam, Da Young',
//     company: 'KPMG Samjong Accounting Corp.',
//     department: null,
//     address: '27F, Gangnam Finance Center, 152, Teheran-ro, Gangnam-gu, Seoul,06236, Korea',
//     position: 'Analyst Deal Advisory',
//     tel: '+82221120100',
//     mobile: '+821085591440',
//     fax: '+82221120702',
//     email: 'dayoungnam@kr.kpmg.com',
//     homepage: null,
//   },
// ];

const SavedCardData = () => {


  

  return (
    <CardDataWrapper>
      {/* {CARD_DATA.map((item, idx) => {
        return (
          <Wrapper key={idx}>
            {Object.entries(item).map(([key, value]) => (
              <CardDataDiv key={key} keyName={key} placeholder={value} />
            ))}
          </Wrapper>
        );
      })} */}
    </CardDataWrapper>
  );
};

export default SavedCardData;

const CardDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
padding: 0.5rem;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items:center;
    border: 1px solid gray;
    margin-bottom: 1rem;
`
