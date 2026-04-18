# ReservationSlotDto

Данные слота для резервирования.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**startTime** | **string** | Время начала. | [optional] [default to undefined]
**endTime** | **string** | Время конца. | [optional] [default to undefined]
**isReserved** | **boolean** | true - слот зарезервирован, иначе - false. | [optional] [default to undefined]

## Example

```typescript
import { ReservationSlotDto } from './api';

const instance: ReservationSlotDto = {
    startTime,
    endTime,
    isReserved,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
