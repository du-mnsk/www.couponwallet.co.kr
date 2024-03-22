import React from 'react';
import router from "./router/Router";
import {RouterProvider} from "react-router-dom";
import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient()
    return (
        <>
            <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <GlobalStyles />
            </QueryClientProvider>
        </>
    );
}

export default App;

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        margin: 0;
        padding: 0;
        font: inherit;
        color: inherit;
    }

    *,
    :after,
    :before {
        box-sizing: border-box;
    }

    :root {
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
        cursor: default;
        line-height: 1.4;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    html,
    body {
        height: 100%;

    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    button {
        background: none;
        border: 0;
        cursor: pointer;
    }

    :where(a) {
        text-decoration: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    ul,
    ol {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    :where(button, input, select, textarea) {
        border-radius: 0;
        border: none;
        background: 0 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: 0;
        text-decoration: none;
        cursor: pointer;
        -webkit-text-size-adjust: none;
    }

    textarea {
        resize: none;
    }

    ////Scrollbar Custom
    //::-webkit-scrollbar {
    //    width: 1rem;
    //}
    //
    //::-webkit-scrollbar-track {
    //    background-color: transparent;
    //}
    //
    //::-webkit-scrollbar-thumb {
    //    background-color: #eee;
    //    border-radius: 1.25rem;
    //    border: 0.375rem solid transparent;
    //    background-clip: content-box;
    //}
`