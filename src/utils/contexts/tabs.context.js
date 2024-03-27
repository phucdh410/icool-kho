import { createContext, useState } from "react";

export const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
	const [extend, setExtend] = useState(null);

	const init = { extend, setExtend };

	return <TabsContext.Provider value={init}>{children}</TabsContext.Provider>;
};
