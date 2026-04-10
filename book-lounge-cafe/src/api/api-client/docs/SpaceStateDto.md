# SpaceStateDto

Данные о состоянии пространства.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**noiseLevel** | [**SpaceStateDtoNoiseLevel**](SpaceStateDtoNoiseLevel.md) |  | [optional] [default to undefined]
**workloadLevel** | [**SpaceStateDtoWorkloadLevel**](SpaceStateDtoWorkloadLevel.md) |  | [optional] [default to undefined]
**description** | **string** | Описание от администратора. | [default to undefined]
**currentTrack** | [**CurrentTrackDto**](CurrentTrackDto.md) | Текущий трек. | [optional] [default to undefined]

## Example

```typescript
import { SpaceStateDto } from './api';

const instance: SpaceStateDto = {
    noiseLevel,
    workloadLevel,
    description,
    currentTrack,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
