# admin

Dashboard admin app.

## Using

- [vue-cli@3.0](https://github.com/vuejs/vue-cli)
- [Element](https://github.com/ElemeFE/element)
- Sass
- vue-router
- vuex

## components

### table-list

This component is used to show a table list items. include loading, search and pagination. accept following props

##### `mode`
the query params whethere show in router address, if show use `page` otherwise use `ajax`.

##### `table`
which table data you want fetch. this will rely on the `/table/:table` api.

##### `fetchAction`
if set this prop, the fetch data action will use this, so the above `table` prop will be ignored. It accept one parameter

```js
fetchAction(params)
```
this params like

```js
{
  limit: 2,
  offset: 0,
  where: {
    name: {
      $like: 'tom'
    }
  }
}
```
- `size` - pageSize, the data count every page shows.
- `count` - total data count, not page count.
- `page` - current page.

and the response must follow this format:

```json
{
  "status": 200,
  "data": {
    "items": [...],
    "count": 100
  }
}
```

##### `pageSize`

The data count every page shows, if not provide, the value will be 15.


