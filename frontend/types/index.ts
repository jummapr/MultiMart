
export interface Image {
    id: string;
    url: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    address: IShippingAddress[];
    avatar: {
        public_id: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface IShop {
    address: string;
    avatar: {
        public_id: string;
        url: string;
    };
    createdAt: string;
    email: string;
    phoneNumber: string;
    role: string;
    shopName: string;
    _id: string;
    zipCode: string;
    description: string;
    updatedAt: string;
}

export interface ICart {
    _id: string;
    name: string;
    originalPrice: string;
    category: string;
    createdAt: string;
    description:  string;
    discountPrice: number;
    images: [
        {
            public_id: string;
            url: string
        }
    ];
    qty: number;
    shop: IShop;
    shopId: string;
    sold_out: number;
    stock: number;
    tags: string;
}

export interface IShippingAddress {
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: string;
}

export interface IPaymentInfo {
    id: string;
    status: string;
    type: string;
}

export interface IOrder  {
    _id?: string;
    cart: ICart[];
    shippingAddress: IShippingAddress;
    user: IUser;
    totalPrice: number;
    status?: string;
    paidAt?: string;
    paymentInfo?: IPaymentInfo;
    createdAt?: string;
    updatedAt?: string;
}