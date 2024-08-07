import { useFieldArray } from "react-hook-form";

import { CFile2 } from "src/common/components/controls";

export const FilesCell = ({ index, control, readOnly }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `goods.${index}.files`,
    keyName: "__id",
  });

  const onAppend = (newFile) => {
    append(newFile);
  };

  const onRemove = (index) => () => {
    remove(index);
  };

  return (
    <CFile2
      className="w-full"
      fields={fields}
      append={onAppend}
      remove={onRemove}
      readOnly={readOnly}
    />
  );
};
