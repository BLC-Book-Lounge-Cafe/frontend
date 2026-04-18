# TableReservationRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createTableReservation**](#createtablereservation) | **POST** /table-reservations | |
|[**getTableReservationSlots**](#gettablereservationslots) | **POST** /table-reservations/slots | |

# **createTableReservation**
> createTableReservation(tableReservationDto)

Бронирует стол.

### Example

```typescript
import {
    TableReservationRouteGroupApi,
    Configuration,
    TableReservationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TableReservationRouteGroupApi(configuration);

let tableReservationDto: TableReservationDto; //

const { status, data } = await apiInstance.createTableReservation(
    tableReservationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tableReservationDto** | **TableReservationDto**|  | |


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
|**404** | В случае, если не найден стол по указанному идентификатору. |  -  |
|**409** | В случае, если данные для бронирования указаны неверно или стол уже был забронирован на указанное время. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTableReservationSlots**
> GetTableReservationSlotsResponse getTableReservationSlots(getTableReservationSlotsRequest)

Возвращает слоты для бронирования стола.

### Example

```typescript
import {
    TableReservationRouteGroupApi,
    Configuration,
    GetTableReservationSlotsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TableReservationRouteGroupApi(configuration);

let getTableReservationSlotsRequest: GetTableReservationSlotsRequest; //

const { status, data } = await apiInstance.getTableReservationSlots(
    getTableReservationSlotsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **getTableReservationSlotsRequest** | **GetTableReservationSlotsRequest**|  | |


### Return type

**GetTableReservationSlotsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | В случае, если не найден стол по указанному идентификатору. |  -  |
|**409** | В случае нарушения доменных правил. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

