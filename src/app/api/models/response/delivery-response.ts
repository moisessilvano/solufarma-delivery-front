export class DeliveryResponse {
    _id: string;
    orderCode: string;
    requestCode: string;
    deliveryDate: string;
    fullAddress: string;
    customerCode: string;
    customerName: string;

    departureDate: string;
    departureTime: string;
    departureTemperature: string;

    arrivalDate: string;
    arrivalTime: string;
    arrivalTemperature: string;

    status: 'canceled' | 'pending' | 'motoboy' | 'delivered';
    createAt: string;
    updateAt: string;
}