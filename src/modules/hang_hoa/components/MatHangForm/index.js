import { CCard, CCardBody } from "@coreui/react";
import { Toolbar } from "./Toolbar";
import { GroupInput } from "./GroupInput";
import { SuggestTable } from "./SuggestTable";
import { PriceTable } from "./PriceTable";

export const MatHangForm = ({
  control,
  isSubmitting,
  onSubmit,
  isEdit = false,
  isSuggest,
}) => {
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            canAdd={!isEdit}
            canSave={isEdit}
            loading={isSubmitting}
            onSumbit={onSubmit}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <GroupInput isEdit={isEdit} control={control} />
        </CCardBody>
      </CCard>
      {isSuggest ? (
        <PriceTable control={control} />
      ) : (
        <SuggestTable control={control} />
      )}
    </>
  );
};
