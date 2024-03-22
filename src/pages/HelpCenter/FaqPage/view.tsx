import styled from "styled-components";
import {Navigate, NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface IFaqList {
    Total: number;
    Idx: number;
    Title: string;
    Contents: string;
    RegDT: string;
    Type?: string;
}

function RequestID() {
    const s = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`
}

const BASE_URL = `https://dev-wcrs.couponwallet.co.kr/home`;

function FaqPage() {
    const requestData = {Header: {CmdType: 1002, RequestID: RequestID()}, Body: {Offset: 0, Length: 6}}
    const fetchProducts = async () => {
        const {data} = await axios.post(BASE_URL, requestData);
        return data;
    };

    const {data: faqData, isLoading,} = useQuery<IFaqList>({queryKey: ['faqItem'], queryFn: () => fetchProducts()});
    // const {notice, setNotice} = useState<INoticeList>();
    console.log(faqData);
    return (
        <FaqWrap>
            <h1>자주 묻는 질문</h1>
            <CategoryWrap>
                <NavLink to={'all'}>전체</NavLink>
                <NavLink to={'sign'}>가입 및 해지</NavLink>
                <NavLink to={'hotdeal'}>핫딜</NavLink>
                <NavLink to={'discount'}>상시할인</NavLink>
                <NavLink to={'wallet'}>쿠폰지갑</NavLink>
            </CategoryWrap>
            <FaqList>
                {isLoading ? (
                    <div>로딩중</div>
                ) : (<ItemWrap>
                        <Item>
                            <Title>Q.title</Title>
                            <Contents>A.answer</Contents>
                        </Item>
                        <Item>
                            <Title>Q.title</Title>
                            <Contents>A.answer</Contents>
                        </Item>
                        <Item>
                            <Title>Q.title</Title>
                            <Contents>A.answer</Contents>
                        </Item>
                    </ItemWrap>
                )}
            </FaqList>
        </FaqWrap>
    )
}

export default FaqPage;

const FaqWrap = styled.section`
  width: 100%;
  background-color: #eee;
  min-height: 500px;
`
const CategoryWrap = styled.ul`
  width: 100%;
  display: flex;
  gap: 5px;

  a {
    padding: 5px 10px;
    background-color: dodgerblue;
    color: #fff;
    border-radius: 100px;
  }
`
const FaqList=styled.div`
`
const ItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
`
const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 .2rem .8rem rgba(0, 0, 0, 0.1);
  padding: 15px;
  overflow: hidden;

  &:first-child {
    margin-top: 20px;
  }
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const Contents = styled.div`
  font-size: 16px;
  margin-top: 15px;
  transition: all .2s ease-in-out;
`
