import React, {useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface INoticeList {
    Total: number;
    Idx: number;
    Title: string;
    Contents: string;
    RegDT: string;
}

function RequestID() {
    const s = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
}

const BASE_URL = `https://dev-wcrs.couponwallet.co.kr/home`;

function NoticePage() {
    const requestData = {
        Header: { CmdType: 1000, RequestID: RequestID() },
        Body: { Offset: 0, Length: 6 },
    };

    const fetchProducts = async () => {
        const { data } = await axios.post(BASE_URL, requestData);
        return data;
    };

    const { data: noticeData, isLoading,isSuccess } = useQuery({
        queryKey: ['noticeItem'],
        queryFn: () => fetchProducts(),
    });

    //const [notice, setNotice] = useState<INoticeList>();

    console.log(noticeData);

    return (
        <>
            <Title>공지사항</Title>
            <button onClick={fetchProducts}>테스트공지사항불러오기</button>
            <SubTitle>서비스 관련 공지사항을 안내드립니다.</SubTitle>
            <NoticeList>
                {isLoading && <> Loading...</>}
                {isSuccess && (
                    <>
                        {noticeData?.Body?.NoticeList?.map((notice: INoticeList) => (
                            <NoticeItem key={notice.Idx}>
                                <Link to={
                                    {
                                        pathname:`/help_center/notice/${notice.Idx}`,
                                    }
                                }>

                                    <NoticeTitle>제목: {notice.Title}</NoticeTitle>
                                    <NoticeDate>등록일: {notice.RegDT}</NoticeDate>
                                </Link>
                            </NoticeItem>
                        ))}
                    </>
                )}
            </NoticeList>
        </>
    );
}

export default NoticePage;

const Title = styled.p`
  font-size: 16px;
`;

const SubTitle = styled.p`
  font-size: 24px;
  margin-top: 20px;
`;

const NoticeList = styled.div`
  width: 100%;
  max-width: 400px;
`;

const NoticeItem = styled.div`
  min-height: 60px;
  border-radius: 12px;
  background-color: #fff;
  color: #111;
  padding: 10px;
  &:not(:last-child){
    margin-bottom: 10px;
  }
  
`;

const NoticeTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const NoticeDate = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;
