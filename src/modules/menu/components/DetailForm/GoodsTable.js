import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";

import { StoresTable } from "./StoresTable";
import { TabGoodsTable } from "./TabGoodsTable";

import "./styles.scss";

export const GoodsTable = ({ control }) => {
  //#region Data
  //#endregion

  //#region Event
  return (
    <div className="menu-tabs">
      <CTabs activeTab="normal">
        <div className="flex items-center justify-between">
          <h3 className="text-[#165873] text-3xl font-bold mr-4">
            Danh sách mặt hàng
          </h3>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="normal" className="!py-2">
                Giá thường
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="holiday" className="!py-2">
                Giá lễ
              </CNavLink>
            </CNavItem>
          </CNav>
        </div>
        <CTabContent>
          <CTabPane data-tab="normal">
            <TabGoodsTable control={control} priceType="normal" />
          </CTabPane>
          <CTabPane data-tab="holiday">
            <TabGoodsTable control={control} priceType="holiday" />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
  //#endregion
};
