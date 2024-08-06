import { Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";

import {
  CButton,
  CCheckbox,
  CRating,
  CSelect,
  CSelectMulti,
} from "src/common/components/controls";

import { FilesCell } from "./FilesCell";

export const Row = ({
  control,
  data,
  index,
  onlyView,
  suppliers_options,
  materials_options,
  onListChange,
}) => {
  const { pathname } = useLocation();
  return (
    <tr>
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.selected`}
          render={({ field }) => (
            <CCheckbox {...field} value={data?.selected} />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={suppliers_options ?? []}
              display="code"
              select="value"
              readOnly={onlyView}
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={suppliers_options ?? []}
              select="value"
              readOnly={onlyView}
            />
          )}
        />
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.financial`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.reputation`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.quality`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.branch_review`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.customer_review`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.pricing`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.materials`}
            render={({ field: { onChange, ..._field } }) => (
              <CSelectMulti
                {..._field}
                onChange={onListChange(onChange)}
                className="flex-1"
                options={materials_options ?? []}
                canWrap
                readOnlyText={onlyView}
              />
            )}
          />
        </div>
      </td>
      <FilesCell control={control} index={index} readOnly={onlyView} />
      {onlyView && (
        <td>
          <CButton
            onClick={() => history.push(`${pathname}/${id}`)}
            className="btn-fill !bg-[#FFB946]"
            icon={<i className="fa-solid fa-flag"></i>}
          >
            Đánh giá
          </CButton>
        </td>
      )}
    </tr>
  );
};
