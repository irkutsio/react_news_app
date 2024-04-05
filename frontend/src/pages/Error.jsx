import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

export const Error = () => {
	const error = useRouteError();

	let title = 'error default';
	let message = 'message default';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'not found';
		message = 'not found';
	}

	return (
		<>
			{' '}
			<MainNavigation />{' '}
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
};
