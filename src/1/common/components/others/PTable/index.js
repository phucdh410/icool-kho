import { useEffect, useRef } from "react";

import "./styles.scss";

export const PTable = ({ children, ...props }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const thead = tableRef.current.querySelector("thead");
      if (thead) {
        const thElements = thead.querySelectorAll("th");
        thElements.forEach((th, index) => {
          if (th.align === "center") {
            const tdElements = tableRef.current.querySelectorAll(
              `tbody td:nth-child(${index + 1})`
            );
            tdElements.forEach((td) => {
              td.setAttribute("align", "center");
            });
          } else if (th.align === "left") {
            const tdElements = tableRef.current.querySelectorAll(
              `tbody td:nth-child(${index + 1})`
            );
            tdElements.forEach((td) => {
              td.setAttribute("align", "left");
            });
          } else if (th.align === "right") {
            const tdElements = tableRef.current.querySelectorAll(
              `tbody td:nth-child(${index + 1})`
            );
            tdElements.forEach((td) => {
              td.setAttribute("align", "right");
            });
          }
        });
      }
    }
  }, [children]);

  //#region Render
  return (
    <div id="c-table-phuc-container" className="overflow-auto block">
      <table ref={tableRef} id="c-table-phuc" {...props}>
        {children}
      </table>
    </div>
  );
  //#endregion
};
