import {Link} from "react-router-dom";
import styled from "styled-components";

function Header() {
    return (
        <>
            <HeaderWrap>
                <h1><Link to={"/"}>Logo</Link></h1>
                <GnbMenu>
                        <Link to={"/help_center/notice"}>공지사항</Link>
                        <Link to={"/help_center/faq"}>FAQ</Link>
                        <Link to={"/help_center/qna"}>1:1문의</Link>
                        <Link to={"/help_center/terms"}>약관 및 정책</Link>
                        <Link to={"/help_center/cancel"}>서비스해지</Link>
                </GnbMenu>
            </HeaderWrap>

        </>
    )
}

export default Header;

export const HeaderWrap = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: tomato;
  padding: 10px;
`
export const GnbMenu = styled.menu`
  display: flex;
  gap: 20px;
`