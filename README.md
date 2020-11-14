# ecommerce_server

## User Log In
#
* **URL**

 ` /login`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required:**
 
   `email=[string]`
   
   `password=[string]`


* **Data Params**
```javascript
  {
    "email": "admin@mail.com",
    "password": "Bambang123"
  }
```

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
      `{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws" 
        }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Wrong email/password" }`


* **Sample Call:**
 ```javascript
    login(user) {
        axios({
        url: "/login",
        method: "post",
        data: {
            email: user.email,
            password: user.password,
        },
        })
        .then(({ data }) => {
            localStorage.setItem("token", data.token);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }
  ```
#
## GET List Product
#
* **URL**

  `/products`

* **Method:**
  
   `GET` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**
  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
  `[{
        "id": 4,
        "name": "Ikan Cupang",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYXHzoP7dqy0jf4Tf6JRONfguX-i6RiVxpnAm2H_sYRGLqCTgv1F6BCG7HLq9UyDMwA3UIVZ-3&usqp=CAc",
        "price": 500000,
        "stock": 20,
        "UserId": 1,
        "createdAt": "2020-11-14T05:28:09.811Z",
        "updatedAt": "2020-11-14T06:27:24.693Z"
    }]`
 
* **Error Response:**

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{ "error": "Authentication failed }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('listProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  ```

#
## Create Products
#
* **URL**

  `/products`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**

`{  "name": "Aquarium ",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rrmIcVvDerHMIOWcDOwbM7w1wgKr1hPlwUpeuYWTbZy9wB3GsXBQ4BtU2g&usqp=CAc",
    "price": 50000,
    "stock": 15, 
}`

* **Success Response:**
  
  * **Code:** 201 CREATED<br />
    **Content:** 
  `[
    {
        "id": 6,
        "name": "Aquarium ",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rrmIcVvDerHMIOWcDOwbM7w1wgKr1hPlwUpeuYWTbZy9wB3GsXBQ4BtU2g&usqp=CAc",
        "price": 50000,
        "stock": 15,
        "UserId": 1,
        "createdAt": "2020-11-14T05:34:46.262Z",
        "updatedAt": "2020-11-14T07:32:00.062Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error: "Internal Server Error" }`

  * **Code:** 400  <br />
    **Content:** `{ error : "Sequelize validation Error" }`


* **Sample Call:**
 ```javascript
    addProduct (context, payload) {
      const token = localStorage.getItem('token')
      return axios({
        url: '/products',
        method: 'POST',
        headers: { token },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })
    }
  ```

#
## DELETE List Task by ID
#
* **URL**

  `/products/:id`

* **Method:**
  
   `DELETE` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

* **Data Params**

  `id`

* **Success Response:**
  * **Code:** 200 Unauthorized <br />
    **Content:** `{ "msg": "Data Success To Delete" }`
 
* **Error Response:**

 * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    deleteProduct (context, payload) {
      axios({
        url: '/products/' + payload,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          console.log('Data Deleted!')
        })
        .catch(err => {
          console.log(err)
        })
    }
  ```

#
## EDIT Products
#
* **URL**

  `/tasks/:id`

* **Method:**
  
   `PUT` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`


   **Required Headers:**
   
   `{  
       "name": "Ikan Cupang Plakat",
        "image_url": "https://i0.wp.com/oyimedia.com/wp-content/uploads/2020/04/Ikan-Cupang-Plakat.jpg?w=480&ssl=1",
        "price": 2000000,
        "stock": 20,
    }`


* **Data Params**

  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  ` {
        "id": 7,
        "name": "Ikan Cupang Plakat",
        "image_url": "https://i0.wp.com/oyimedia.com/wp-content/uploads/2020/04/Ikan-Cupang-Plakat.jpg?w=480&ssl=1",
        "price": 2000000,
        "stock": 20,
        "UserId": 1,
        "createdAt": "2020-11-14T07:31:26.841Z",
        "updatedAt": "2020-11-14T07:31:43.890Z"
    }
    `
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    editProduct (context, payload) {
      axios({
        url: '/products/' + payload.id,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  ```

  #
## GET List Banner
#
* **URL**

  `/banners`

* **Method:**
  
   `GET` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**
  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 
  `[{
        "id": 6,
        "title": "Beli Aquarium Free Ikan Cupang - Diskon 12.12",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rrmIcVvDerHMIOWcDOwbM7w1wgKr1hPlwUpeuYWTbZy9wB3GsXBQ4BtU2g&usqp=CAc",
        "status": "Inactive",
        "UserId": 1,
        "createdAt": "2020-11-14T05:34:46.262Z",
        "updatedAt": "2020-11-14T07:32:00.062Z"
    }]`
 
* **Error Response:**

  * **Code:** 401 NOT FOUND <br />
    **Content:** `{ "error": "Authentication failed }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    fetchBanners (context) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('listBanners', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  ```

#
## Create Banner
#
* **URL**

  `/banners`

* **Method:**
  
   `POST` 
  
*  **URL Params**

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

   **Optional:**
 
   None

* **Data Params**

`{  "title": "Beli Aquarium Free Ikan Cupang - Diskon 12.12",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rrmIcVvDerHMIOWcDOwbM7w1wgKr1hPlwUpeuYWTbZy9wB3GsXBQ4BtU2g&usqp=CAc",
    "status": "Inactive",
    "stock": 15, 
}`

* **Success Response:**
  
  * **Code:** 201 CREATED<br />
    **Content:** 
  `[
    {
        "id": 6,
        "title": "Beli Aquarium Free Ikan Cupang - Diskon 12.12",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1rrmIcVvDerHMIOWcDOwbM7w1wgKr1hPlwUpeuYWTbZy9wB3GsXBQ4BtU2g&usqp=CAc",
        "status": "Inactive",
        "UserId": 1,
        "createdAt": "2020-11-14T05:34:46.262Z",
        "updatedAt": "2020-11-14T07:32:00.062Z"
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error: "Internal Server Error" }`

  * **Code:** 400  <br />
    **Content:** `{ error : "Sequelize validation Error" }`


* **Sample Call:**
 ```javascript
    addBanner (context, payload) {
      const token = localStorage.getItem('token')
      return axios({
        url: '/products',
        method: 'POST',
        headers: { token },
        data: {
          title: payload.title,
          image_url: payload.image_url,
          status: payload.status,
        }
      })
    }
  ```

#
## DELETE List Task by ID
#
* **URL**

  `/banners/:id`

* **Method:**
  
   `DELETE` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`

* **Data Params**

  `id`

* **Success Response:**
  * **Code:** 200 Unauthorized <br />
    **Content:** `{ "msg": "Data Success To Delete" }`
 
* **Error Response:**

 * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    deleteProduct (context, payload) {
      axios({
        url: '/banners/' + payload,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          console.log('Data Deleted!')
        })
        .catch(err => {
          console.log(err)
        })
    }
  ```

#
## EDIT Banners
#
* **URL**

  `/banners/:id`

* **Method:**
  
   `PUT` 
  
*  **URL Params**
   **Required:**
 
   `id=[integer]`

   **Required Headers:**
   `{
     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQxNzcwMjl9.e9124E_EFtwI3etyrS8ABRGvPyPP6Wl1UWhowpnTkws"
   }`


   **Required Headers:**
   
   `{  
       "title": "Hari Ikan Sedunia",
        "image_url": "https://i0.wp.com/oyimedia.com/wp-content/uploads/2020/04/Ikan-Cupang-Plakat.jpg?w=480&ssl=1",
        "status": "Active",
    }`


* **Data Params**

  `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** 

  ` {
        "id": 1,
        "title": "Hari Ikan Sedunia",
        "image_url": "https://i0.wp.com/oyimedia.com/wp-content/uploads/2020/04/Ikan-Cupang-Plakat.jpg?w=480&ssl=1",
        "status": "Active",
        "UserId": 1,
        "createdAt": "2020-11-14T07:31:26.841Z",
        "updatedAt": "2020-11-14T07:31:43.890Z"
    }
    `
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "msg": "Not authorized" }`

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
 ```javascript
    editBanner (context, payload) {
      axios({
        url: '/banners/' + payload.id,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          image_url: payload.image_url,
          status: payload.status,
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  ```