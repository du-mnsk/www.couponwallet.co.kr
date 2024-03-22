// router.js

import {createBrowserRouter} from "react-router-dom";
import NoticePage from "../pages/HelpCenter/NoticePage/view";
import MainPage from "../pages/MainPage/view";
import FaqPage from "../pages/HelpCenter/FaqPage/view";
import TermsPage from "../pages/HelpCenter/TermsPage/view";
import QnaPage from "../pages/HelpCenter/QnaPage/view";
import CancelPage from "../pages/HelpCenter/CancelPage/view";
import PageLayout from "../layout/PageLayout";
import ErrorPage from "../layout/ErrorPage";
import NoticeDetailPage from "../pages/HelpCenter/NoticeDetailPage/view";

export const routes = [
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: 'help_center',
        children: [
            // 공지사항
            {path: 'notice', element: <NoticePage/>},
            {
                path: 'notice',
                children: [
                    // 공지사항 상세
                    {path: ':idx', element: <NoticeDetailPage/>},
                ],
            },
            // 자주 묻는 질문
            {path: 'faq', element: <FaqPage/>},
            // Qna
            {path: 'qna', element: <QnaPage/>},
            // 약관 및 정책
            {path: 'terms', element: <TermsPage/>},
            // 서비스 해지
            {path: 'cancel', element: <CancelPage/>},
        ],
    },
]

const router = createBrowserRouter([
    {
        element: <PageLayout/>,
        children: routes,
        errorElement: <ErrorPage/>
    },
])

export default router;
