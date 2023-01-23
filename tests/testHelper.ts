// import { DataSource } from "typeorm"

// export class TestHelper {

//     private static _instance: TestHelper;

//     private constructor() {}

//     public static get instance(): TestHelper {
//         if(!this._instance) this._instance = new TestHelper();

//         return this._instance;
//     }

//     private dbConnect!: DataSource;
//     private testdb!: any;


//     async setupTestDB() {
//         // this.testdb = new Database(':memory:', { verbose: console.log });

//         this.dbConnect =  new DataSource({
//           type: "postgres",
//           host: `${process.env.DB_HOST}`,
//           port: Number(`${process.env.DB_PORT}`),
//           username: `${process.env.DB_USERNAME}`,
//           password: `${process.env.DB_PASSWORD}`,
//           database: `${process.env.DB_NAME}`,
//           entities: ['src/entity/**/*.ts'],
//           logging: true,
//           synchronize: true,
//       })
//     }

//     teardownTestDB() {
//         this.dbConnect.destroy();
//         this.testdb.close();
//     }

// }