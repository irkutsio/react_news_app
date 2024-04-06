import { useRouteLoaderData } from 'react-router-dom';
import { EventForm } from '../components/EventForm';

export const EditEventPage = () => {

const data = useRouteLoaderData('event-detail')

console.log(data)

	return (
		<>
			<EventForm event={data.event} method='patch'/>
		</>
	);
};
