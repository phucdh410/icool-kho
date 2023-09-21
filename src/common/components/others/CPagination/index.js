import { useCallback } from "react";
import PropTypes from "prop-types";

import { CPagination } from "@coreui/react";
import { CSelect } from "_components/controls";

import { PAGINATIONOPTIONS } from "src/configs/constant";

const Pagination = ({ page, total, limit, onPaginationChange }) => {
	const changeLimit = useCallback(
		(e) => onPaginationChange({ page, limit: e.value }),
		[page]
	);

	const changePage = useCallback(
		(i) => onPaginationChange({ page: i, limit }),
		[limit]
	);

	return (
		<div className="c-pagination">
			<div className="form-group ml-0 mr-4">
				<CSelect
					className="mx-2 w-100"
					value={limit}
					menuPortalTarget={document.body}
					menuPlacement="auto"
					onChange={changeLimit}
					options={PAGINATIONOPTIONS}
				/>
			</div>
			<CPagination
				activePage={page}
				pages={Math.ceil(total / limit) || 1}
				onActivePageChange={changePage}
			></CPagination>
		</div>
	);
};

Pagination.defaultProps = {
	page: 1,
	total: 0,
};

Pagination.propTypes = {
	page: PropTypes.number,
	total: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired,
};

export default Pagination;
