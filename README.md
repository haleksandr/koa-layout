#### Powered by koa. Use elephantsql. Deploy on heroku.

https://koa-layout.herokuapp.com/home - list all components

```sh
router.post('create-user', controllers.createUser); --- fname, lname
router.get('get-user/:userId', controllers.getUser);
router.put('update-user/:userId', controllers.updateUser);
router.delete('delete-user/:userId', controllers.deleteUser);
```
