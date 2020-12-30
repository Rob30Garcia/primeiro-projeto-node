import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({
    message: "Vamos começar essa bagaça!!!"
  });
});

app.listen(3333, function () {
  console.log("Server on started in port 3333!");
}
);
