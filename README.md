## Hooks

### pre-commit
```sh
#!/bin/sh
exec npm run lint
```

### pre-push
```sh
#!/bin/sh
exec npm run test
```
