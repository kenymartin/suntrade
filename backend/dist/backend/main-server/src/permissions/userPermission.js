"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canEdit = exports.canDelete = exports.canCreate = exports.canView = void 0;
exports.canViewOrders = canViewOrders;
exports.canMakePayment = canMakePayment;
exports.canViewSales = canViewSales;
exports.canCreateOrder = canCreateOrder;
exports.canViewCustomers = canViewCustomers;
exports.canCancelOrder = canCancelOrder;
exports.canApproveOrder = canApproveOrder;
exports.canRejectOrder = canRejectOrder;
exports.canTrackManufacturing = canTrackManufacturing;
exports.canCreateSolarPanel = canCreateSolarPanel;
exports.canViewSolarPanel = canViewSolarPanels;
exports.canEditSolarPanel = canEditSolarPanel;
exports.canCreateComponent = canCreateComponent;
exports.canViewComponents = canViewComponents;
exports.canEditComponents = canEditComponents;
exports.canViewInventories = canViewInventory;
exports.canScanSolarPanel = canScanSolarPanel;
exports.canViewSolarPanelsByOrder = canViewSolarPanelsByOrder;
exports.canReportMissingComponents = canReportMissingComponents;
exports.canReportWrongComponents = canReportWrongComponents;
exports.canReportBrokenComponents = canReportBrokenComponents;
exports.canRequestRawMaterails = canRequestRawMaterails;
exports.canDeleteSolarPanel = canDeleteSolarPanel;
exports.canAddMaterialToInventory = canAddMaterialToInventory;
var enums_1 = require("../../../../shared/utils/enums");
// #region Customer
var topLevelRoles = [enums_1.Role.Admin, enums_1.Role.SuperAdmin];
function canViewOrders(user, orders) {
    var canview = false;
    if (Array.isArray(orders)) {
        canview =
            orders.some(function (o) { return o.userId === user.id || o.createdBy === user.id; }) ||
                user.roleByUser.some(function (o) { return topLevelRoles.includes(o.roleId); });
    }
    else {
        var order = orders;
        canview = order.userId === user.id || order.createdBy === user.id;
    }
    return canview;
}
function canMakePayment(user, order) {
    return (user.id === order.userId &&
        user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Customer; }));
}
// #endregion
// #region Sales
function canViewSales(user, sales) {
    var canview = false;
    if (Array.isArray(sales)) {
        canview =
            sales.some(function (o) { return o.createdBy === user.id; }) &&
                user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Sales || topLevelRoles.includes(o.roleId); });
    }
    else {
        var sale = sales;
        canview =
            sale.createdBy === user.id &&
                user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Sales; });
    }
    return canview;
}
function canCreateOrder(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Sales || topLevelRoles.includes(o.roleId); });
}
function canViewCustomers(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Sales || topLevelRoles.includes(o.roleId); });
}
function canCancelOrder(user, order) {
    return (user.id === order.createdBy &&
        user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Sales || topLevelRoles.includes(o.roleId); }));
}
// #endregion
// #region Production
function canApproveOrder(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Production || topLevelRoles.includes(o.roleId); });
}
function canRejectOrder(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Production || topLevelRoles.includes(o.roleId); });
}
function canTrackManufacturing(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Production || topLevelRoles.includes(o.roleId); });
}
// #endregion
// #region Engineering
function canCreateSolarPanel(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering || topLevelRoles.includes(o.roleId); });
}
function canViewSolarPanels(user, SolarPanels) {
    var canview = false;
    if (Array.isArray(SolarPanels)) {
        canview =
            SolarPanels.some(function (o) { return o.createdBy === user.id; }) &&
                user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering || topLevelRoles.includes(o.roleId); });
    }
    else {
        canview =
            SolarPanels.createdBy === user.id &&
                user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering || topLevelRoles.includes(o.roleId); });
    }
    return canview;
}
function canEditSolarPanel(user, SolarPanel) {
    return (SolarPanel.createdBy === user.id &&
        (user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering; }) ||
            user.roleByUser.some(function (o) { return topLevelRoles.includes(o.roleId); })));
}
function canDeleteSolarPanel(user, SolarPanel) {
    return (SolarPanel.createdBy === user.id ||
        user.roleByUser.some(function (o) { return topLevelRoles.includes(o.roleId); }));
}
function canCreateComponent(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering || topLevelRoles.includes(o.roleId); });
}
function canViewComponents(user, components) {
    var canview = false;
    if (Array.isArray(components)) {
        canview = components.some(function (o) {
            return (o.createdBy === user.id && o.roleId === enums_1.Role.Engineering) ||
                topLevelRoles.includes(o.roleId);
        });
    }
    else {
        canview =
            components.createdBy ===
                (user.id ||
                    user.roleByUser.some(function (o) { return topLevelRoles.includes(o.roleId); }));
    }
    return canview;
}
function canEditComponents(user, component) {
    return (component.createdBy === user.id &&
        user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Engineering || topLevelRoles.includes(o.roleId); }));
}
function canViewInventory(user) {
    var canview = false;
    canview = user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.SupplyChain || topLevelRoles.includes(o.roleId); });
    return canview;
}
function canRequestRawMaterails(user) {
    return user.roleByUser.some(function (o) { return o.roleId == enums_1.Role.SupplyChain || topLevelRoles.includes(o.roleId); });
}
function canAddMaterialToInventory(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.SupplyChain || topLevelRoles.includes(o.roleId); });
}
// #endregion
// #region Manufacturing
function canScanSolarPanel(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId); });
}
function canViewSolarPanelsByOrder(user, SolarPanel) {
    var canview = false;
    if (Array.isArray(SolarPanel)) {
        canview =
            SolarPanel.some(function (o) { return o.createdBy === user.id; }) &&
                user.roleByUser.some(function (o) {
                    return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId);
                });
    }
    else {
        canview =
            SolarPanel.createdBy === user.id &&
                user.roleByUser.some(function (o) {
                    return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId);
                });
    }
    return canview;
}
function canReportMissingComponents(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId); });
}
function canReportWrongComponents(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId); });
}
function canReportBrokenComponents(user) {
    return user.roleByUser.some(function (o) { return o.roleId === enums_1.Role.Manufacturing || topLevelRoles.includes(o.roleId); });
}
var canView = function (user, model, defaultRole) {
    var result = false;
    if (Array.isArray(model)) {
        result =
            model.some(function (o) { return o.createdBy === user.id; }) &&
                user.roleByUser.some(function (o) { return o.roleId === defaultRole.valueOf(); });
    }
    else {
        result =
            model.createdBy === user.id &&
                user.roleByUser.some(function (o) {
                    return o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId);
                });
    }
    return result;
};
exports.canView = canView;
var canEdit = function (user, model, defaultRole) {
    return (model.createdBy === user.id &&
        user.roleByUser.some(function (o) {
            return o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId);
        }));
};
exports.canEdit = canEdit;
var canCreate = function (user, defaultRole) {
    return user.roleByUser.some(function (o) {
        return o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId);
    });
};
exports.canCreate = canCreate;
var canDelete = function (user, model, defaultRole) {
    return (model.createdBy === user.id &&
        user.roleByUser.some(function (o) {
            return o.roleId === defaultRole.valueOf() || topLevelRoles.includes(o.roleId);
        }));
};
exports.canDelete = canDelete;
//# sourceMappingURL=userPermission.js.map