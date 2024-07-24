import DualListBox from "react-dual-listbox";

import { Back, First, Last, NextStroke } from "_assets/icons";

import "react-dual-listbox/lib/react-dual-listbox.css";

const icons = {
	moveLeft: <Back />,
	moveAllLeft: <First />,
	moveRight: <NextStroke />,
	moveAllRight: <Last />,
};

const CDualListBox = ({ options, selected, onChange, ...rest }) => {
	return (
		<DualListBox
			icons={icons}
			options={options}
			selected={selected}
			onChange={onChange}
			{...rest}
		/>
	);
};

export default CDualListBox;
