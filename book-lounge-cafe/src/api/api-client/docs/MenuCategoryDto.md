# MenuCategoryDto

Категория меню.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**MenuCategoryDtoId**](MenuCategoryDtoId.md) |  | [optional] [default to undefined]
**name** | **string** | Название. | [default to undefined]
**menuItems** | [**Array&lt;MenuItemDto&gt;**](MenuItemDto.md) | Элементы категории. | [optional] [default to undefined]

## Example

```typescript
import { MenuCategoryDto } from './api';

const instance: MenuCategoryDto = {
    id,
    name,
    menuItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
