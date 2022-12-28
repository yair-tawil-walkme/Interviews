import { faker } from '@faker-js/faker'

export const getUsers = (size = 10) =>
  new Array(size).fill(null).map((_, index) => ({
    id: index,
    name: faker.name.fullName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 18, max: 63 }),
  }))
