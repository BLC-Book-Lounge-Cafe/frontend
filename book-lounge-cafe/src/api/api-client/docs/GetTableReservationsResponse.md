# GetTableReservationsResponse

Ответ на запрос бронирований столов.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tableReservations** | [**Array&lt;TableReservationDto&gt;**](TableReservationDto.md) | Список бронирований столов. | [optional] [default to undefined]
**pageNumber** | [**GetBookReservationsResponsePageNumber**](GetBookReservationsResponsePageNumber.md) |  | [optional] [default to undefined]
**pageSize** | [**GetTableReservationsResponsePageSize**](GetTableReservationsResponsePageSize.md) |  | [optional] [default to undefined]
**totalEntries** | [**GetBookReservationsResponseTotalEntries**](GetBookReservationsResponseTotalEntries.md) |  | [optional] [default to undefined]
**totalPages** | [**GetBookReservationsResponseTotalPages**](GetBookReservationsResponseTotalPages.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetTableReservationsResponse } from './api';

const instance: GetTableReservationsResponse = {
    tableReservations,
    pageNumber,
    pageSize,
    totalEntries,
    totalPages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
