import { json, useRouteLoaderData } from 'react-router-dom';
import { EventItem } from '../components/EventItem';

export const EventDetailsPage = () => {
	// const params = useParams();
	const data = useRouteLoaderData('event-detail')
	// console.log(data)

	return (
		<>
			<EventItem event={data.event} />
		</>
	);
};

export const loaderDetails = async ({ req, params }) => {
	console.log(params);

	const id = params.eventId;

	const response = await fetch('http://localhost:8080/events/' + id);



	if (!response.ok) {
		throw json({ message: 'could not fetch for events details' }, { status: 500 });
	} else {
		return response;
	}
};
