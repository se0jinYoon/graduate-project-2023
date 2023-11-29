import React, { useContext, useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CardDataDiv from '../UI/CardDataDiv';
import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import UserCardDataContext from '../context/UserCardDataContext';

const SavedCardData = () => {
  const { userCardData } = useContext(UserCardDataContext);
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    setSortData([...userCardData].reverse());
  }, [userCardData]);

  const onClickCateogry = (e) => {
    e.preventDefault();
    const category = e.target.name;
    if (category === '최신순') {
      setSortData([...userCardData].reverse())
    }
    if (category === '오래된 순') {
      setSortData([...userCardData]);
    }
    if (category === '취업') {
      setSortData([
        {
          address: '서울특별시 강남구 테헤란로 142,12층 (역삼동, 아크플레이스)',
          company: '(주)비바리퍼블리카',
          department: 'Internal Platform Team',
          email: 'subin.kim@toss.im',
          fax: null,
          homepage: null,
          id: 1,
          mobile: '010 63151317',
          name: '김수빈 Subin Kim',
          position: 'Python Developer',
          tel: null,
          user: 2,
        },
        {
          address: '27F, Gangnam Finance Center, 152, Teheran-ro, Gangnam-gu, Seoul,06236, Korea',
          company: 'KPMG Samjong Accounting Corp.',
          department: null,
          email: 'dayoungnam@kr.kpmg.com',
          fax: '+82221120702',
          homepage: null,
          id: 16,
          mobile: '+821085591440',
          name: '남다영',
          position: 'Analyst Deal Advisory',
          tel: '+82221120100',
          user: 2,
        },
        {
          address: '서울특별시 서초구 서초대로77길 17,14층 flex',
          company: 'flex',
          department: null,
          email: 'jonghyuk@flex.team',
          fax: null,
          homepage: null,
          id: 17,
          mobile: '010-5018-4291',
          name: '김종혁',
          position: 'Product Engineer',
          tel: null,
          user: 2,
        },
        {
          address: '13529 경기도 성남시 분당구 판교역로166, 카카오판교아지트',
          company: '주식회사 카카오',
          department: '전략파트너컨설팅2파트',
          email: 'chloe.keum@kakaocorp.com',
          fax: null,
          homepage: null,
          id: 18,
          mobile: '010-9266-2317',
          name: '금세연',
          position: '파트장',
          tel: null,
          user: 2,
        },
      ]);
    }
    if (category === '여가') {
      setSortData([
        {
          address: '서울강남구 개포로504 (개포동)',
          company: 'LLUVIA TOTALBEAUTYSTUDIO',
          department: 'Tintlip, Pointdot, Eyelash perm',
          email: null,
          fax: null,
          homepage: null,
          id: 13,
          mobile: '010-8313-5567',
          name: '이슬비 루비아',
          position: '대표원장',
          tel: null,
          user: 2,
        },
        {
          address: '서울강남구 개포로504 (개포동)',
          company: '박승철헤어스투디오 개포동역점',
          department: '-',
          email: null,
          fax: null,
          homepage: null,
          id: 15,
          mobile: null,
          name: '효연',
          position: 'Designer',
          tel: '02-459-9998',
          user: 2,
        },
      ]);
    }
    if (category === '기타') {
      setSortData([
        {
          address: '17104 경기도 용인시 기흥구 덕영대로 1732',
          company: '경희대학교 국제캠퍼스',
          department: '소프트웨어융합대학 컴퓨터공학부',
          email: 'ju.kim@khu.ac.kr',
          fax: null,
          homepage: null,
          id: 14,
          mobile: null,
          name: '김정욱',
          position: '조교수',
          tel: '031-201-3768',
          user: 2,
        },{
          id: 5,
          name: "김성일",
          company: "KB금융그룹",
          department: "더플랫폼추진부",
          address: "07328 서울특별시 영등포구 여의나루로50 The-K 타워 6층 KB증권 더플랫폼추진부",
          position: "주임",
          tel: "0261142161",
          mobile: "010 9441 8131",
          fax: null,
          email: "Esikim@kbfg.com",
          homepage: "www.kbsec.com",
          user: 2
        },
        
      ]);
    }
  };

  return (
    <>
      <CardCategoryWrapper>
        <CategoryBtn onClick={onClickCateogry} name="최신순">
          최신순
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="오래된 순">
          오래된 순
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="취업">
          취업
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="여가">
          여가
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="기타">
          기타
        </CategoryBtn>
      </CardCategoryWrapper>
      <CardDataWrapper>
        {sortData.map((item, idx) => {
          return (
            <Wrapper key={idx}>
              {Object.entries(item).map(([key, value]) => {
                if (key === 'id' || key === 'user') {
                  return null;
                } else {
                  return <CardDataDiv key={key} keyName={key} value={value !== null ? value : '-'} />;
                }
              })}
            </Wrapper>
          );
        })}
      </CardDataWrapper>
    </>
  );
};

export default SavedCardData;

const CardCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryBtn = styled.button`
  padding: 1rem 1.5rem;
`;

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
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 1rem;
`;
