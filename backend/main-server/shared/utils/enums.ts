enum ProductType {
  SolarPanel = 100,
  IndustrialDoor,
}
enum SolarPanelType {
  FibberGlass = 100,
  Metal,
}
enum PositionType {
  Owner = 100,
  Finacer = 200,
  Other = 300,
}
enum EmailType {
  Personal = 100,
  Business,
}
enum NotificationType {
  Resistration = 100,
  ChangePassword,
  ForgotPassword,
  Error,
}
enum ForgotPasswordType {
  Email = 100,
  Phone,
}
enum ChangePasswordType {
  Email = 100,
  Phone,
}
enum ContactType {
  Personal = 100,
  Business = 200,
}
enum AccountType {
  Personal = 100,
  Business = 200,
}

enum PackagingType {
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

enum IndustrialDoorType {
  Sectional = 100,
  OverHead,
  Fire,
  RollerShutter,
  RapidRoll,
  SteelDoorSets,
  Folding,
  SecurityGrilles,
  Sliding,
  Aluminium,
  Commercial,
  InsulatedRoller,
  Wooden,
  Gates,
  Pedestrian,
  PVCCurtain,
  RollerGrilles,
  Garage,
  Security,
  Crash,
  Coiling,
  FireShutters,
  InsectBarrier,
}
enum SolarProduct {
  AirConditioning,
  Balloon,
  Charger,
  Chimney,
  PoweredWasteCompactingBin,
  Cooker,
  Dryer,
  PoweredFan,
  Furnace,
  Inverter,
  KeyBoard,
  Lamp,
  Pond,
  RoadStud,
}
/**
 * Represents different user roles in the application.
 * @enum {number}
 */
enum Role {
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
  Engineering
}

enum PaymentType {
  CC = 100,
  CHECKING,
  INVOICE,
}

enum Phonetype {
  Mobile = 100,
  Home = 200,
  Office = 300,
}

enum OrderStatus {
  Placed = 100,
  PendingToApprove = 200,
  Approved = 300,
  InProcess = 400,
  Rejected = 500,
  Completed,
  Canceled,
  Delivered,
}
enum AddressType {
  Billing = 100,
  Shipping = 200,
}
enum PaymentStatus {
  Paid = 100,
  Unpaid,
}
enum CardType {
  Visa = 100,
  MasterCard,
  AmericanExpress,
  Discover,
  JCB,
}
enum PaymentMethod {
  CreditCard = 100,
  Check,
  Cash,
}
enum PaymentGateway {
  Paypal = 100,
  Stripe,
}
enum PaymentGatewayStatus {
  Active = 100,
  Inactive,
}

enum SourceTypeNotification {
  MAIL = 100,
  SMS,
}
enum CurrencyType {
  USD = 100,
  GBP,
  EUR,
  JPY,
  CNY,
}

export {
  EmailType,
  ProductType,
  SolarPanelType,
  Role,
  PaymentType,
  Phonetype,
  OrderStatus,
  NotificationType,
  AddressType,
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
  PaymentGatewayStatus,
  SourceTypeNotification,
  CurrencyType,
  ForgotPasswordType,
  ChangePasswordType,
  ContactType,
  CardType,
  PackagingType,
  PositionType,
  AccountType,
};
