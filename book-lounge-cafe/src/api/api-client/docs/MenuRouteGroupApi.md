# MenuRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createMenuCategory**](#createmenucategory) | **POST** /menu/category | |
|[**deleteMenuCategory**](#deletemenucategory) | **DELETE** /menu/category/{id} | |
|[**getMenu**](#getmenu) | **GET** /menu | |
|[**updateMenuCategory**](#updatemenucategory) | **PUT** /menu/category/{id} | |

# **createMenuCategory**
> MenuCategoryDto createMenuCategory(createMenuCategoryCommand)

Создает категорию меню с элементами.

### Example

```typescript
import {
    MenuRouteGroupApi,
    Configuration,
    CreateMenuCategoryCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new MenuRouteGroupApi(configuration);

let createMenuCategoryCommand: CreateMenuCategoryCommand; //

const { status, data } = await apiInstance.createMenuCategory(
    createMenuCategoryCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createMenuCategoryCommand** | **CreateMenuCategoryCommand**|  | |


### Return type

**MenuCategoryDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**401** | Unauthorized |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |
|**422** | В случае, если название категории меню или элемента категории меню пустое или длина превышает 255 символов, либо цена элемента категории меню ниже 0. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteMenuCategory**
> deleteMenuCategory()

Удаляет категорию меню.

### Example

```typescript
import {
    MenuRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MenuRouteGroupApi(configuration);

let id: number; //Идентификатор категории меню. (default to undefined)

const { status, data } = await apiInstance.deleteMenuCategory(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Идентификатор категории меню. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**401** | Unauthorized |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |
|**404** | В случае, если не удалось найти категорию меню. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMenu**
> GetMenuResponse getMenu()

Возвращает информацию о меню.

### Example

```typescript
import {
    MenuRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MenuRouteGroupApi(configuration);

const { status, data } = await apiInstance.getMenu();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetMenuResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateMenuCategory**
> MenuCategoryDto updateMenuCategory(updateMenuCategoryCommand)

Обновляет категорию меню с элементами.

### Example

```typescript
import {
    MenuRouteGroupApi,
    Configuration,
    UpdateMenuCategoryCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new MenuRouteGroupApi(configuration);

let id: number; //Идентификатор категории меню. (default to undefined)
let updateMenuCategoryCommand: UpdateMenuCategoryCommand; //

const { status, data } = await apiInstance.updateMenuCategory(
    id,
    updateMenuCategoryCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateMenuCategoryCommand** | **UpdateMenuCategoryCommand**|  | |
| **id** | [**number**] | Идентификатор категории меню. | defaults to undefined|


### Return type

**MenuCategoryDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |
|**404** | В случае, если категория меню не найдена. |  -  |
|**422** | В случае, если название категории меню или элемента категории меню пустое или длина превышает 255 символов, либо цена элемента категории меню ниже 0. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

