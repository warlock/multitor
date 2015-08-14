# multitor
Node make Multiple Tor instances

----
## How to use:

```javascript
var multitor = require('multitor');

multitor.start(5, function (error, instance, socks_port, control_port) {
        if (error)  {
                console.log(error);
        } else {
                console.log("Instance " + instance + " > Socks port: " + socks_port + "; Control port: " + control_port);
        }
});

```

----
## How to install:
```
npm install multitor
```

----

## Next ideas:
Make a easy control port refresh.
