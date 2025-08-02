import { redirect } from 'next/navigation';

const SignUpPage = () => {
	// Redirect to the new unified auth route
	redirect('/auth');
};

export default SignUpPage;
