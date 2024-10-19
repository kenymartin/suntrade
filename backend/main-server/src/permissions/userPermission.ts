import {Role} from "../../../../shared/utils/enums";
// #region Customer
const topLevelRoles:Role[] = [Role.Admin, Role.SuperAdmin];

function canViewOrders(user: { id: any; roleByUser: any[]; }, orders: any | any[]) {
  let canview = false;
  if (Array.isArray(orders)) {
    canview =
      orders.some((o) => o.userId === user.id || o.createdBy === user.id) ||
      user.roleByUser.some((o: { roleId: Role; }) => topLevelRoles.includes(o.roleId));
  } else {
    const order = orders;
    canview = order.userId === user.id || order.createdBy === user.id;
  }
  return canview;
}
function canMakePayment(user: { id: any; roleByUser: any[]; }, order: { userId: any; }) {
  return (
    user.id === order.userId &&
    user.roleByUser.some((o: { roleId: Role; }) => o.roleId === Role.Customer)
  );
}
// #endregion

// #region Sales
function canViewSales(user: { id: any; roleByUser: any[]; }, sales: any | any[]) {
  let canview = false;
  if (Array.isArray(sales)) {
    canview =
      sales.some((o) => o.createdBy === user.id) &&
      user.roleByUser.some(
        (o: { roleId: Role; }) => o.roleId === Role.Sales || topLevelRoles.includes(o.roleId)
      );
  } else {
    const sale = sales;
    canview =
      sale.createdBy === user.id &&
      user.roleByUser.some((o: { roleId: Role; }) => o.roleId === Role.Sales);
  }
  return canview;
}
function canCreateOrder(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Sales || topLevelRoles.includes(o.roleId)
  );
}
function canViewCustomers(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Sales || topLevelRoles.includes(o.roleId)
  );
}
function canCancelOrder(user: { id: any; roleByUser: any[]; }, order: { createdBy: any; }) {
  return (
    user.id === order.createdBy &&
    user.roleByUser.some(
      (o: { roleId: Role; }) => o.roleId === Role.Sales || topLevelRoles.includes(o.roleId)
    )
  );
}

// #endregion

// #region Production
function canApproveOrder(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Production || topLevelRoles.includes(o.roleId)
  );
}
function canRejectOrder(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Production || topLevelRoles.includes(o.roleId)
  );
}
function canTrackManufacturing(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Production || topLevelRoles.includes(o.roleId)
  );
}
// #endregion

// #region Engineering
function canCreateSolarPanel(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Engineering || topLevelRoles.includes(o.roleId)
  );
}
function canViewSolarPanels(user: { id: any; roleByUser: any[]; }, SolarPanels: any | any[]) {
  let canview = false;
  if (Array.isArray(SolarPanels)) {
    canview =
      SolarPanels.some((o) => o.createdBy === user.id) &&
      user.roleByUser.some(
        (o: { roleId: Role; }) => o.roleId === Role.Engineering || topLevelRoles.includes(o.roleId)
      );
  } else {
    canview =
      SolarPanels.createdBy === user.id &&
      user.roleByUser.some(
        (o: { roleId: Role; }) => o.roleId === Role.Engineering || topLevelRoles.includes(o.roleId)
      );
  }
  return canview;
}
function canEditSolarPanel(user: { id: any; roleByUser: any[]; }, SolarPanel: any) {
  return (
    SolarPanel.createdBy === user.id &&
    (user.roleByUser.some((o: { roleId: Role; }) => o.roleId === Role.Engineering) ||
      user.roleByUser.some((o: { roleId: Role; }) => topLevelRoles.includes(o.roleId)))
  );
}
function canDeleteSolarPanel(user: { id: any; roleByUser: any[]; }, SolarPanel: any) {
  return (
    SolarPanel.createdBy === user.id ||
    user.roleByUser.some((o: { roleId: Role; }) => topLevelRoles.includes(o.roleId))
  );
}
function canCreateComponent(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Engineering || topLevelRoles.includes(o.roleId)
  );
}
function canViewComponents(user: { id: any; roleByUser: any[]; }, components: any | any[]) {
  let canview = false;
  if (Array.isArray(components)) {
    canview = components.some(
      (o) =>
        (o.createdBy === user.id && o.roleId === Role.Engineering) ||
        topLevelRoles.includes(o.roleId)
    );
  } else {
    canview =
      components.createdBy ===
      (user.id ||
        user.roleByUser.some((o: { roleId: Role; }) => topLevelRoles.includes(o.roleId)));
  }
  return canview;
}
function canEditComponents(user: { id: any; roleByUser: any[]; }, component: any) {
  return (
    component.createdBy === user.id &&
    user.roleByUser.some(
      (o: { roleId: Role; }) => o.roleId === Role.Engineering || topLevelRoles.includes(o.roleId)
    )
  );
}
function canViewInventory(user: { roleByUser: any[]; }) {
  let canview = false;
  canview = user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.SupplyChain || topLevelRoles.includes(o.roleId)
  );
  return canview;
}
function canRequestRawMaterails(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId == Role.SupplyChain || topLevelRoles.includes(o.roleId)
  );
}
function canAddMaterialToInventory(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.SupplyChain || topLevelRoles.includes(o.roleId)
  );
}
// #endregion

// #region Manufacturing
function canScanSolarPanel(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
  );
}
function canViewSolarPanelsByOrder(user: { id: any; roleByUser: any[]; }, SolarPanel: any | any[]) {
  let canview = false;
  if (Array.isArray(SolarPanel)) {
    canview =
      SolarPanel.some((o) => o.createdBy === user.id) &&
      user.roleByUser.some(
        (o: { roleId: Role; }) =>
          o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
      );
  } else {
    canview =
      SolarPanel.createdBy === user.id &&
      user.roleByUser.some(
        (o: { roleId: Role; }) =>
          o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
      );
  }
  return canview;
}
function canReportMissingComponents(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
  );
}
function canReportWrongComponents(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
  );
}
function canReportBrokenComponents(user: { roleByUser: any[]; }) {
  return user.roleByUser.some(
    (o: { roleId: Role; }) => o.roleId === Role.Manufacturing || topLevelRoles.includes(o.roleId)
  );
}
const canView = (user: any, model: any | any[], defaultRole: Role): boolean => {
  let result = false;
  if (Array.isArray(model)) {
    result =
      model.some((o: any) => o.createdBy === user.id) &&
      user.roleByUser.some((o: { roleId: number; }) => o.roleId === defaultRole.valueOf());
  } else {
    result =
      (model as any).createdBy === user.id &&
      user.roleByUser.some(
        (o: { roleId: number; }) =>
          o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId)
      );
  }
  return result;
};
 const canEdit = (user: any, model: any, defaultRole: Role): boolean => {
  return (
    (model as any).createdBy === user.id &&
    user.roleByUser.some(
      (o: { roleId: number; }) =>
        o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId)
    )
  );
};
const canCreate = (user: any, defaultRole: Role): boolean => {
  return user.roleByUser.some(
    (o: { roleId: number; }) =>
      o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId)
  );
};
const canDelete = (user: any, model: any, defaultRole: Role): boolean => {
  return (
    model.createdBy === user.id &&
    user.roleByUser.some(
      (o: { roleId: number; }) =>
        o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId)
    )
  );
};

// #endregion

export {
  canViewOrders,
  canMakePayment,
  canViewSales,
  canCreateOrder,
  canViewCustomers,
  canCancelOrder,
  canApproveOrder,
  canRejectOrder,
  canTrackManufacturing,
  canCreateSolarPanel,
  canViewSolarPanels as canViewSolarPanel,
  canEditSolarPanel,
  canCreateComponent,
  canViewComponents,
  canEditComponents,
  canViewInventory as canViewInventories,
  canScanSolarPanel,
  canViewSolarPanelsByOrder,
  canReportMissingComponents,
  canReportWrongComponents,
  canReportBrokenComponents,
  canRequestRawMaterails,
  canDeleteSolarPanel,
  canAddMaterialToInventory,
  canView,
  canCreate,
  canDelete,
  canEdit,
};
