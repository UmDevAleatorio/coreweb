'use client'
import { colors } from "@/styles/colors";
import styled from "styled-components";

export const SFooter = styled.footer`
    background-color: ${colors.primaryDark};
    min-height: 60px;
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    color: ${colors.white};

    a {
        background-color: ${colors.white};
        color: ${colors.primaryDark};
        padding: 0.6rem 1.8rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
    }
`