import * as enums from "@shared/utils/enums";

export type Contact = {
  firstName: string;
  lastName: string;
  stateId?: string;
  accountTypeId?: enums.AccountType;
  user: {
    email: string;
    username: string;
    password: string;
    roles: [{ roleId: number }];
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    addressTypeId: enums.AddressType;
  };
  phone?: {
    phone: string;
    phoneTypeId: enums.Phonetype;
  };
  company?: {
    companyName: string;
    website: string;
  }
};
