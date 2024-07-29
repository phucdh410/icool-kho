import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { CDataTable } from "@coreui/react";

import { Ban, SorterAsc, SorterDefault, SorterDesc } from "_assets/icons";

const sortingIconSlot = (s) => {
  switch (s) {
    case "asc":
      return <SorterAsc className="sort asc" />;
    case "desc":
      return <SorterDesc className="sort desc" />;
    default:
      return <SorterDefault className="sort default" />;
  }
};

const noItemsViewSlot = (
  <div className="text-center my-5">
    <h2>Chưa có dữ liệu</h2>
    <Ban className="c-icon c-icon-custom-size text-danger mb-2" />
  </div>
);

const Table = ({
  className,
  data,
  footer,
  itemsPerPage,
  loading,
  page,
  render,
  tableBgColor,
  fields,
  ...rest
}) => {
  const tableClass = classNames("c-table", className, `bg-[${tableBgColor}]`);

  const [saved, setData] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const _data = useMemo(
    () =>
      saved &&
      saved
        .sort((a, b) => {
          if (sortBy) return 1;
          return typeof a[sortBy[0]] === "object"
            ? (sortBy[1] || -1) * (moment(a[sortBy[0]]) - moment(b[sortBy[0]]))
            : (sortBy[1] || -1) *
                a[sortBy[0]].toString().localeCompare(b[sortBy[0]]);
        })
        .slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [sortBy, saved, page, itemsPerPage]
  );

  const onSort = useCallback(({ column, asc }) => setSortBy([column, asc]), []);

  useEffect(() => setData(data), [data]);

  return (
    <CDataTable
      hover
      outlined
      responsive
      sorter
      fields={fields}
      {...rest}
      activePage={saved.length ? 1 : 0}
      addTableClasses={tableClass}
      items={_data}
      itemsPerPage={itemsPerPage}
      loading={loading}
      noItemsViewSlot={noItemsViewSlot}
      onSorterValueChange={onSort}
      scopedSlots={render}
      sortingIconSlot={sortingIconSlot}
      underTableSlot={footer}
    />
  );
};

Table.defaultProps = {
  loading: false,
  data: [],
  itemsPerPage: 10,
  page: 1,
};

Table.propTypes = {
  fields: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  render: PropTypes.object,
  itemsPerPage: PropTypes.number,
};

export default Table;
