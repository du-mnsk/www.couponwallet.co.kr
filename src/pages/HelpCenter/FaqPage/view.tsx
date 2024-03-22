import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

interface IFaqptionItemType {
    text: string;
    onClickFn: () => void;
    active: boolean;
}

type IFaqptionItemListType = IFaqptionItemType[];

interface IFaqList {
    Total: number;
    Idx: number;
    Title: string;
    Contents: string;
    RegDT: string;
    Type: string;
}

function RequestID() {
    const s = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
}

const BASE_URL = `https://dev-wcrs.couponwallet.co.kr/home`;

function FaqPage() {
    const [contentType, setContentType] = useState(0);
    const queryClient = useQueryClient();
    const faqTabListItem: IFaqptionItemListType = [
        {
            text: '서비스가입',
            onClickFn: () => {
                setContentType(0);
                queryClient.removeQueries({ queryKey: ['faqList', { ContentsType: 0 }], exact: true });
            },
            active: contentType === 0,
        },
        {
            text: '서비스해지',
            onClickFn: () => {
                setContentType(1);
                queryClient.removeQueries({ queryKey: ['faqList', { ContentsType: 1 }], exact: true });
            },
            active: contentType === 1,
        },
        {
            text: '이용문의',
            onClickFn: () => {
                setContentType(2);
                queryClient.removeQueries({ queryKey: ['faqList', { ContentsType: 2 }], exact: true });
            },
            active: contentType === 2,
        },
        {
            text: '제휴문의',
            onClickFn: () => {
                setContentType(3);
                queryClient.removeQueries({ queryKey: ['faqList', { ContentsType: 3 }], exact: true });
            },
            active: contentType === 3,
        },
        {
            text: '기타',
            onClickFn: () => {
                setContentType(4);
                queryClient.removeQueries({ queryKey: ['faqList', { ContentsType: 4 }], exact: true });
            },
            active: contentType === 4,
        },
    ];

    const FaqOptionTab = ({ data }: { data: IFaqptionItemListType }) => {
        return (
            <FaqOptionList>
                {data.map(({ text, active, onClickFn }: IFaqptionItemType, index) => (
                    <FaqOptionItem key={index} onClick={onClickFn} active={active} >
                        {text}
                    </FaqOptionItem>
                ))}
            </FaqOptionList>
        );
    };

    const requestData = { Header: { CmdType: 1002, RequestID: RequestID() }, Body: { Type:1, Offset: 0, Length: 6 } };
    const fetchProducts = async () => {
        const { data } = await axios.post(BASE_URL, requestData);
        return data;
    };

    const { data: faqData, isLoading, isSuccess } = useQuery({
        queryKey: ['faqItem'], queryFn: () => fetchProducts()
    });

    console.log(faqData);
    return (
        <FaqWrap>
            <h1>자주 묻는 질문</h1>
            <FaqOptionTab data={faqTabListItem} />
            <FaqList>
                {isLoading && <> Loading...</>}
                {isSuccess && faqData?.Body?.FAQList?.map((faq: IFaqList) => (
                    <ItemWrap key={faq.Idx}>
                        <Item>
                            <Title>Q.{faq.Title}</Title>
                            <Contents>A.{faq.Contents}</Contents>
                        </Item>
                    </ItemWrap>
                ))}
            </FaqList>
        </FaqWrap>
    );
}

export default FaqPage;

const FaqWrap = styled.section`
  width: 100%;
  background-color: #eee;
  min-height: 500px;
  h1{
    font-size: 23px;
    font-weight: bold;
  }
`;

const FaqList = styled.div``;

const FaqOptionList = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const FaqOptionItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#fff" : "#666")};
  color: ${(props) => (props.active ? "#111" : "#fff")};
  padding: 8px 10px;
  border-radius: 100px;
  font-size: 14px;
`;

const ItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
`;

const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 .2rem .8rem rgba(0,0, 0, 0.1);
  padding: 15px;
  overflow: hidden;

  &:first-child {
    margin-top: 20px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Contents = styled.div`
  font-size: 16px;
  margin-top: 15px;
  transition: all .2s ease-in-out;
`;