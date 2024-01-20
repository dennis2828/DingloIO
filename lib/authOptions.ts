import { getServerSession, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { SignInAccountValidator } from "@/validators/account";
import bcrypt from "bcrypt";
import { generateApiKey } from "./utils";


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
                
                try{
                    
                    const {email, password} = SignInAccountValidator.parse(credentials);
                    
                    const targetUser = await db.user.findUnique({
                        where:{
                            email,
                        },
                    });
                    
                    if(targetUser){
                        if(!targetUser.password || targetUser.password.trim()==="")
                            throw new Error(`Account is already created by ${targetUser.provider}.`);

                        const match = await bcrypt.compare(password, targetUser.password);
                        

                        if(match){
                            return {id:targetUser.id, name:targetUser.username, email:targetUser.email, provider:targetUser.provider, accessToken:""};
                            
                        }
                        
                        throw new Error("Password doesn't match.");
                    }
                    
                    throw new Error("Cannot find your account.");

                }catch(error){
                    
                    if (error instanceof ZodError)
                        throw new Error(`${error.issues[0].message}`);

                    throw new Error((error as Error).message);
                }
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
                    const projectPasswordHash =  await bcrypt.hash("defaultapp",10);

                    await db.project.create({
                        data: {
                          projectName:"default_app",
                          agentImage: "https://res.cloudinary.com/dulb5sobi/image/upload/v1705774134/detn3aisfajqzq0kghaq.png",
                          agentName: newUser.username,
                          password: projectPasswordHash,
                          api_key: generateApiKey(),
                          userId: newUser.id,
                        },
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
        error: "/account",
        signIn:"/account",
    },
};

export const getAuthSession = ()=> getServerSession(authOptions);
