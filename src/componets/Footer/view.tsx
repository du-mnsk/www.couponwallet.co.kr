import React from 'react';
import styled from "styled-components";
function Footer() {
    return (
        <>
            <FooterWrap>
                <h1>Footer</h1>
            </FooterWrap>
        </>
    )
}

export default Footer;

export const FooterWrap=styled.footer`
    width: 100%;
    background-color: seagreen;
    padding: 10px;
    
`