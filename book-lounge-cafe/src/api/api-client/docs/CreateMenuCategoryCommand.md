# CreateMenuCategoryCommand

Команда создания категории меню.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Название категории меню. | [optional] [default to undefined]
**menuItems** | [**Array&lt;MenuItemForCreateDto&gt;**](MenuItemForCreateDto.md) | Элементы категории меню. | [optional] [default to undefined]

## Example

```typescript
import { CreateMenuCategoryCommand } from './api';

const instance: CreateMenuCategoryCommand = {
    name,
    menuItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
