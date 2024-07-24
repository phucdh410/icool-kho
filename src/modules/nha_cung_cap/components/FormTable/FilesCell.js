import { useFieldArray } from "react-hook-form";

import { CFile2 } from "src/common/components/controls";

export const FilesCell = ({ index, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `suppliers.${index}.files`,
    keyName: "__id",
  });

  const onAppend = (newFile) => {
    append(newFile);
  };

  const onRemove = (index) => () => {
    remove(index);
  };

  return (
    <td>
      <CFile2 fields={fields} append={onAppend} remove={onRemove} />
    </td>
  );
};
