# UpdateMenuCategoryCommand

Команда обновления категории меню.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Название категории. | [optional] [default to undefined]
**menuItems** | [**Array&lt;MenuItemDto&gt;**](MenuItemDto.md) | Элементы категории. | [optional] [default to undefined]

## Example

```typescript
import { UpdateMenuCategoryCommand } from './api';

const instance: UpdateMenuCategoryCommand = {
    name,
    menuItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
