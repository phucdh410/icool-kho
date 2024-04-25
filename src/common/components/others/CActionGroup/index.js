import { useCallback } from "react";

import { CButton } from "_components/controls";

import {
  XCircle,
  PlusCircle,
  EditPencil,
  Save,
  Trash,
  Print,
} from "_assets/icons";

const ActionGroup = ({
  status,
  canAdd,
  canEdit,
  canSave,
  canRemove,
  canPrint,
  onClick,
  hideSaveBtn = false,
  hideEditBtn = false,
}) => {
  const click = useCallback((state) => () => onClick(state), [onClick]);

  return (
    <>
      <CButton
        icon={status === 2 ? <XCircle /> : <PlusCircle />}
        disabled={!canAdd}
        color={status === 2 ? "danger" : "primary"}
        onClick={click("add")}
      >
        Thêm
      </CButton>
      {!hideEditBtn && (
        <CButton
          icon={status === 3 ? <XCircle /> : <EditPencil />}
          disabled={!canEdit}
          color={status === 3 ? "danger" : "primary"}
          onClick={click("edit")}
        >
          Sửa
        </CButton>
      )}
      {!hideSaveBtn && (
        <CButton icon={<Save />} disabled={!canSave} onClick={click("save")}>
          Lưu
        </CButton>
      )}
      <CButton
        icon={<Trash />}
        color="danger"
        disabled={!canRemove}
        onClick={click("remove")}
      >
        Xóa
      </CButton>
      <CButton icon={<Print />} disabled={!canPrint} onClick={click("print")}>
        In
      </CButton>
    </>
  );
};

ActionGroup.defaultProps = {
  status: 0,
  canAdd: true,
  canEdit: false,
  canSave: false,
  canRemove: false,
  canPrint: false,
  select: 0,
};

export default ActionGroup;
