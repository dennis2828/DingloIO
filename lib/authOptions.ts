import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"enter your email",
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"enter your password",
                },
            },
            async authorize(credentials){
                const user = {id:"42",username:"dingo",email:"dennismoldovan32@gmail.com"};

                if(true)
                    return user;
                
                return null;
            }
        })
    ],
    pages:{
        error:"/account/*",
        signIn:"/account",
    },
};