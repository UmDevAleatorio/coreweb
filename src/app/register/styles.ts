'use client'
import { colors } from "@/styles/colors";
import styled from "styled-components";

export const SRegisterPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 8rem); // Altura total menos o header/footer
    padding: 2rem;
`;

export const SForm = styled.form`
    background-color: ${colors.lightGray};
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: ${colors.primaryDark};
        text-align: center;
    }
`;

export const SInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-weight: 500;
        color: ${colors.primaryDark};
    }

    input {
        padding: 0.75rem 1rem;
        border: 1px solid ${colors.mediumGray};
        border-radius: 8px;
        font-size: 1rem;

        &:focus {
            outline-color: ${colors.primaryDark};
        }
    }
`;

export const SButton = styled.button`
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    background-color: ${colors.primaryDark};
    color: ${colors.white};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #333; // Um tom mais escuro
    }
`;

export const SLoginLink = styled.p`
    text-align: center;
    color: ${colors.primaryDark};

    a {
        color: ${colors.primaryDark};
        font-weight: 700;
        text-decoration: underline;

        &:hover {
            opacity: 0.8;
        }
    }
`;