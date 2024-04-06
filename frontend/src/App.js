// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventsPage, loader } from './pages/EventsPage';
import { deleteDetailAction, EventDetailsPage, loaderDetails } from './pages/EventDetailsPage';
import { NewEventPage } from './pages/NewEventPage';
import { EditEventPage } from './pages/EditEventPage';
import { Layout } from './pages/Layout';
import { EventsLayout } from './pages/EventsLayout';
import { Error } from './pages/Error';
import { action } from './components/EventForm';
import { actionNews, NewsletterPage } from './pages/Newsletter';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <HomePage /> },
			{
				path: 'events',
				element: <EventsLayout />,
				children: [
					{
						index: true,
						element: <EventsPage />,

						loader: loader,
					},
					{
						path: ':eventId',
						id: 'event-detail',
						loader: loaderDetails,
						children: [
							{
								index: true,
								element: <EventDetailsPage />,
								action: deleteDetailAction,
							},
							{ path: 'edit', element: <EditEventPage />, action: action },
						],
					},
					{ path: 'new', element: <NewEventPage />, action: action },
				],
			},
			{
				path: 'newsletter',
				element: <NewsletterPage />,
				action: actionNews,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
