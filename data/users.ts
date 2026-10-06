import type { User } from "../objects/user";

let idCounter = 0;

//creates an user following a pattern
export function CreateUser(overrides: Partial<User>  = {}): User{
    idCounter+= 1;
    return{
        id: idCounter,
        name: `test_name_user_${idCounter}`,
        email: `test_user_${idCounter}@demo.com`,
        password: 'tst123@!#',
        ...overrides
    };
}

//creates multiple users, following the same pattern
export function CreateUsers(count: number, overrides: Partial<User> ={}): User[]{
    return Array.from({length: count}, ()=> CreateUser(overrides));
}

//users that are valid on demo shop
export const validUsers: User[] = [
    CreateUser({name: 'dino', email: 'dino@testbuyer.com', password:'choochoo'}),
    CreateUser({name: 'ducker', email: 'ducker@testbuyer.com', password:'choochoo'}),
    CreateUser({name: 'beetle', email: 'beetle@testbuyer.com', password:'choochoo'}),
    CreateUser({name: 'turtle', email: 'turtle@testbuyer.com', password:'choochoo'}),
];

//users that are valid, but locked out
export const lockedOutUsers: User[] = [
  CreateUser({name: 'locked', email: 'locked@testbuyer.com', password:'choochoo'})
];

//invalid users
export const invalidUsers: User[] = [
    CreateUser({name: 'diNo', email: 'dino@testbuyer.com', password:'choochoo'}), // wrong username
    CreateUser({name: 'ducker', email: 'ducker@testbuyer.com', password:'chooChoo'}), //wrong password
];