## \*\*WORK IN PROGRESS\*\*

[![build status](https://img.shields.io/travis/acdlite/anthem.svg?style=flat-square)](https://travis-ci.org/acdlite/anthem)
[![code climate](https://img.shields.io/codeclimate/github/acdlite/anthem.svg?style=flat-square)](https://codeclimate.com/github/acdlite/anthem)


Anthem
======


Anthem is a minimal REST framework.

The goal is to reduce the boilerplate involved in creating RESTful APIs, by making lightweight abstractions around REST operations. JavaScript doesn't have protocols, but that's a good way to think about Anthem.

Anthem is meant to be extended using class-based inheritance, as provided by ES6 class syntax (or an equivalent system).

## Terminology

A *resource* or *resource object* is a singular representation of data. Multiple resources of the same type have the same internal structure. When it is sent to the consumer, it is represented as an object.

A *collection* or *resource collection* is the set of all resource objects having the same type. Usually, the consumer is sent only a subset of resources in a collection (via a paging mechanism); the subset is represented as an array.

RESTful APIs are typically organized by collection. It's generally considered best practice to use the plural form to refer to collections (e.g. `GET /users/:id` instead of `GET /user/:id`).

## APIs

The main Anthem class should be thought of as an API class — instances of the class are interfaces to an application's resources.

```js
import Anthem from 'anthem';

class API extends Anthem {
  ...
}

let api = new API();
```

APIs retrieve your application's resources (via collections, described in the next section) and prepare them for the consumer. The idea is that regardless of the internal implementation of any Anthem class, they provide a consistent interface for retrieving and formatting your application's resources.

## Collections

While APIs are primarily concerned with formatting data for the consumer, Collections are responsible for retrieving your application's resources.

A Collection is any object that implements the Collection interface.

```js
class Posts {

  getById(id, params) {

    ...

    return post;
  }

  getPosts(params) {

    ...

    return posts;
  }
}

let posts = new Posts();
export default posts;
```


To use a collection, register it with `api.addCollection()`.

## Collection interface

A collection may implement one or more of the following methods, which correspond to REST operations.

### `getById(id, [params])`

Corresponds to `GET /resource/:id`

### `get([params])`

Corresponds to `GET /resource`

### `post(resource)`

Corresponds to `POST /resource`

### `put(id, fields)`

Corresponds to `PUT /resource/:id`

### `delete(id)`

Corresponds to `DELETE /resource/:id`
