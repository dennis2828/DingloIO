import { SignInForm } from "./components/forms/sign-in-form";

const SignInPage = ({searchParams}:{searchParams:{error: string}}) =>{
    return (
      <SignInForm errorMessage={searchParams.error}/>
    )
}

export default SignInPage;