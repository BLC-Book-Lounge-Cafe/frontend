# UpdateSpaceStateCommand

Команда на обновление уровня шума и описания пространства.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**noiseLevel** | [**UpdateSpaceStateCommandNoiseLevel**](UpdateSpaceStateCommandNoiseLevel.md) |  | [optional] [default to undefined]
**description** | **string** | Описание. | [optional] [default to undefined]

## Example

```typescript
import { UpdateSpaceStateCommand } from './api';

const instance: UpdateSpaceStateCommand = {
    noiseLevel,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
