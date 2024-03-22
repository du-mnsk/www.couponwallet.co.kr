import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface INoticeDetailList {
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

function NoticeDetailPage() {
    const requestData = {
        Header: { CmdType: 1001, RequestID: RequestID() },
        Body: { Offset: 0, Length: 6 },
    };

    const fetchProducts = async () => {
        const { data } = await axios.post(BASE_URL, requestData);
        return data;
    };

    const { data: noticeDetailData, isLoading,isSuccess } = useQuery({
        queryKey: ['noticeItem'],
        queryFn: () => fetchProducts(),
    });

    const navigate = useNavigate();
    const { idx } = useParams(); // URL 매개 변수 가져오기
    console.log(noticeDetailData);

    return (
        <>
            <Title>공지사항 상세페이지</Title>
            <SubTitle>서비스 관련 공지사항을 안내드립니다.</SubTitle>
            <ItemList>
                {isLoading && <> Loading...</>}
                {isSuccess && (
                    <ItemWrap key={noticeDetailData?.Idx}>
                        <p>{idx}번째 게시글</p>
                        <p>제목: {noticeDetailData?.Title}</p>
                        <p>내용: {noticeDetailData?.Contents}</p>
                        <p>등록일: {noticeDetailData?.RegDT}</p>
                        <br/>

                    </ItemWrap>
                )}
            </ItemList>
            <button onClick={() => navigate("/help_center/notice")}>목록으로</button>
        </>
    );
}

export default NoticeDetailPage;

const Title = styled.p`
  font-size: 16px;
`;

const SubTitle = styled.p`
  font-size: 24px;
  margin-top: 20px;
`;

const ItemList = styled.div`
`;

const ItemWrap = styled.div`
  min-height: 60px;
  border-radius: 12px;
  background-color: #fff;
  color: #111;
  padding: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
