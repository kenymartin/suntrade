import { AccountType,OrderStatus,CardType, CardStatus,AddressType,Phonetype} from "../utils/enums";

export type Contact = {
  readonly id?: number;
  firstname: string;
  lastname: string;
  stateId?: string;
  accountTypeId?: AccountType;
  user: {
    id?: string;
    email: string;
    username: string;
    password: string;
    contactId?:number
    roleByUser: [{ roleId: number }];
    order?: {
      id?: string;
      orderDate: Date;
      orderStatus: OrderStatus;
      contactId?:number
      orderDetails: [{ productId: number; quantity: number,orderId:number }];

    };
    cards?: [
      {
        id?: string;
        cardNumber: string;
        cardType: CardType;
        cardStatus: CardStatus;
        cardLimit: number;
        cardExpDate: Date;
        cardCVV: string;
        cardBalance: number;
        cardPin: string;
        contactId:number;
      }
    ];
  };
  address?: [{
    id?: number;
    street: string;
    city: string;
    state: string;
    isPrimary?:boolean
    zipcode: string;
    country: string;
    addressTypeId:AddressType;
    contactId:number;
  }];
  phone?: [{
    phone: string;
    phoneTypeId: Phonetype;
    contactId:number;
    isPrimary?:boolean
  }];
  company?: [{
    companyName: string;
    website: string;
    contactId:number;
  }];
};
