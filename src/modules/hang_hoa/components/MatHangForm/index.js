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
  isPriceEdit = false,
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
          <GroupInput
            isEdit={isEdit}
            control={control}
            isPriceEdit={isPriceEdit}
          />
        </CCardBody>
      </CCard>
      {isSuggest ? (
        <PriceTable control={control} isPriceEdit={isPriceEdit} />
      ) : (
        <SuggestTable control={control} />
      )}
    </>
  );
};
