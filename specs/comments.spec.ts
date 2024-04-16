import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('COMMENTS', () => {
    it('get request',async () => {
        const res = await request.get('/comments')
        console.log(res);
    });
    it.skip('POST request', async() => {
        const data = {
            title: "My first post request",
            body: "This is my first post request",
            usrId: 1001
        }
        const res = await request.post('/posts').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("My first post request")
    })
});