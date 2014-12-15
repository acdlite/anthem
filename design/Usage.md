## Terminology

A *resource* or *resource object* is an object representation of application data. Multiple resources of the same type have the same internal structure.

A *collection* or *resource collection* is a group of resource objects with the same type, represented as an array.

RESTful APIs are typically organized by collection. The goal of Anthem is to provide a thin framework for defining common operations on collections.

To create a new collection, extend from the base Collection class.

```js
import { Resource } from Anthem;

class Post extends Collection {

  ...

}

let posts = new Post();
export default posts;
```
