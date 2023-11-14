module.exports=function(){
    var faker = require("faker");
    var _ =require("lodash");
    const startDate = new Date('2010-01-01');
    const endDate = new Date('2023-01-01');
    return{
        vehicle: _.times(100, function(n){
            return {
                id: n,
                manufacterer: faker.vehicle.manufacturer(),
                model: faker.vehicle.model(),
                date_of_manufacture: faker.date.between(startDate, endDate),
                available_count: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
                rental_cost: faker.datatype.float({ min: 100, max: 2000, precision: 0.01 }),
                seats_count: faker.datatype.number({ min: 4, max: 7}),
                gearbox: faker.datatype.boolean(),
                type: faker.vehicle.type()
            }
        })
    }
}