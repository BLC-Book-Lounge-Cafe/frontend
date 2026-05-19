# SpaceStateRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSpaceState**](#getspacestate) | **GET** /space-state | |
|[**updateSpaceState**](#updatespacestate) | **PATCH** /space-state | |

# **getSpaceState**
> GetSpaceStateResponse getSpaceState()

Возвращает текущее состояние пространства.

### Example

```typescript
import {
    SpaceStateRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpaceStateRouteGroupApi(configuration);

const { status, data } = await apiInstance.getSpaceState();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetSpaceStateResponse**

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
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае нарушения доменных инвариантов в запросе. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateSpaceState**
> updateSpaceState(updateSpaceStateCommand)

Обновляет уровень шума и описание текущего состояния пространства.

### Example

```typescript
import {
    SpaceStateRouteGroupApi,
    Configuration,
    UpdateSpaceStateCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new SpaceStateRouteGroupApi(configuration);

let updateSpaceStateCommand: UpdateSpaceStateCommand; //

const { status, data } = await apiInstance.updateSpaceState(
    updateSpaceStateCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSpaceStateCommand** | **UpdateSpaceStateCommand**|  | |


### Return type

void (empty response body)

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
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае, если уровень шума находится вне диапазона от 0 до 5, либо описание пустое. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

