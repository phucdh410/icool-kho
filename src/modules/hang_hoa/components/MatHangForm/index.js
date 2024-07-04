import { CCard, CCardBody } from "@coreui/react";
import { Toolbar } from "./Toolbar";
import { GroupInput } from "./GroupInput";
import { SuggestTable } from "./SuggestTable";

export const MatHangForm = ({ control, isSubmitting, onSubmit, isSuggest }) => {
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar canAdd loading={isSubmitting} onSumbit={onSubmit} />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <GroupInput control={control} />
        </CCardBody>
      </CCard>
      {isSuggest ? (
        <>Price table</>
      ) : (
        // <SuggestTable control={control} />
        <SuggestTable control={control} />
      )}
    </>
  );
};
