import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

export function EventsPage() {
	const data = useLoaderData();
	// console.log(data);
	const events = data.events;

	// if (data.isError) {
	// 	return <p>{data.message}</p>;
	// }

	return (
		<>
			<EventsList events={events} />
		</>
	);
}

export const loader = async () => {
	const response = await fetch('http://localhost:8080/events');
	if (!response.ok) {
		// return { isError: true, message: 'ooops....' };
		// throw new Response(JSON.stringify({ message: 'could not fetch events' }), { status: 500 });

		throw json({ message: 'could not fetch data' }, { status: 500 });
	} else {
		// console.log(response);
		return response;
		// 		const resData = await response.json();
		// const res = new Response('any data', {status: 201});
		// console.log(res)
		// return res
		// or return resData
	}
};
