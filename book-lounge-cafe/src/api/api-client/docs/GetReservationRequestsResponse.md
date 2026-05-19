# GetReservationRequestsResponse

Ответ на запрос запросов на бронирование столов.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reservationRequests** | [**Array&lt;ReservationRequestDto&gt;**](ReservationRequestDto.md) | Коллекция запросов на бронирование столов. | [optional] [default to undefined]
**pageNumber** | [**GetReservationRequestsResponsePageNumber**](GetReservationRequestsResponsePageNumber.md) |  | [optional] [default to undefined]
**pageSize** | [**GetReservationRequestsResponsePageSize**](GetReservationRequestsResponsePageSize.md) |  | [optional] [default to undefined]
**totalEntries** | [**GetReservationRequestsResponseTotalEntries**](GetReservationRequestsResponseTotalEntries.md) |  | [optional] [default to undefined]
**totalPages** | [**GetReservationRequestsResponseTotalPages**](GetReservationRequestsResponseTotalPages.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetReservationRequestsResponse } from './api';

const instance: GetReservationRequestsResponse = {
    reservationRequests,
    pageNumber,
    pageSize,
    totalEntries,
    totalPages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
