import { ComboItemsTable } from "./ComboItemsTable";
import { Info } from "./Info";
import { StoresTable } from "./StoresTable";
import { Toolbar } from "./Toolbar";

export const ComboForm = ({ control, onSubmit }) => {
  return (
    <>
      <Toolbar onSubmit={onSubmit} />

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-5">
          <Info control={control} />
        </div>

        <div className="col-span-2">
          <ComboItemsTable control={control} />
        </div>

        <div className="col-span-3">
          <StoresTable control={control} />
        </div>
      </div>
    </>
  );
};
