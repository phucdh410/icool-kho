import { CCard, CCardBody } from "@coreui/react";
import { Toolbar } from "./Toolbar";
import { GroupInput } from "./GroupInput";
import { Table } from "./Table";
import { SuggestTable } from "./SuggestTable";

export const MatHangForm = ({ control, isSuggest }) => {
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <GroupInput control={control} />
        </CCardBody>
      </CCard>
      {isSuggest ? (
        <SuggestTable control={control} />
      ) : (
        <Table control={control} />
      )}
    </>
  );
};
