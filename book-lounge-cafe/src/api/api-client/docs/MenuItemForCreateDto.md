# MenuItemForCreateDto

Данные об элементе категории меню при создании или обновлении категории.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Название элемента. | [optional] [default to undefined]
**price** | [**MenuItemForCreateDtoPrice**](MenuItemForCreateDtoPrice.md) |  | [optional] [default to undefined]

## Example

```typescript
import { MenuItemForCreateDto } from './api';

const instance: MenuItemForCreateDto = {
    name,
    price,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
