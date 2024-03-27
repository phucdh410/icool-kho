import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			retryDelay: 3000,
			refetchOnWindowFocus: false,
			cacheTime: 10000,
			staleTime: 2000,
		},
	},
});

export const set = (key, data, options) =>
	client.setQueryData(key, data, options);

export const get = (key, filter) => client.getQueryData(key, filter);

export const refetch = (key) => client.invalidateQueries(key); // invalidate query key to reload

const MyQueryClientProvider = ({ children }) => (
	<QueryClientProvider client={client}>
		{children}
		<ReactQueryDevtools initialIsOpen={global.isDev} position="bottom-right" />
	</QueryClientProvider>
);

export default MyQueryClientProvider;
