# BookReservationRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createBookReservation**](#createbookreservation) | **POST** /book-reservations | |
|[**deleteBookReservation**](#deletebookreservation) | **DELETE** /book-reservations/{id} | |
|[**getBookReservations**](#getbookreservations) | **GET** /book-reservations | |

# **createBookReservation**
> createBookReservation(createBookReservationCommand)

Бронирует книгу.

### Example

```typescript
import {
    BookReservationRouteGroupApi,
    Configuration,
    CreateBookReservationCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new BookReservationRouteGroupApi(configuration);

let createBookReservationCommand: CreateBookReservationCommand; //

const { status, data } = await apiInstance.createBookReservation(
    createBookReservationCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createBookReservationCommand** | **CreateBookReservationCommand**|  | |


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
|**400** | В случае некорректно составленного запроса. |  -  |
|**404** | В случае, если не найдена книга по указанному идентификатору. |  -  |
|**409** | В случае, если книга уже была забронирована на указанную дату. |  -  |
|**422** | В случае, если данные для бронирования указаны неверно. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteBookReservation**
> deleteBookReservation()

Удаляет бронирование книги по его ID.

### Example

```typescript
import {
    BookReservationRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BookReservationRouteGroupApi(configuration);

let id: number; //ID бронирования книги. (default to undefined)

const { status, data } = await apiInstance.deleteBookReservation(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID бронирования книги. | defaults to undefined|


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
|**404** | В случае, если бронь книги не найдена. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBookReservations**
> GetBookReservationsResponse getBookReservations()

Возвращает список бронирований книг с пагинацией.

### Example

```typescript
import {
    BookReservationRouteGroupApi,
    Configuration,
    GetTableReservationsTableIdParameter,
    GetReservationRequestsPageNumberParameter,
    GetReservationRequestsPageNumberParameter
} from './api';

const configuration = new Configuration();
const apiInstance = new BookReservationRouteGroupApi(configuration);

let bookId: GetTableReservationsTableIdParameter; //Фильтр по ID книги. (optional) (default to undefined)
let date: string; //Фильтр по дате бронирования. (optional) (default to undefined)
let pageNumber: GetReservationRequestsPageNumberParameter; //Номер страницы. (optional) (default to undefined)
let pageSize: GetReservationRequestsPageNumberParameter; //Количество записей на странице. (optional) (default to undefined)

const { status, data } = await apiInstance.getBookReservations(
    bookId,
    date,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bookId** | [**GetTableReservationsTableIdParameter**] | Фильтр по ID книги. | (optional) defaults to undefined|
| **date** | [**string**] | Фильтр по дате бронирования. | (optional) defaults to undefined|
| **pageNumber** | [**GetReservationRequestsPageNumberParameter**] | Номер страницы. | (optional) defaults to undefined|
| **pageSize** | [**GetReservationRequestsPageNumberParameter**] | Количество записей на странице. | (optional) defaults to undefined|


### Return type

**GetBookReservationsResponse**

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
|**400** | В случае, если дата или номер телефона не соответствуют формату. |  -  |
|**404** | В случае, если не найдена книга по указанному идентификатору. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

