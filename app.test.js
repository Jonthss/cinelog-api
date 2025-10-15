const request = require('supertest');
const appUrl = 'https://cinelog-api.onrender.com'; 

describe('API GET Routes Tests', () => {

    describe('Movies API', () => {
        it('should fetch all movies', async () => {
            const res = await request(appUrl).get('/movies');
            expect(res.statusCode).toEqual(200);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should fetch a single movie (use a real ID from your DB)', async () => {
            const movieId = '68e11216c923a77ecbd6fb6f'; 
            if (movieId === 'ID_REAL_DE_UM_FILME_DO_SEU_BANCO') {
                console.warn("WARNING: Insert a valid movie ID from your database in the test 'should fetch a single movie'.");
                return;
            }
            const res = await request(appUrl).get(`/movies/${movieId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id', movieId);
        });
    });

    describe('Users API', () => {
        it('should fetch all users', async () => {
            const res = await request(appUrl).get('/users');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should fetch a single user (use a real ID from your DB)', async () => {
            const userId = '68e117bb8598bbc856eb4d26'; 
            if (userId === 'ID_REAL_DE_UM_USUARIO_DO_SEU_BANCO') {
                console.warn("WARNING: Insert a valid user ID from your database in the test 'should fetch a single user'.");
                return;
            }
            const res = await request(appUrl).get(`/users/${userId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id', userId);
        });
    });

    describe('User Lists API', () => {
        it('should fetch all user lists', async () => {
            const res = await request(appUrl).get('/user-lists');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should fetch a single user list (use a real ID from your DB)', async () => {
            const listId = '68e1184d8598bbc856eb4d29';
            if (listId === 'ID_REAL_DE_UMA_LISTA_DO_SEU_BANCO') {
                console.warn("WARNING: Insert a valid list ID from your database in the test 'should fetch a single user list'.");
                return;
            }
            const res = await request(appUrl).get(`/user-lists/${listId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id', listId);
        });
    });

    describe('Reviews API', () => {
        it('should fetch all reviews', async () => {
            const res = await request(appUrl).get('/reviews');
            expect(res.statusCode).toEqual(200);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should fetch a single review by ID', async () => {
            const reviewId = '68ea61026c611acf2d8a9b5a';
            const res = await request(appUrl).get(`/reviews/${reviewId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id', reviewId);
        });
    });
});
