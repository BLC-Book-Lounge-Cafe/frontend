# ReservationRequestDto

Данные запроса на бронирование стола.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**ReservationRequestDtoId**](ReservationRequestDtoId.md) |  | [optional] [default to undefined]
**customerName** | **string** | Имя клиента. | [optional] [default to undefined]
**customerPhone** | **string** | Номер телефона клиента. | [optional] [default to undefined]

## Example

```typescript
import { ReservationRequestDto } from './api';

const instance: ReservationRequestDto = {
    id,
    customerName,
    customerPhone,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
