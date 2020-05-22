import { UserResponse } from './user-response';

export class DeliveryResponse {
    _id: string;
    orderCode: string;
    requestCode: string;
    deliveryDate: string;
    fullAddress: string;
    customerCode: string;
    customerName: string;

    departureDateTime: string;
    departureTemperature: string;

    arrivalDateTime: string;
    arrivalTemperature: string;

    deliveredUser: UserResponse;

    status: 'canceled' | 'pending' | 'motoboy' | 'delivered';
    createAt: string;
    updateAt: string;

    receivedBy: string;

    amountReceivable: number;
    paymentMethod: 'money' | 'card';
}