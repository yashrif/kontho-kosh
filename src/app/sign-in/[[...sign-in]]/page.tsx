import { redirect } from 'next/navigation';

const SignInPage = () => {
	// Redirect to the new unified auth route
	redirect('/auth');
};

export default SignInPage;
