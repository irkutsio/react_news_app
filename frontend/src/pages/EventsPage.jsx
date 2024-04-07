import { json, useLoaderData, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export function EventsPage() {
	const {events} = useLoaderData();
// console.log(events)
	// console.log(data);
	// const events = data.events;

	// if (data.isError) {
	// 	return <p>{data.message}</p>;
	// }

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={events}>
				{loadedEvents => {
				// console.log(loadedEvents);
			return	<EventsList events={loadedEvents.events} />}}
				</Await>
		</Suspense>
		// <>
		// 	<EventsList events={events} />
		// </>
	);
}

const loadEvents = async () => {
	const response = await fetch('http://localhost:8080/events');
	if (!response.ok) {
		// return { isError: true, message: 'ooops....' };
		// throw new Response(JSON.stringify({ message: 'could not fetch events' }), { status: 500 });

		throw json({ message: 'could not fetch data' }, { status: 500 });
	} else {
		// console.log(response);
		// return response;
		const resData = await response.json();
		return resData;
		// 		const resData = await response.json();
		// const res = new Response('any data', {status: 201});
		// console.log(res)
		// return res
		// or return resData
	}
};

export const loader = () => {
	return defer({
		events: loadEvents(),
	});
};
