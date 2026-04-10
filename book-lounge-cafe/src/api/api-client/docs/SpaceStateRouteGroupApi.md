# SpaceStateRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSpaceState**](#getspacestate) | **GET** /space-state | |

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
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае нарушения доменных правил. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

