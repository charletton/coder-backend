import express from 'express';
const app = express();

const people = [
  {
    id: 1,
    firstName:'sabri',
    lastName:'penelope'
  },
  {
    id: 2,
    firstName:'gabriel',
    lastName:'carranza'
  }
]

//ruta base
app.get('/', (req, res) => {
  const meDuele = 'mi huevo';
  res.send(meDuele)
})

//productos
app.get('/productos', (req, res) => {
  const mePica = 'el conio';
  res.send(mePica)
})

app.get('/users', (req,res) => {
  res.send(people)
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(p => p.id === id)
  if (person) {
    res.send(person)
    console.log(person)
  } else {
    res.send('404')
    console.log('User no encontrado')
  }
})



app.listen(8080, () => console.log('express listo oaaaa'));
