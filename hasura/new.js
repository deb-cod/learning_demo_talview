import { Sequelize,DataTypes } from 'sequelize';


const POSTGRES_CONNECTION_URL = "postgres://postgres:password@localhost:5432/postgres";
const sequelize = new Sequelize(POSTGRES_CONNECTION_URL, {});



// async function testSequelizeConnection() {
//     try {
//       // Test the connection
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     } finally {
//       // Close the Sequelize connection
//       await sequelize.close();
//     }
//   }
  
//   // Call the function to test the connection
//   testSequelizeConnection();


// Define a model to represent pg_class
const PgClass = sequelize.define('PgClass', {
    relname: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'pg_class',
    timestamps: false,
    schema: 'pg_catalog'
  });
  
  // Define a model to represent pg_namespace
  const PgNamespace = sequelize.define('PgNamespace', {
    nspname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'pg_namespace',
    timestamps: false,
    schema: 'pg_catalog'
  });
  
  // Establish association between PgClass and PgNamespace
  PgClass.belongsTo(PgNamespace, { foreignKey: 'relnamespace', targetKey: 'oid' });
  
  // Function to fetch table names
  async function getTableNames() {
    try {
      // Query the pg_class to get table names
      const tables = await PgClass.findAll({
        attributes: ['relname'],
        where: {
          relkind: 'r', // 'r' represents regular tables
          relnamespace: {
            [Sequelize.Op.eq]: 'public' // 'public' schema
          }
        },
        include: [{
          model: PgNamespace,
          attributes: ['nspname']
        }],
        raw: true
      });
  
      // Extract table names from the result
      const tableNames = tables.map(table => table.relname);
  
      console.log('Table Names:', tableNames);
    } catch (error) {
      console.error('Error fetching table names:', error);
    } finally {
      // Close the Sequelize connection
      await sequelize.close();
    }
  }
  
  // Call the function to get table names
  getTableNames();
  