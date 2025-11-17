'use client'
import { useState } from "react";
import { SRegisterPage, SForm, SInputContainer, SButton, SLoginLink } from "./styles";
import { useAuth } from "@/context/AuthContext"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 

export default function RegisterPage() {
    const { register, login } = useAuth(); 
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const success = await register(name, email, password); 

            if (success) {
                const loginSuccess = await login(email, password); 
                if (loginSuccess) {
                    toast.success("Conta criada e login efetuado!");
                    router.push('/admin/produtos');
                } else {
                    toast.success("Conta criada! Por favor, faça o login.");
                    router.push('/login');
                }
            } else {
                toast.error("Este email já está em uso.");
            }
        } catch (error) { toast.error(String(error)); }
    }

    return (
        <SRegisterPage>
            {}
            <SForm onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleRegister(); }}>
                <h1>Crie sua conta</h1>
                <SInputContainer>
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
                </SInputContainer>
                <SInputContainer>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </SInputContainer>
                <SInputContainer>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" placeholder="Crie uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </SInputContainer>
                <SButton type="submit">Cadastrar</SButton>
                <SLoginLink>
                    Já tem uma conta? <a href="/login">Faça login</a>
                </SLoginLink>
            </SForm>
        </SRegisterPage>
    );
}