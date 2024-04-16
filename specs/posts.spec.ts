import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('POSTS', () => {
    it('get request',async () => {
        const res = await request.get('/posts')
        console.log(res);
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].id).toBe(1)
    });
    it('POST request', async() => {
        const data = {
            title: "My first post request",
            body: "This is my first post request",
            usrId: 1001
        }
        const res = await request.post('/posts').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("My first post request")
    })
    it('PATCH request with title version 1', async() => {
        const data = {
            title: "My first post request"
        }
        const getRes = await request.get('/posts/1')
        const beforeTitle = getRes.body.title

        const res = await request.patch('/posts/1').send(data)
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toBe(data.title)
        expect(res.body.title).not.toBe(beforeTitle)
    })
    it('PATCH request with title version 2', async() => {
        const data = {
            title: "My first post request"
        }
        const getRes = await request.get('/posts/1')
        const beforeTitle = getRes.body.title
        await request
        .patch('/posts/1')
        .send(data)
        .then(response=>{
            console.log(response.body, '=============')
            expect(response.statusCode).toEqual(200)
            expect(response.body.title).toBe(data.title)
            expect(response.body.title).not.toBe(beforeTitle)
        })
    })
    it.only('PATCH request with title version 3', (done) => {
        const data = {
            title: "My first post request"
        }
        let beforeTitle = null;
        request
        .get('/posts/1')
        .end((err, res)=>{
            if(err) return done(err)
            beforeTitle = res.body.title
        console.log(beforeTitle, 'beforeTitle ==========')
        })
        request
        .patch('/posts/1')
        .send(data)
        .expect(200)
        .end((err, res)=>{
            if(err) return done(err)
            console.log(res.body, '=============')
            expect(res.body.title).toBe(data.title)
            expect(res.body.title).not.toBe(beforeTitle)
            done()
        })
    })
    it('DELETE request', async () => {
        const res = await request.delete('/posts/1')
        console.log(res.body, '=======resp body=======')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({})
    })
});