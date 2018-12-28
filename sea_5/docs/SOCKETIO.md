# Funbid socketio

- namespace
```
/bid
```

- Server emit every 10s to close or pronounce start auction
```
socketio.emit('close', item.serialize, namespace='/bid')
socketio.emit('start', item.serialize, namespace='/bid')
```



- on('connect'):
```
emit('accept', {'data': 'Connected'})
```

- on('joined'):
```
response = [item1, item2, ...]
emit('auction', reponse)
```

- on('bid'):
  - Client:
  ```
  {'token': 'asdasdasdsadzxc', 'item_id': 1}
  ```


  - Server:
    - Fail:
    ```
    emit('bid_fail', {'message': 'time expired'})
    ```

    - Success:
    ```
    emit('bid_success', item.serialize)
    emit('bid_success', user.serialize)
    ```