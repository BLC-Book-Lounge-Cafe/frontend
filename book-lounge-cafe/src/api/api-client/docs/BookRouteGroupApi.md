# BookRouteGroupApi

All URIs are relative to *http://0.0.0.0:5251*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createBook**](#createbook) | **POST** /books | |
|[**deleteBook**](#deletebook) | **DELETE** /books/{id} | |
|[**updateBook**](#updatebook) | **PUT** /books/{id} | |

# **createBook**
> BookDto createBook(createBookCommand)

Создает книгу.

### Example

```typescript
import {
    BookRouteGroupApi,
    Configuration,
    CreateBookCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new BookRouteGroupApi(configuration);

let createBookCommand: CreateBookCommand; //

const { status, data } = await apiInstance.createBook(
    createBookCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createBookCommand** | **CreateBookCommand**|  | |


### Return type

**BookDto**

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
|**404** | В случае, если запрашиваемая сущность не найдена. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае если имя, автор или адрес картинки пустые. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteBook**
> deleteBook()

Удаляет книгу.

### Example

```typescript
import {
    BookRouteGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BookRouteGroupApi(configuration);

let id: number; //Идентификатор книги. (default to undefined)

const { status, data } = await apiInstance.deleteBook(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Идентификатор книги. | defaults to undefined|


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
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**400** | В случае некорректно составленного запроса. |  -  |
|**404** | В случае, если не удалось найти книгу. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае нарушения доменных инвариантов в запросе. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBook**
> updateBook(updateBookCommand)

Обновляет книгу.

### Example

```typescript
import {
    BookRouteGroupApi,
    Configuration,
    UpdateBookCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new BookRouteGroupApi(configuration);

let id: number; //Идентификатор книги. (default to undefined)
let updateBookCommand: UpdateBookCommand; //

const { status, data } = await apiInstance.updateBook(
    id,
    updateBookCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateBookCommand** | **UpdateBookCommand**|  | |
| **id** | [**number**] | Идентификатор книги. | defaults to undefined|


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
|**404** | В случае, если не удалось найти книгу. |  -  |
|**409** | В случае конфликта данных с текущем состоянием сервера. |  -  |
|**422** | В случае если имя, автор или адрес картинки пустые. |  -  |
|**500** | В случае внутренней ошибки сервера. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

