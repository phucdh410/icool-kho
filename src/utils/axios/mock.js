import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var mock = new MockAdapter(axios, { delayResponse: 1000 });

// require("glob")
// 	.sync("./_mock/*.mock.js")
// 	.forEach((file) => require(path.resole(file)).default(mock));

require("./mock/auth.mock").default(mock);
require("./mock/backlog_slip.mock").default(mock);
require("./mock/cancellation_slip.mock").default(mock);
require("./mock/export_slip.mock").default(mock);
require("./mock/good.mock").default(mock);
require("./mock/inventory_adjustment.mock").default(mock);
require("./mock/inventory_slip.mock").default(mock);
require("./mock/material_group.mock").default(mock);
require("./mock/material.mock").default(mock);
require("./mock/purchase_proposal_form.mock").default(mock);
require("./mock/purchase_slip.mock").default(mock);
require("./mock/return_slip.mock").default(mock);
require("./mock/store.mock").default(mock);
require("./mock/user.mock").default(mock);
require("./mock/warehouse.mock").default(mock);
