# GetBookReservationsResponse

Ответ на запрос получения броней книг

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**bookReservations** | [**Array&lt;BookReservationDto&gt;**](BookReservationDto.md) | Брони книг. | [optional] [default to undefined]
**pageNumber** | [**GetBookReservationsResponsePageNumber**](GetBookReservationsResponsePageNumber.md) |  | [optional] [default to undefined]
**pageSize** | [**GetBookReservationsResponsePageSize**](GetBookReservationsResponsePageSize.md) |  | [optional] [default to undefined]
**totalEntries** | [**GetBookReservationsResponseTotalEntries**](GetBookReservationsResponseTotalEntries.md) |  | [optional] [default to undefined]
**totalPages** | [**GetBookReservationsResponseTotalPages**](GetBookReservationsResponseTotalPages.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetBookReservationsResponse } from './api';

const instance: GetBookReservationsResponse = {
    bookReservations,
    pageNumber,
    pageSize,
    totalEntries,
    totalPages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
