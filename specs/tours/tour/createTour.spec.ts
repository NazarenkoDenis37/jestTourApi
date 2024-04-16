import * as supertest from "supertest";
import {user} from "../../../data/user"
import {signUp} from "../../../data/helpers"
const request = supertest("localhost:8001/api/v1");

let cookie:[x:string]
describe('TOUR', () => {
    it('create tour', async() => {
        await signUp(user).then((res) =>{
            expect(res.statusCode).toBe(201)
            expect(res.body.data.user.email).toBe(user.email)
            cookie = res.header['set-cookie']
            console.log(cookie)
        })
        await request
        .post('/tours')
        .set('Cookie', cookie)
        .send({
            "name":"TourForn51",
            "duration": 10,
            "description":"Could be",
            "maxGroupSize": 10,
            "summary": "Test tour",
            "difficulty": "easy",
            "price": 100,
            "rating": 4.8,
            "imageCover": "tour-3-cover.jpg",
            "ratingsAverage": 4.9,
            "guides":[],
            "startDates":["2024-04-04"],
            "location": {
                "latitude": 40.712776,
                "longitude": -74.005974,
                "description": "Central Park, New York",
                "address": "123 Park Ave, New York, NY 10001"
            },
            "startLocation": {
                "type": "Point",
                "coordinates": [-74.005974, 40.712776]
            }
        })
        .then(res=>{
            console.log(res.body.data)
        })
    });
});