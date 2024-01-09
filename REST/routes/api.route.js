const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

// GET cars
router.get('/cars', async (req, res, next) => {
  try{
    const cars = await prisma.car.findMany({
      include:{
        type: true,
        manufacturer: true
      }
    });
    res.json(cars);
  }catch(error){
    console.log(`Error GET /cars`, error);
    next(error);
  }
});

// GET car by id
router.get('/cars/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const car = await prisma.car.findUnique({
      where:{
        id: Number(id)
      }, 
      include:{
        type: true,
        manufacturer: true
      }
    })
    res.json(car);
  }
  catch(error){
    console.log(`Error GET /cars/${id}`, error);
    next(error);
  }
});


// POST car
router.post('/cars', async (req, res, next) => {
  try{
    const car = await prisma.car.create({
      data: req.body
    })
    console.log(req.body);
    res.json(car);
  }
  catch(error){
    console.log(`Error POST /cars`, error);
    next(error)
  }
});


// DELETE car
router.delete('/cars/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const deletedCar = await prisma.car.delete({
      where:{
        id: Number(id)
      }
    })
    res.json(deletedCar);
  }
  catch(error){
    console.log(`Error DELETE /cars/${id}`, error);
    next(error);
  }
});


// PATCH car 
router.patch('/cars/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const car = await prisma.car.update({
      where:{
        id: Number(id)
      },
      data: req.body,
      include:{
        type: true,
        manufacturer: true
      }
    })
    res.json(car);

  }catch(error){
    console.log(`Error PATCH /cars/${id}`, error);
    next(error);
  }
});

// PUT car 
router.put('/cars/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    console.log(req.body)
    const car = await prisma.car.update({
      where:{
        id: Number(id)
      },
      data: req.body,
      include:{
        type: true,
        manufacturer: true
      }
      
    })
    res.json(car);

  }catch(error){
    console.log(`Error PUT /cars/${id}`, error);
    next(error);
  }
});



// GET manufacturers
router.get('/manufacturers', async (req, res, next) => {
  try{
    const manufacturers = await prisma.manufacturer.findMany();
    res.json(manufacturers);
  }catch(error){
    console.log(`Error GET /manufacturers`, error);
    next(error);
  }
});


// GET types
router.get('/types', async (req, res, next) => {
  try{
    const types = await prisma.type.findMany();
    res.json(types);
  }catch(error){
    console.log(`Error GET /types`, error);
    next(error);
  }
});


// GET type by name
router.get('/types/:name', async (req, res, next) => {
  try{
    const {name} = req.params
    const type = await prisma.type.findMany({
      where:{
        name: name
      }
    })
    res.json(type);
  }
  catch(error){
    console.log(`Error GET /types/${name}`, error);
    next(error);
  }
});


// GET users
router.get('/users', async (req, res, next) => {
  try{
    const users = await prisma.user.findMany();
    res.json(users);
  }catch(error){
    console.log(`Error GET /users`, error);
    next(error);
  }
});

// GET users by email
router.get('/users/:email', async (req, res, next) => {
  try{
    const {email} = req.params
    const user = await prisma.user.findFirst({
      where:{
        email: email
      }
    })
    res.json(user);
  }
  catch(error){
    console.log(`Error GET /users/${email}`, error);
    next(error);
  }
});


// POST user
router.post('/users', async (req, res, next) => {
  try{
    const user = await prisma.user.create({
      data: req.body
    })
    res.json(user);
  }
  catch(error){
    console.log('Error POST /users', error);
    next(error)
  }
});


// GET reservations
router.get('/reservations', async (req, res, next) => {
  try{
    const reservations = await prisma.reservation.findMany({
      include:{
        user: true,
        //car: true
        car: {
          include: {
            manufacturer: true,
            type:true
          }
        }
      }
    });
    res.json(reservations);
  }catch(error){
    console.log('Error GET /reservations', error);
    next(error);
  }
});

// POST reservation
router.post('/reservations', async (req, res, next) => {
  try{
    const add_res = await prisma.reservation.create({
      data: req.body
    })
    res.json(add_res);
  }
  catch(error){
    console.log('Error POST /reservation', error);
    next(error)
  }
});


// DELETE reservation
router.delete('/reservations/:userId/:carId', async (req, res, next) => {
  try{
    const {userId, carId} = req.params
    console.log(userId, carId);
    const deletedReservation = await prisma.reservation.delete({
      where:{
        carId_userId: {
          userId: Number(userId),
          carId: Number(carId),
        }
      }
    })
    res.json(deletedReservation);
  }
  catch(error){
    console.log(`Error DELETE /reservation/${userId}/${carId}`, error);
    next(error);
  }
});

module.exports = router;

