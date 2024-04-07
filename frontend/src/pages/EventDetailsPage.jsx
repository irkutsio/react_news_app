import { json, useRouteLoaderData, redirect, defer, Await } from 'react-router-dom';
import { EventItem } from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export const EventDetailsPage = () => {
	// const params = useParams();
	const { event, events } = useRouteLoaderData('event-detail');
	// console.log(data)

	return (
		<>
			<Suspense fallback={<p>...loading</p>}>
				<Await resolve={event}>
					{loadedEvent => <EventItem event={loadedEvent} />}
					{/* {loadedEvent => <EventItem event={loadEvent.event} />} можливо */}
				</Await>
			</Suspense>
			<Suspense fallback={<p>...loading</p>}>
				<Await resolve={events}>
					{loadedEvents => <EventItem event={loadedEvents} />}
					{/* {loadedEvents => <EventItem event={loadedEvents} />} */}
				</Await>
			</Suspense>
			<EventsList events={events} />
		</>
	);
};

const loadEvent = async id => {
	const response = await fetch('http://localhost:8080/events/' + id);

	if (!response.ok) {
		throw json({ message: 'could not fetch for events details' }, { status: 500 });
	} else {
		const resData = await response.json();
		return resData;
	}
};

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

export const loaderDetails = async ({ req, params }) => {
	// console.log(params);

	const id = params.eventId;
	return defer({
		event: await loadEvent(id), 
		events: loadEvents(),
	});
};

export const deleteDetailAction = async ({ params, request }) => {
	const eventId = params.eventId;
	const response = await fetch('http://localhost:8080/events/' + eventId, {
		method: request.method,
	});

	if (!response.ok) {
		throw json({ message: 'could not delete event' }, { status: 500 });
	}

	return redirect('/events');
};
