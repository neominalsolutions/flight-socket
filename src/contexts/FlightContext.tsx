import { createContext, useState } from 'react';

export enum FlightType {
	arrival = 'arrival',
	departure = 'departure',
}

export type FlightContextType = {
	state: FlightState;
	addItem: (item: any, type: FlightType) => void;
	deleteItem: (id: number, type: FlightType) => void;
	updateItem: (item: any, type: FlightType) => void;
	init: (data: any[], type: FlightType) => void;
};

interface FlightState {
	arrivals: any[];
	departures: any[];
}

export const FlightContext = createContext<FlightContextType | null>(null);

const FlightContextProvider = ({ children }: any) => {
	const [state, setState] = useState<FlightState>({
		arrivals: [],
		departures: [],
	});

	const init = (data: any[], type: FlightType) => {
		if (type === FlightType.arrival) {
			state.arrivals = [...data];

			setState({ ...state });
		}
	};

	const addItem = (item: any, type: FlightType) => {
		if (type === FlightType.arrival) {
			const exists = state.arrivals.find((x) => x.Id === item.Id);
			// state böyle bir bilgisi yoksa ekle
			if (!exists) {
				state.arrivals = [...state.arrivals, item];
				setState({ ...state });
				console.log('record is not exists');
			}
		}
	};

	const deleteItem = (Id: number, type: FlightType) => {
		// state böyle bir bilgi var ve delete olarak event geliyorsa sil
		if (type === FlightType.arrival) {
			const filteredItems = state.arrivals.filter((x) => x.Id !== Id);
			state.arrivals = [...filteredItems];
			setState({ ...state });
		}
	};

	const updateItem = (item: any, type: FlightType) => {
		if (type === FlightType.arrival) {
			if (state.arrivals) {
				const exists = state.arrivals.find((x) => x.Id === item.Id);

				// elimizde böyle bir kayıt varsa

				if (exists) {
					const _arrivals = state.arrivals.map((record: any) => {
						if (record.Id === item.Id) {
							return item; // güncel olanı döndür
						} else {
							return record; // eski datayı döndür.
						}
					});

					state.arrivals = [..._arrivals];

					setState({ ...state });
				} else {
					addItem(item, type);
				}
			}
		}
	};

	const values = { init, addItem, updateItem, deleteItem, state };

	return (
		<FlightContext.Provider value={values}>{children}</FlightContext.Provider>
	);
};

export default FlightContextProvider;
