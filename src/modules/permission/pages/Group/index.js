import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import classNames from "classnames";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody, CCol, CRow } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";
import User from "./User";
import AddUser from "./AddUser";
import AddGroup from "./AddGroup";
import Function from "./Function";
import MaterialsGroups from "./MaterialGroups";
import Report from "./Report";

import { create, remove } from "src/apis/role.api";
import { getAll } from "_common/queries-fn/role.query";
import { fireDelete, fireSuccess } from "src/utils/alert";
import * as api from "src/apis/role.api";
import { isSuccess } from "src/utils/funcs";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { correctPermission } from "src/common/correctDataFunctionFormUnitAndPrice";
import { update } from "src/apis/permission.api";
import { get as getQuery, set as setQuery } from "src/utils/react-query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const GroupPermission = () => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const groupDialog = useRef();

  const { data: roles, set, refetch } = getAll({}, isLoading);

  const [tab, setCurrentTab] = useState(1);

  const [show, setShow] = useState(false);

  const [showGroup, setShowGroup] = useState(false);

  const [currentGroup, setCurrentGroup] = useState(null);

  const [status, setStatus] = useState(0);

  const [employees, setEmployees] = useState([]);

  const [permissions, setPermission] = useState({});

  const [accessGroups, setAccessGroups] = useState({});

  const selected = useMemo(
    () => roles?.filter((d) => !d.status && d.check) || [],
    [roles]
  );
  //#endregion

  //#region Events
  const onTabClick = useCallback(
    (tabId) => () => {
      !!currentGroup && setCurrentTab(tabId);
    },
    [currentGroup]
  );

  const onAddGroup = useCallback(
    async (data) => {
      const res = await create(data);

      if (isSuccess(res)) {
        setCurrentGroup(res.data);
        set([{ ...res.data, check: true }, ...roles]);
        groupDialog.current.onClose();
      } else {
        noti("error", ERROR_MESSAGE.PERMISSION.GROUP_EXIST);
      }
    },
    [roles, set]
  );

  const onAddEmployees = useCallback(() => {
    setShow(!show);
  }, [show, setShow]);

  const addEmployees = useCallback(
    (_employees) => {
      let _filtered = _employees.filter(
        (e) => !employees.find((_e) => _e.code === e.code)
      );
      setEmployees([...employees, ..._filtered]);
    },
    [employees]
  );

  const onRemoveEmployees = useCallback(
    (code) => () => {
      setEmployees(employees.filter((e) => e.code !== code));
    },
    [employees, setEmployees]
  );

  const onPermissionChange = useCallback(
    (v) => setPermission(v),
    [permissions, setPermission]
  );

  const onAccessGroupChange = useCallback(
    (v) => setAccessGroups(v),
    [accessGroups, setAccessGroups]
  );

  const onAdd = useCallback(() => setShowGroup(true), []);

  const onEdit = useCallback(() => {
    if (!currentGroup) {
      const selected = roles.find((r) => r.check);

      setCurrentGroup(selected);
      setCurrentTab(1);

      // get data
      const users = getQuery(["permission", "users", selected.code]);
      if (users) {
        setEmployees(users);
      } else {
        api.getUserByRole(selected.code).then((e) => {
          setEmployees(e);
          setQuery(["permission", "users", selected.code], e);
        });
      }

      api
        .getPermissionByRole(selected.code)
        .then((d) => setPermission(d || {}));

      api
        .getMaterialGroupsByRole(selected.code)
        .then((g) => setAccessGroups(g));
    } else {
      onClear();
    }
  }, [currentGroup, roles]);

  const onSave = async () => {
    const _premission = correctPermission(
      currentGroup,
      employees,
      permissions,
      accessGroups
    );

    const res = await update(_premission);

    if (isSuccess(res)) {
      noti("success", SUCCESS_MESSAGE.PERMISSION.UPDATE);
      onClear();
    } else {
      noti("error", ERROR_MESSAGE.PERMISSION.UPDATE);
    }
  };

  const onClear = useCallback(() => {
    setCurrentTab(1);
    setCurrentGroup(null);
    setEmployees([]);
    setPermission({});
    setAccessGroups({});
    // setAccessSummaries({});
  });

  const onRemove = useCallback(async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await remove(selected.map((s) => s.code));

      if (isSuccess(res)) {
        refetch();
        fireSuccess();
      } else {
        fireError();
      }
    }
  });

  const onRowClick = useCallback(async (item) => {
    const users = getQuery(["permission", "users", item.code]);
    if (users) {
      setEmployees(users);
    } else {
      api.getUserByRole(item.code).then((e) => {
        setEmployees(e);
        setQuery(["permission", "users", item.code], e);
      });
    }
  }, []);
  //#endregion

  useEffect(() => {
    if (selected.length !== 1 && status === 3) setStatus(0);
  }, [selected]);

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody>
          <Toolbar
            selectedNo={selected.length}
            canSave={!!currentGroup}
            onAdd={onAdd}
            onSave={onSave}
            onEdit={onEdit}
            onClear={onClear}
            onRemove={onRemove}
            status={!!currentGroup ? 3 : 0}
          />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              <h5 className="text-center mb-0">NHÓM NGƯỜI DÙNG</h5>
            </CCardHeader>
            <CCardBody className={"p-0"}>
              <Table
                onRowClick={onRowClick}
                onSelect={(v) => set(v)}
                isLoading={isLoading}
                status={!!currentGroup}
                data={roles}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader className="p-0 tabs border-0">
              <ul className="nav nav-tabs modules">
                <li className="nav-item" onClick={onTabClick(1)}>
                  <span
                    className={classNames(
                      "nav-link text-center px-4",
                      tab === 1 && "active"
                    )}
                    style={{ minWidth: "200px" }}
                  >
                    Người dùng
                  </span>
                </li>
                <li className="nav-item" onClick={onTabClick(2)}>
                  <span
                    className={classNames(
                      "nav-link text-center px-4",
                      tab === 2 && "active"
                    )}
                    style={{ minWidth: "200px" }}
                  >
                    Chức năng
                  </span>
                </li>
                <li className="nav-item" onClick={onTabClick(3)}>
                  <span
                    className={classNames(
                      "nav-link text-center px-4",
                      tab === 3 && "active"
                    )}
                    style={{ minWidth: "200px" }}
                  >
                    Nhóm hàng
                  </span>
                </li>
                <li className="nav-item" onClick={onTabClick(4)}>
                  <span
                    className={classNames(
                      "nav-link text-center px-4",
                      tab === 4 && "active"
                    )}
                    style={{ minWidth: "200px" }}
                  >
                    Báo cáo
                  </span>
                </li>
              </ul>
            </CCardHeader>
            <CCardBody className="p-0">
              <div className="tab-content">
                <div
                  className={classNames(
                    "table-responsive tab-pane fade",
                    tab === 1 && "show active"
                  )}
                >
                  <User
                    isLoading={isLoading}
                    employees={employees}
                    status={!!currentGroup}
                    onAddEmployees={onAddEmployees}
                    onRemoveEmployees={onRemoveEmployees}
                  />
                </div>
                <div
                  className={classNames(
                    "table-responsive tab-pane fade",
                    tab === 2 && "show active"
                  )}
                >
                  <Function
                    isLoading={isLoading}
                    permissions={permissions}
                    onChange={onPermissionChange}
                  />
                </div>
                <div
                  className={classNames(
                    "table-responsive tab-pane fade",
                    tab === 3 && "show active"
                  )}
                >
                  <MaterialsGroups
                    isLoading={isLoading}
                    accessGroups={accessGroups}
                    onChange={onAccessGroupChange}
                  />
                </div>
                <div
                  className={classNames(
                    "table-responsive tab-pane fade",
                    tab === 4 && "show active"
                  )}
                >
                  <Report
                    isLoading={isLoading}
                    accessSummaries={permissions}
                    onChange={onPermissionChange}
                  />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddUser
        group={currentGroup}
        show={show}
        setShow={setShow}
        onAdd={addEmployees}
      />
      <AddGroup
        ref={groupDialog}
        show={showGroup}
        setShow={setShowGroup}
        onAdd={onAddGroup}
      />
    </>
  );
  //#endregion
};

export default GroupPermission;
