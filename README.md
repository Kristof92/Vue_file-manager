# File Manager App

### (using MEVN stack)

---

The main goal of this project is to practice and hone my MongoDB (Atlas Cloud) - Express.js - Vue.js - Node.js skills and make a fully functional, responsive, secure whole application, deployed at Heroku.

Responsivity will be added later on in the second release, such as the unit tests (I know, not the best order).

---

### Dependency installation
- Install node_modules in the `root` by running the following command
```
npm install
```
- Install node_modules in the `client` folder by running the following command
```
npm install
```

---

### Environment setup for local usage


You should create a `config` directory and `dev.env` file in it (right under server dir.)

Add the following `environment variable` to be able to run the application:
- _PORT_ : 3000
- _MONGODB_URL_ : Atlas Cloud connection string here
- _DOMAIN_PROD_ : url here
- _DOMAIN_LOCAL_ : http://localhost:8080 (yes, port is needed too)
- _APP_ENVIRONMENT_ : LOCAL

---

### Launching the app

```
cd client
```

```
npm run serve
```

```
cd ..
```

```
npm run dev
```

---

>Made by Kristóf Bálinth
>

> LinkedIn: https://www.linkedin.com/in/krist%C3%B3f-b%C3%A1linth-ab4700192/
>
>E-mail: kristof.balinth@gmail.com
