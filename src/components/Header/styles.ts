'use client'
import { colors } from "@/styles/colors";
import styled from "styled-components";

export const SHeader = styled.header`
    background-color: ${colors.primaryDark};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 40px; 
    color: ${colors.white};

    nav {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .login-button {
        background-color: ${colors.white};
        color: ${colors.primaryDark};
        padding: 8px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
    }

    .icon {
        height: 32px;
        width: auto;
        vertical-align: middle;
    }

    .profile-icon {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        vertical-align: middle;
    }
`