'use client'
import { colors } from "@/styles/colors";
import styled from "styled-components";

export const SProductCard = styled.article`
    background-color: ${colors.lightGray};
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;

    figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
    }

    img {
        width: 135px;
        height: 135px;
        object-fit: contain;
        margin-bottom: 0.80rem;
        border-radius: 12px;
    }

    figcaption {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    span {
        font-size: 1.25rem;
        font-weight: 700;
        color: ${colors.primaryDark};
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        color: ${colors.primaryDark};

        img {
            width: 40px;
            height: 40px;
        }
    }

    h5 {
        color: ${colors.primaryDark};
        font-weight: 600;
        font-size: 1.1rem;
        text-align: center;
        margin-top: 0.5rem;
        flex-grow: 1; 
    }

    a {
        text-align: center;
        text-decoration: none;
        color: ${colors.primaryDark};
        font-weight: 600;
        margin-top: 1rem;
        padding: 0.5rem;
        border-radius: 8px;
        transition: background-color 0.2s;

        cursor: pointer; 
        user-select: none;

        &:hover {
            background-color: rgba(0,0,0, 0.05);
        }
    }
`