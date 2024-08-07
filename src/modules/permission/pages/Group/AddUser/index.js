import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { getAll } from "_common/queries-fn/user.query";
import { CButton, CInput, CSelect } from "_components/controls";
import { CDialog } from "_components/others";

import { getAll as getAllStore } from "../../../queries-fn/store.query";

import Row from "./Row";

import "../../../assets/css/add-user.scss";

const initialState = {
  code: "",
  name: "",
  store_code: "",
};

export default ({ show, group, setShow, onAdd }) => {
  //#region Data
  const ref = useRef(null);
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: initialState,
  });

  const [filter, setFilter] = useState({});

  const { data: users, refetch, set } = getAll(filter);

  const { data: stores } = getAllStore({});

  const [selected, setSelected] = useState({});
  //#endregion

  //#region Event
  const onClose = () => {
    setFilter({});
    setSelected({});
    reset(initialState);
    refetch();
    setShow(false);
  };

  const onChange = (user) => (v) => {
    if (selected[user.code]) delete selected[user.code];
    else selected[user.code] = user;
    setSelected({ ...selected });
  };

  const onStoreChange = ({ value }) => setValue("store_code", value);

  const addToGroup = () => {
    onAdd(Object.values(selected));
    onClose();
  };

  const search = handleSubmit(
    (d) => setFilter(filterFn(d)),
    (e) => noti("error", e)
  );
  //#endregion

  //#region Render
  return (
    <CDialog show={show} size="xl" onClose={onClose}>
      <CCard className="add-user">
        <CCardHeader>
          <h5 className="m-0">Thêm người dùng vào nhóm: {group?.name}</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="12" sm="12" md="6" lg="4" xl="4">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CInput label="Mã nhân viên" {...field} />
                )}
              />
            </CCol>
            <CCol xs="12" sm="12" md="6" lg="4" xl="4">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CInput label="Tên nhân viên" {...field} />
                )}
              />
            </CCol>
            <CCol innerRef={ref} xs="12" sm="12" md="6" lg="4" xl="4">
              <Controller
                control={control}
                name="store_code"
                render={({ field }) => (
                  <CSelect
                    menuPortalTarget={null}
                    label="Chi nhánh"
                    options={stores}
                    {...field}
                    onChange={onStoreChange}
                  />
                )}
              />
            </CCol>
            <CCol xs="12" sm="12" md="12" lg="12" xl="12">
              <div className="form-group c-input text-right">
                <div>
                  <CButton
                    className="m-0"
                    icon={<Magnifying />}
                    onClick={search}
                  >
                    Tìm kiếm
                  </CButton>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-0">
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflow: "auto" }}
          >
            <table className="table table-hover border c-table selectable">
              <thead>
                <tr>
                  <th></th>
                  <th>Mã Nhân Viên</th>
                  <th>Tên Nhân Viên</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <Row
                    key={u.id}
                    data={u}
                    check={selected[u.code]}
                    onChange={onChange(u)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
        <CCardFooter className="border-0">
          <div className="form-group c-input text-right">
            <div>
              <CButton className="m-0" onClick={addToGroup}>
                Thêm nhân viên vào nhóm
              </CButton>
            </div>
          </div>
        </CCardFooter>
      </CCard>
    </CDialog>
  );
  //#endregion
};
