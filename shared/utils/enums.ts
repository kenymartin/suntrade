export enum ProductType {
  SolarPanel = 100,
  IndustrialDoor,
}
export enum SolarPanelType {
  FibberGlass = 100,
  Metal,
}
export enum PositionType {
  Owner = 100,
  Finacer = 200,
  Other = 300,
}
export enum EmailType {
  Personal = 100,
  Business,
}
export enum NotificationType {
  Registration = 100,
  ChangePassword,
  ForgotPassword,
  Error,
  Reactivation
}
export enum ForgotPasswordType {
  Email = 100,
  Phone,
}
export enum ChangePasswordType {
  Email = 100,
  Phone,
}
export enum ContactType {
  Personal = 100,
  Business = 200,
}
export enum AccountType {
  Personal = 100,
  Business = 200,
}

export enum PackagingType {
  Box = 100,
  Parcel,
  Label,
  Postcard,
  Envelope,
  Ticket,
  TicketLabel,
  Bag,
  Pallet,
  PalletLabel,
  PalletPostcard,
  PalletEnvelope,
  PalletTicket,
  PalletTicketLabel,
  PalletBag,
  PalletPallet,
  PalletPalletLabel,
  PalletPalletPostcard,
}

/**
 * Represents different user roles in the application.
 * @export enum {number}
 */
export enum Role {
  SuperAdmin = 100,
  Admin = 200,
  Production = 300,
  Sales = 400,
  Customer = 600,
  Manufacturing = 700,
  SupplyChain = 800,
  //E-commerce roles
  /**
   * Represent the user that sells in the application(E-commerce)
   * @type {number}
   */
  Seller = 600,
  /**
   * Represent the user that buys in the application(E-commerce)
   * @type {number}
   */
  Buyer,
  /**
   * Represent the user that is both a seller and a buyer(E-commerce)
   * @type {number}
   *
   */
  SellerAndBuyer,
  Engineering,
}

export enum PaymentType {
  CC = 100,
  CHECKING,
  INVOICE,
}

export enum Phonetype {
  Mobile = 100,
  Home = 200,
  Office = 300,
}

export enum OrderStatus {
  Placed = 100,
  PendingToApprove = 200,
  Approved = 300,
  InProcess = 400,
  Rejected = 500,
  Completed,
  Canceled,
  Delivered,
}
export enum AddressType {
  Billing = 100,
  Shipping = 200,
}
export enum PaymentStatus {
  Paid = 100,
  Unpaid,
}
export enum CardType {
  Visa = 100,
  MasterCard,
  AmericanExpress,
  Discover,
  JCB,
}
export enum CardStatus {
  Active = 100,
  Inactive,
}
export enum PaymentMethod {
  CreditCard = 100,
  Check,
  Cash,
}
export enum PaymentGateway {
  Paypal = 100,
  Stripe,
}
export enum PaymentGatewayStatus {
  Active = 100,
  Inactive,
}

export enum SourceTypeNotification {
  MAIL = 100,
  SMS,
}
export enum CurrencyType {
  USD = 100,
  GBP,
  EUR,
  JPY,
  CNY,
}
export enum AccountActivationError {
  AA = 'User is already active',
  NA = 'User is not active',
  NF = 'User not found',
  EL = 'Expired link'
}
