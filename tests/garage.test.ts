// import { Gateway } from "../src/classes/gateway";
// import { TestHelper } from './testhelper';


// beforeAll(async () => {
//     await TestHelper.instance.setupTestDB();
// });

// afterAll(() => {
//     TestHelper.instance.teardownTestDB();
// });

// describe('Gateway Tests', () => {

//     test('should create a numbers map', async () => {
//         const numbersMap = await Gateway.instance.createNumberMap('12345678', 'test');
//         expect(numbersMap.phoneNumber).toBe('12345678');
//         expect(numbersMap.home).toBe('test');
//     });

//     test('it should be able to return the home destination', async () => {
//         const home = await Gateway.instance.getHomeDestination('12345678');
//         expect(home).toBe('test');
//     });
// });