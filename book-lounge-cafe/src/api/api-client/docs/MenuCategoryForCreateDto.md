# MenuCategoryForCreateDto

Данные категории меню при создании и обновлении.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Название категории меню. | [optional] [default to undefined]
**menuItems** | [**Array&lt;MenuItemForCreateDto&gt;**](MenuItemForCreateDto.md) | Элементы категории меню. | [optional] [default to undefined]

## Example

```typescript
import { MenuCategoryForCreateDto } from './api';

const instance: MenuCategoryForCreateDto = {
    name,
    menuItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
