# ReservationRequestRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createReservationRequest**](#createreservationrequest) | **POST** /reservation-requests | |
|[**deleteReservationRequest**](#deletereservationrequest) | **DELETE** /reservation-requests/{id} | |
|[**getReservationRequests**](#getreservationrequests) | **GET** /reservation-requests | |

# **createReservationRequest**
> createReservationRequest(createReservationRequestCommand)

Создает запрос на бронирование стола.

### Example

```typescript
import {
    ReservationRequestRouteGroupApi,
    Configuration,
    CreateReservationRequestCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationRequestRouteGroupApi(configuration);

let createReservationRequestCommand: CreateReservationRequestCommand; //

const { status, data } = await apiInstance.createReservationRequest(
    createReservationRequestCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReservationRequestCommand** | **CreateReservationRequestCommand**|  | |


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
|**200** | Запрос на бронирование успешно создан. |  -  |
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | Если номер клиента не соответствует формату или имя клиента слишком длинное. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteReservationRequest**
> deleteReservationRequest()

Удаляет запрос на бронирование стола.

### Example

```typescript
import {
    ReservationRequestRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationRequestRouteGroupApi(configuration);

let id: number; //Идентификатор запроса на бронирование стола. (default to undefined)

const { status, data } = await apiInstance.deleteReservationRequest(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Идентификатор запроса на бронирование стола. | defaults to undefined|


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
|**200** | Запрос на бронирование успешно удален. |  -  |
|**404** | Если запрос на бронирование не найден. |  -  |
|**409** | В случае нарушения доменных правил. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReservationRequests**
> GetReservationRequestsResponse getReservationRequests()

Возвращает запросы на бронирование стола.

### Example

```typescript
import {
    ReservationRequestRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationRequestRouteGroupApi(configuration);

const { status, data } = await apiInstance.getReservationRequests();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetReservationRequestsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Запрос на бронирование успешно удален. |  -  |
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае нарушения доменных правил. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

