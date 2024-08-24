import { DeliveryTime, DeliveryType, Status } from "@prisma/client";

export const deliveryTypeLabels = {
    [DeliveryType.inPerson]: 'تحویل حضوری',
    [DeliveryType.Posting]: 'ارسال',
  };
  
    export const statusLabels = {
      [Status.inProgress]: 'جاری',
      [Status.canceled]: 'لغو شده',
      [Status.pendingConfirmation]: 'در انتظار تایید',
      [Status.pendingPayment]: 'در انتظار پرداخت',
      [Status.delivered]: 'ارسال شده',
    };
    
  export const deliveryTimeLabels = {
    [DeliveryTime.NIGHT]: 'شب',
    [DeliveryTime.AFTERNON]: 'بعد از ظهر',
  };