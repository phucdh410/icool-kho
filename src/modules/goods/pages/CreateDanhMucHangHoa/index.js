import { CCard, CCardBody } from "@coreui/react";
import { Toolbar } from "./Toolbar";
import { FormTable } from "./FormTable";
import { FormInput } from "./FormInput";

const CreateDanhMucHangHoa = () => {
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
          // control={control}
          // watch={watch}
          // setValue={setValue}
          // status={status}
          // selectedNo={selected.length}
          // onAdd={onAdd}
          // onSave={onSave}
          // canRemove={selected.length + selectedInput.length}
          // onRemove={onRemove}
          // onStatusChange={onStatusChange}
          // onMaterialGroupSelect={onMaterialGroupSelect}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <FormInput />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="px-0 pt-0">
          <div className="table-responsive">
            <FormTable
            // storeCode={watch("storeCode")}
            // date={watch("checked")}
            // amounts={amounts}
            // data={materials}
            // inputData={inputData}
            // isSelectAll={isSelectAll}
            // onAmountChange={onAmountChange}
            // onInputRowChange={onInputRowChange}
            // onChange={onChange}
            // quantity={summary.quantity}
            // total={summary.total}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CreateDanhMucHangHoa;
