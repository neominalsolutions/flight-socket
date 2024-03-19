import { createContext, useState } from 'react';

export type ArrivalContextType = {
	state: ArrivalState;
	addItem: (item: any) => void;
	deleteItem: (id: number) => void;
	updateItem: (item: any) => void;
};

interface ArrivalState {
	arrivals: any[];
}

export const ArrivalsContext = createContext<ArrivalContextType | null>(null);

const ArrivalContextProvider = ({ children }: any) => {
	const [state, setState] = useState<ArrivalState>({ arrivals: [] });

	const addItem = (item: any) => {
		const exists = state.arrivals.find((x) => x.id === item.id);
		if (!exists) {
			state.arrivals = [...state.arrivals, item];
			setState({ ...state });
		}
	};

	const deleteItem = (id: number) => {
		const filteredItems = state.arrivals.filter((x) => x.id !== id);
		state.arrivals = [...filteredItems];
		setState({ ...state });
	};

	const updateItem = (item: any) => {
		if (state.arrivals) {
			const exists = state.arrivals.find((x) => x.id === item.id);

			if (exists) {
				const _arrivals = state.arrivals.map((record: any) => {
					if (record.id === item.id) {
						console.log('record', record);
						return item;
					} else {
						return record;
					}
				});

				state.arrivals = [..._arrivals];

				setState({ ...state });
			}
		}
	};

	const values = { addItem, updateItem, deleteItem, state };

	return (
		<ArrivalsContext.Provider value={values}>
			{children}
		</ArrivalsContext.Provider>
	);
};

export default ArrivalContextProvider;
