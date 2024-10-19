"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyType = exports.SourceTypeNotification = exports.PaymentGatewayStatus = exports.PaymentGateway = exports.PaymentMethod = exports.CardType = exports.PaymentStatus = exports.AddressType = exports.OrderStatus = exports.Phonetype = exports.PaymentType = exports.Role = exports.PackagingType = exports.AccountType = exports.ContactType = exports.ChangePasswordType = exports.ForgotPasswordType = exports.NotificationType = exports.EmailType = exports.PositionType = exports.SolarPanelType = exports.ProductType = void 0;
var ProductType;
(function (ProductType) {
    ProductType[ProductType["SolarPanel"] = 100] = "SolarPanel";
    ProductType[ProductType["IndustrialDoor"] = 101] = "IndustrialDoor";
})(ProductType || (exports.ProductType = ProductType = {}));
var SolarPanelType;
(function (SolarPanelType) {
    SolarPanelType[SolarPanelType["FibberGlass"] = 100] = "FibberGlass";
    SolarPanelType[SolarPanelType["Metal"] = 101] = "Metal";
})(SolarPanelType || (exports.SolarPanelType = SolarPanelType = {}));
var PositionType;
(function (PositionType) {
    PositionType[PositionType["Owner"] = 100] = "Owner";
    PositionType[PositionType["Finacer"] = 200] = "Finacer";
    PositionType[PositionType["Other"] = 300] = "Other";
})(PositionType || (exports.PositionType = PositionType = {}));
var EmailType;
(function (EmailType) {
    EmailType[EmailType["Personal"] = 100] = "Personal";
    EmailType[EmailType["Business"] = 101] = "Business";
})(EmailType || (exports.EmailType = EmailType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["Resistration"] = 100] = "Resistration";
    NotificationType[NotificationType["ChangePassword"] = 101] = "ChangePassword";
    NotificationType[NotificationType["ForgotPassword"] = 102] = "ForgotPassword";
    NotificationType[NotificationType["Error"] = 103] = "Error";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var ForgotPasswordType;
(function (ForgotPasswordType) {
    ForgotPasswordType[ForgotPasswordType["Email"] = 100] = "Email";
    ForgotPasswordType[ForgotPasswordType["Phone"] = 101] = "Phone";
})(ForgotPasswordType || (exports.ForgotPasswordType = ForgotPasswordType = {}));
var ChangePasswordType;
(function (ChangePasswordType) {
    ChangePasswordType[ChangePasswordType["Email"] = 100] = "Email";
    ChangePasswordType[ChangePasswordType["Phone"] = 101] = "Phone";
})(ChangePasswordType || (exports.ChangePasswordType = ChangePasswordType = {}));
var ContactType;
(function (ContactType) {
    ContactType[ContactType["Personal"] = 100] = "Personal";
    ContactType[ContactType["Business"] = 200] = "Business";
})(ContactType || (exports.ContactType = ContactType = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Personal"] = 100] = "Personal";
    AccountType[AccountType["Business"] = 200] = "Business";
})(AccountType || (exports.AccountType = AccountType = {}));
var PackagingType;
(function (PackagingType) {
    PackagingType[PackagingType["Box"] = 100] = "Box";
    PackagingType[PackagingType["Parcel"] = 101] = "Parcel";
    PackagingType[PackagingType["Label"] = 102] = "Label";
    PackagingType[PackagingType["Postcard"] = 103] = "Postcard";
    PackagingType[PackagingType["Envelope"] = 104] = "Envelope";
    PackagingType[PackagingType["Ticket"] = 105] = "Ticket";
    PackagingType[PackagingType["TicketLabel"] = 106] = "TicketLabel";
    PackagingType[PackagingType["Bag"] = 107] = "Bag";
    PackagingType[PackagingType["Pallet"] = 108] = "Pallet";
    PackagingType[PackagingType["PalletLabel"] = 109] = "PalletLabel";
    PackagingType[PackagingType["PalletPostcard"] = 110] = "PalletPostcard";
    PackagingType[PackagingType["PalletEnvelope"] = 111] = "PalletEnvelope";
    PackagingType[PackagingType["PalletTicket"] = 112] = "PalletTicket";
    PackagingType[PackagingType["PalletTicketLabel"] = 113] = "PalletTicketLabel";
    PackagingType[PackagingType["PalletBag"] = 114] = "PalletBag";
    PackagingType[PackagingType["PalletPallet"] = 115] = "PalletPallet";
    PackagingType[PackagingType["PalletPalletLabel"] = 116] = "PalletPalletLabel";
    PackagingType[PackagingType["PalletPalletPostcard"] = 117] = "PalletPalletPostcard";
})(PackagingType || (exports.PackagingType = PackagingType = {}));
/**
 * Represents different user roles in the application.
 * @export enum {number}
 */
var Role;
(function (Role) {
    Role[Role["SuperAdmin"] = 100] = "SuperAdmin";
    Role[Role["Admin"] = 200] = "Admin";
    Role[Role["Production"] = 300] = "Production";
    Role[Role["Sales"] = 400] = "Sales";
    Role[Role["Customer"] = 600] = "Customer";
    Role[Role["Manufacturing"] = 700] = "Manufacturing";
    Role[Role["SupplyChain"] = 800] = "SupplyChain";
    //E-commerce roles
    /**
     * Represent the user that sells in the application(E-commerce)
     * @type {number}
     */
    Role[Role["Seller"] = 600] = "Seller";
    /**
     * Represent the user that buys in the application(E-commerce)
     * @type {number}
     */
    Role[Role["Buyer"] = 601] = "Buyer";
    /**
     * Represent the user that is both a seller and a buyer(E-commerce)
     * @type {number}
     *
     */
    Role[Role["SellerAndBuyer"] = 602] = "SellerAndBuyer";
    Role[Role["Engineering"] = 603] = "Engineering";
})(Role || (exports.Role = Role = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["CC"] = 100] = "CC";
    PaymentType[PaymentType["CHECKING"] = 101] = "CHECKING";
    PaymentType[PaymentType["INVOICE"] = 102] = "INVOICE";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var Phonetype;
(function (Phonetype) {
    Phonetype[Phonetype["Mobile"] = 100] = "Mobile";
    Phonetype[Phonetype["Home"] = 200] = "Home";
    Phonetype[Phonetype["Office"] = 300] = "Office";
})(Phonetype || (exports.Phonetype = Phonetype = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Placed"] = 100] = "Placed";
    OrderStatus[OrderStatus["PendingToApprove"] = 200] = "PendingToApprove";
    OrderStatus[OrderStatus["Approved"] = 300] = "Approved";
    OrderStatus[OrderStatus["InProcess"] = 400] = "InProcess";
    OrderStatus[OrderStatus["Rejected"] = 500] = "Rejected";
    OrderStatus[OrderStatus["Completed"] = 501] = "Completed";
    OrderStatus[OrderStatus["Canceled"] = 502] = "Canceled";
    OrderStatus[OrderStatus["Delivered"] = 503] = "Delivered";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var AddressType;
(function (AddressType) {
    AddressType[AddressType["Billing"] = 100] = "Billing";
    AddressType[AddressType["Shipping"] = 200] = "Shipping";
})(AddressType || (exports.AddressType = AddressType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Paid"] = 100] = "Paid";
    PaymentStatus[PaymentStatus["Unpaid"] = 101] = "Unpaid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var CardType;
(function (CardType) {
    CardType[CardType["Visa"] = 100] = "Visa";
    CardType[CardType["MasterCard"] = 101] = "MasterCard";
    CardType[CardType["AmericanExpress"] = 102] = "AmericanExpress";
    CardType[CardType["Discover"] = 103] = "Discover";
    CardType[CardType["JCB"] = 104] = "JCB";
})(CardType || (exports.CardType = CardType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["CreditCard"] = 100] = "CreditCard";
    PaymentMethod[PaymentMethod["Check"] = 101] = "Check";
    PaymentMethod[PaymentMethod["Cash"] = 102] = "Cash";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway[PaymentGateway["Paypal"] = 100] = "Paypal";
    PaymentGateway[PaymentGateway["Stripe"] = 101] = "Stripe";
})(PaymentGateway || (exports.PaymentGateway = PaymentGateway = {}));
var PaymentGatewayStatus;
(function (PaymentGatewayStatus) {
    PaymentGatewayStatus[PaymentGatewayStatus["Active"] = 100] = "Active";
    PaymentGatewayStatus[PaymentGatewayStatus["Inactive"] = 101] = "Inactive";
})(PaymentGatewayStatus || (exports.PaymentGatewayStatus = PaymentGatewayStatus = {}));
var SourceTypeNotification;
(function (SourceTypeNotification) {
    SourceTypeNotification[SourceTypeNotification["MAIL"] = 100] = "MAIL";
    SourceTypeNotification[SourceTypeNotification["SMS"] = 101] = "SMS";
})(SourceTypeNotification || (exports.SourceTypeNotification = SourceTypeNotification = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType[CurrencyType["USD"] = 100] = "USD";
    CurrencyType[CurrencyType["GBP"] = 101] = "GBP";
    CurrencyType[CurrencyType["EUR"] = 102] = "EUR";
    CurrencyType[CurrencyType["JPY"] = 103] = "JPY";
    CurrencyType[CurrencyType["CNY"] = 104] = "CNY";
})(CurrencyType || (exports.CurrencyType = CurrencyType = {}));
