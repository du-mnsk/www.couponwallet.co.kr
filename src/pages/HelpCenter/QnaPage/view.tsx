import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";


interface IForm {
    category: { value:string, text:string };
    email: string;
    phoneNumber: number;
    title: string;
    contents: string;
    checkbox: boolean;
    message: string;
}


function QnaPage() {
    const {register, watch, handleSubmit, formState: {errors}} = useForm<IForm>();
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(errors);
    console.log(watch());

    return (
        <QnaPageWrap>
            <form onSubmit={handleSubmit(onValid)}>
                <h3>1:1 문의</h3>
                <SelectBox {...register("category", {
                    required: "문의유형을 선택해주세요",
                })}>
                    <option disabled hidden>문의유형을 선택해주세요.</option>
                    <option value={"signUp"}>서비스가입</option>
                    <option value={"signUp"}>서비스해지</option>
                    <option value={"signUp"}>서비스해지</option>
                    <option value={"signUp"}>쿠폰환불문의</option>
                    <option value={"signUp"}>기타</option>
                </SelectBox>
                <ErrorMessage>{errors?.category && errors.category.message}</ErrorMessage>
                <InputBox>
                    <label>이메일</label>
                    <input {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                            value: /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/,
                            message: "정확한 이메일 주소를 입력해 주세요"
                        }
                    })}
                           type="email" placeholder={"이메일을 입력해주세요"}
                    />
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                </InputBox>
                <InputBox>
                    <label>전화번호</label>
                    <input {...register("phoneNumber", {
                        required: "휴대폰번호를 입력해주세요",
                        minLength: {
                            value: 10,
                            message: "올바른 휴대폰 번호를 입력해주세요."
                        },
                        maxLength: {
                            value: 11,
                            message: "올바른 휴대폰 번호를 입력해주세요."
                        },
                        pattern: {
                            value: /^(01[016789])\d{7,8}$/,
                            message: "올바른 휴대폰 번호를 입력해주세요."
                        }
                    })}
                           type="text" placeholder={"휴대폰번호를 입력해주세요"}
                    />
                    <ErrorMessage>{errors?.phoneNumber?.message}</ErrorMessage>
                </InputBox>
                <InputBox>
                    <label>제목</label>
                    <input {...register("title", {
                        required: "제목은 2자 이상 입력해주세요.",
                        minLength: {
                            value: 2,
                            message: "제목은 2자 이상 입력해주세요."
                        },
                    })} type="text"
                           placeholder={"제목을 입력해주세요"}/>
                    <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                </InputBox>
                <InputBox>
                    <label>내용</label>
                    <textarea {...register("contents", {
                        required: "내용은 5자 이상 입력해주세요.",
                        minLength: {
                            value: 5,
                            message: "내용은 5자 이상 입력해주세요."
                        },
                    })}
                              placeholder={"내용을 입력해주세요"}></textarea>
                    <ErrorMessage>{errors?.contents?.message}</ErrorMessage>
                </InputBox>
                <TermsWrap>
                    약관 내용이 보여지는 부분입니다.
                </TermsWrap>
                <CheckBox>
                    <div>
                        <input {...register("checkbox", {required: "이용약관에 동의해주세요",})} type="checkbox" name=""
                               id="termsReq"/>
                        <label htmlFor="termsReq">(필수)개인정보 수집 및 이용에 동의합니다. 문의 응대 외의 용도로 사용되지 않습니다.</label>
                    </div>
                    <ErrorMessage>{errors?.checkbox?.message}</ErrorMessage>
                </CheckBox>
                <button>문의 등록</button>
            </form>
        </QnaPageWrap>
    )
}

export default QnaPage;

export const QnaPageWrap = styled.div` 
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  form {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    h3 {
      text-align: center;
      margin: 10px 0 20px;
      font-size: 22px;
      font-weight: bold;
    }

    button {
      background-color: royalblue;
      color: #fff;
      min-height: 40px;
      padding: 0 20px;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
`
export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 6px;

  &:not(:last-of-type) {
    margin-bottom: 20px
  }

  label {
    flex-shrink: 0;
    font-size: 16px;
  }

  input, textarea {
    width: 100%;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 10px;
  }

  textarea {
    min-height: 140px;
    overflow: hidden;
    overflow-y: auto;
  }
`
const TermsWrap = styled.div`
  width: 100%;
  background-color: #eee;
  padding: 10px;
`

const CheckBox = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  user-select: none;

  div {
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
    margin-bottom: 10px;

    input[type="checkbox"] {
      cursor: pointer;
      flex-shrink: 0;
      border: 1px solid #666;
      border-radius: 4px;
      width: 18px;
      height: 18px;
      background-color: #fff;

      &:checked {
        background-color: dodgerblue;
      }
    }

`
const ErrorMessage = styled.span`
  color: crimson;
  font-size: 14px;
`

const SelectBox = styled.select`
  width: 100%;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  min-height: 40px;
`