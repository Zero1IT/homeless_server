# Pethome api

To start the server you must create a `w_configure.json` file
and place it in the root of the project, where contains an `app.js` file.

**w_configure.json file format:**
```json
{
  "db_name": "YOUR_LOCAL_DATABASE_NAME",
  "db_password": "YOUR_DATABASE_SERVER_PASSWORD",
  "db_login": "YOUR_DATABASE_SERVER_LOGIN",
  "private_key": "ANY_KEY_FOR_HASH_JWT_TOKEN",
  "jws_alg": "HASH_ALGORITHM",
  "hash_salt": "SMALL_NUMBER_LESS_THAN_10",
  "email": "EMAIL_ADDRESS_FOR_SEND_VERIFY_MESSAGES",
  "email_password": "EMAIL_PASSWORD"
}
```
>jws_alg can be HS512 or another

>hash_salt is better set to 7

## API urls
Below are shown methods and API main urls, in sub-lists shown path of url after main url. 

### User api `/api/users`:
* **GET**
    * `/` - get all users.
    * `/(id)` or `?id=` - get user by id.
* **POST**
    * `/` - create user for developer. JSON body: 
        ```json
      {
        "password": "",
        "name": "",
        "phoneNumber": "",
        "email": ""
      } 
        ``` 
* **PUT** 
    * `/(id)` or `?id=` - update user by id. JSON body - fields for update
* **DELETE** 
    * `/(id)` or `?id=` - delete user by id, developer access.
    
### Advert api `/api/adverts`:
* **GET**
    * `/` - get 20 last added adverts (don't use)
    * `/(id)` or `?id=` - get advert by id
    * `/my` - get advert published by authenticated user
    * `/new/(limit)` - get not watched adverts, limit - default 20
    * `/users/(id)` or `/users?id=` - get users whose liked adverts with id=id
* **POST**
    * `/` - create advert. JSON body:
        ```json
        {
          "title": "",
          "animalType": "",
          "images": "url1;url2;... !NOT REQUIRED!",
          "text": "DESCRIBE !NOT REQUIRED!"
        }
        ```
* **PUT**
    * `/(id)` or `?id=` - update advert by id. JSON body - fields for update
* **DELETE**
    * `/(id)` or `?id=` - delete advert by id