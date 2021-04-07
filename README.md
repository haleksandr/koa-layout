### Powered by koa. Use elephantsql. Deploy on heroku.

https://koa-layout.herokuapp.com/home - list of all components

DB "user" has three columns:
 - first column includes incrementing id
 - second column includes fname(firstName), it is not null and default value is "name"
 - third column includes lname(lastName), and it is not null

```sh
'/create-user' - this route creates a user

'/get-user/:userId' - this route get one user(/:userId - user id can be found when creating via postman) 

'/update-user/:userId' - this route changes fname(firstName) and lname(lastName). (/:userId(number) - user id can be found when creating via postman)

'/delete-user/:userId', controllers.deleteUser); - this route deletes user(/:userId - user id, can be found when creating via postman)
```
