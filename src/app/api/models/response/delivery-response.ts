export class DeliveryResponse {
    _id: string;
    orderCode: string;
    deliveryDate: string;
    fullAddress: string;
    customerCode: string;
    customerName: string;
    outletTemperature: string;
    deliveryTemperature: string;
    deliveredIn: string;
    deliveredUser: {
        _id: string;
        name: string;
    };
    status: 'canceled' | 'pending' | 'motoboy' | 'delivered';
    createAt: string;
    updateAt: string;
}