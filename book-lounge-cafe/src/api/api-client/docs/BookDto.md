# BookDto

Данные о книге.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**BookDtoId**](BookDtoId.md) |  | [optional] [default to undefined]
**name** | **string** | Название. | [default to undefined]
**author** | **string** | Автор. | [default to undefined]
**imageUrl** | **string** | Ссылка на картинку. | [default to undefined]
**isReserved** | **boolean** | Признак резервирования книги. | [optional] [default to undefined]

## Example

```typescript
import { BookDto } from './api';

const instance: BookDto = {
    id,
    name,
    author,
    imageUrl,
    isReserved,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
