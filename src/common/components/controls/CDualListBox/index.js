import "react-dual-listbox/lib/react-dual-listbox.css";

import DualListBox from "react-dual-listbox";

import { First, Last, Back, NextStroke } from "_assets/icons";

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
