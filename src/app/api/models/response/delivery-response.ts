export class DeliveryResponse {
    _id: string;
    orderCode: string;
    deliveryDate: string;
    fullAddress: string;
    customerCode: string;
    customerName: string;
    minTemperature: string;
    maxTemperature: string;
    minHumidity: string;
    maxHumidity: string;
    deliveredIn: string;
    deliveredUser: {
        _id: string;
        name: string;
    };
    createAt: string;
    updateAt: string;
}