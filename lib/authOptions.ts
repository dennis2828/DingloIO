import { getServerSession, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENTID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
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
                const user = {id:"42",username:"dingo",email:"dennismoldovan32@gmail.com", accessToken:""};

                if(true)
                    return user;
                
                return null;
            }
        }),
    ],
    callbacks:{
        async signIn({user}){
            if(user && user.name && user.email){
                    const userAlreadyExists = await db.user.findUnique({
                        where:{
                            username:user.name,
                            email:user.email,
                        },
                    });
                    if(!userAlreadyExists){
                        const usernameIsAlreadyTaken = await db.user.findUnique({
                            where:{
                                username:user.name,
                            },
                        });
                        const emailIsAlreadyTaken = await db.user.findUnique({
                            where:{
                                email:user.email,
                            },
                        });

                        if(usernameIsAlreadyTaken)
                            throw new Error(`Username ${user.name} is already taken. Please try another username.`);
                        if(emailIsAlreadyTaken)
                            throw new Error(`Email ${user.email} is already taken. Please use another email.`);
                    }
            }
            return true;
        },
        async jwt({token, account}){
            if(token){
                
                const userAlreadyExists = await db.user.findUnique({
                    where:{
                        username:token.name!,
                        email:token.email!,
                    },
                });
                if(!userAlreadyExists){
                    
                    const newUser = await db.user.create({
                        data:{
                            username:token.name!,
                            email:token.email!,
                            provider:account?.provider==="github" ? "GITHUB": account?.provider==="google" ? "GOOGLE":"EMAIL",
                        }
                    });
                    token.id=newUser.id;
                    token.accessToken = jwt.sign({userId: newUser.id, username: newUser.username},process.env.NEXTAUTH_SECRET!,{expiresIn:"6d"});
                }else{
                    token.id=userAlreadyExists.id;
                    token.accessToken = jwt.sign({userId: userAlreadyExists.id, username: userAlreadyExists.username},process.env.NEXTAUTH_SECRET!,{expiresIn:"6d"});
                }
            }
          
            return token;
            
        },
        async session({ session, token }) {
            if(session && session.user){
                session.user.accessToken = token.accessToken as string;
                session.user.id=token.id as string;
            }
            
            return session;
        },
    },
    pages:{
        error: "/account/new",
        signIn:"/account",
    },
};

export const getAuthSession = ()=> getServerSession(authOptions);