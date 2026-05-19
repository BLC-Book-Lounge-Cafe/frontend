# ReservationRequestRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createReservationRequest**](#createreservationrequest) | **POST** /reservation-requests | |
|[**getReservationRequests**](#getreservationrequests) | **GET** /reservation-requests | |
|[**updateReservationRequest**](#updatereservationrequest) | **PUT** /reservation-requests/{id} | |

# **createReservationRequest**
> createReservationRequest(createReservationRequestCommand)

Создаёт новую заявку на быстрое бронирование. Заявка создаётся в статусе pending и требует подтверждения администратором.

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
|**201** | Created |  -  |
|**400** | В случае, если телефон указан в неверном формате. |  -  |
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае нарушения доменных инвариантов в запросе. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReservationRequests**
> GetReservationRequestsResponse getReservationRequests()

Возвращает список заявок на быстрое бронирование (имя + телефон) с пагинацией. Поддерживает фильтрацию по статусу.

### Example

```typescript
import {
    ReservationRequestRouteGroupApi,
    Configuration,
    GetReservationRequestsPageNumberParameter,
    GetReservationRequestsPageNumberParameter
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationRequestRouteGroupApi(configuration);

let status: string; //Фильтр по статусу заявки. (optional) (default to undefined)
let createdDate: string; //Фильтр по дате создания заявки (YYYY-MM-DD) — возвращает заявки, созданные в указанный день. (optional) (default to undefined)
let pageNumber: GetReservationRequestsPageNumberParameter; //Номер страницы. (optional) (default to undefined)
let pageSize: GetReservationRequestsPageNumberParameter; //Количество записей на странице. (optional) (default to undefined)

const { status, data } = await apiInstance.getReservationRequests(
    status,
    createdDate,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**string**] | Фильтр по статусу заявки. | (optional) defaults to undefined|
| **createdDate** | [**string**] | Фильтр по дате создания заявки (YYYY-MM-DD) — возвращает заявки, созданные в указанный день. | (optional) defaults to undefined|
| **pageNumber** | [**GetReservationRequestsPageNumberParameter**] | Номер страницы. | (optional) defaults to undefined|
| **pageSize** | [**GetReservationRequestsPageNumberParameter**] | Количество записей на странице. | (optional) defaults to undefined|


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
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**400** | В случае, если дата создания указана в неверном формате. |  -  |
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае нарушения доменных инвариантов в запросе. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateReservationRequest**
> ReservationRequestDto updateReservationRequest(updateReservationRequestCommand)

Переводит заявку из статуса pending в confirmed или cancelled.

### Example

```typescript
import {
    ReservationRequestRouteGroupApi,
    Configuration,
    UpdateReservationRequestCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new ReservationRequestRouteGroupApi(configuration);

let id: number; //Идентификатор заявки на бронирование. (default to undefined)
let updateReservationRequestCommand: UpdateReservationRequestCommand; //

const { status, data } = await apiInstance.updateReservationRequest(
    id,
    updateReservationRequestCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateReservationRequestCommand** | **UpdateReservationRequestCommand**|  | |
| **id** | [**number**] | Идентификатор заявки на бронирование. | defaults to undefined|


### Return type

**ReservationRequestDto**

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
|**404** | В случае, если заявка на быстрое бронирование не найдена. |  -  |
|**409** | В случае, если статус заявки уже изменен и недоступен для редактирования. |  -  |
|**422** | В случае нарушения доменных инвариантов в запросе. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

