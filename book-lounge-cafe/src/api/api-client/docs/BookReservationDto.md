# BookReservationDto

Данные для бронирования книги.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bookId** | [**BookReservationDtoBookId**](BookReservationDtoBookId.md) |  | [optional] [default to undefined]
**date** | **string** | Дата бронирования. | [optional] [default to undefined]
**customerName** | **string** | Имя клиента. | [optional] [default to undefined]
**customerPhone** | **string** | Телефон клиента. | [optional] [default to undefined]

## Example

```typescript
import { BookReservationDto } from './api';

const instance: BookReservationDto = {
    bookId,
    date,
    customerName,
    customerPhone,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
