import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../componets/Header/view";
import Footer from "../componets/Footer/view";
import styled from "styled-components";

function PageLayout() {
    return (
        <PageLayoutWrap>
            <Header/>
            <ContentLayout>
                <Outlet/>
            </ContentLayout>
            <Footer/>
        </PageLayoutWrap>
    );
}

export default PageLayout;


const PageLayoutWrap = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: block;
  position: relative;
`

const ContentLayout = styled.div`
  position: relative;
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: beige;
`