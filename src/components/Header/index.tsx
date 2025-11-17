'use client'
import Image from "next/image";
import Link from "next/link";
import { SHeader } from "./styles";
import logoImg from '@/assets/logo.svg'; 
import cartImg from '@/assets/carticon.svg';

export function Header() {
    return (
        <SHeader>
            <Link href="/">
                <Image src={logoImg} alt="BuildMart Logo" height={40} priority />
            </Link>
            <nav>
                <Link href="/login">
                    <Image src={cartImg} alt="Carrinho" className="icon" />
                </Link>
                <Link href="/login" className="login-button">
                    Login
                </Link>
            </nav>
        </SHeader>
    )
}