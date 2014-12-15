Anthem is a minimal framework for creating REST APIs.

```js
import Anthem from 'anthem';
let api = new Anthem();
```

## Resources and collections

A *resource* or *resource object* is a representation of application data. Multiple resources of the same type have the same internal structure. When it is sent to the consumer, it is represented as an object.

A *collection* or *resource collection* is a group of resource objects with the same type. When it is sent to the consumer, it is represented as an array.

RESTful APIs are typically organized by collection. The goal of Anthem is to provide a thin framework for defining common operations on collections.

To create a new collection, extend from the base Collection class.

```js
import { Collection } from Anthem;

class Post extends Collection {

  ...

}

let posts = new Post();
export default posts;
```

To use a collection, register it with `api.addCollection()`.
