# CreateTableReservationCommand

Команда создания бронирования стола.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tableId** | [**CreateTableReservationCommandTableId**](CreateTableReservationCommandTableId.md) |  | [optional] [default to undefined]
**customerName** | **string** | Имя клиента. | [optional] [default to undefined]
**customerPhone** | **string** | Номер телефона клиента. | [optional] [default to undefined]
**startTime** | **string** | Время начала. | [optional] [default to undefined]
**endTime** | **string** | Время конца. | [optional] [default to undefined]

## Example

```typescript
import { CreateTableReservationCommand } from './api';

const instance: CreateTableReservationCommand = {
    tableId,
    customerName,
    customerPhone,
    startTime,
    endTime,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
