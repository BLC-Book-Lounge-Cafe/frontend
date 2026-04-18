# BookReservationRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createBookReservation**](#createbookreservation) | **POST** /book-reservations | |

# **createBookReservation**
> createBookReservation(bookReservationDto)

Бронирует книгу.

### Example

```typescript
import {
    BookReservationRouteGroupApi,
    Configuration,
    BookReservationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BookReservationRouteGroupApi(configuration);

let bookReservationDto: BookReservationDto; //

const { status, data } = await apiInstance.createBookReservation(
    bookReservationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bookReservationDto** | **BookReservationDto**|  | |


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
|**404** | В случае, если не найдена книга по указанному идентификатору. |  -  |
|**409** | В случае, если данные для бронирования указаны неверно или книга уже была забронирована на указанную дату. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

