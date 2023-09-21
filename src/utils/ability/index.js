import { createContext } from "react";
import { createContextualCan } from "@casl/react";

import { ability } from "src/configs/ability";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

const AbilityProvider = ({ children }) => (
	<AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
);

export default AbilityProvider;
