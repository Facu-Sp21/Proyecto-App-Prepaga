import oracledb from "oracledb";

// Esto es IMPORTANTE para TypeScript
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool: oracledb.Pool | null = null;

export async function initDB() {
  if (pool) return pool;  // para evitar reinicializar el pool


  if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_CONNECT_STRING) {
  throw new Error("❌ Variables de entorno para la DB no definidas");
}

  pool = await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
    poolMin: 1,
    poolMax: 5,
    poolIncrement: 1,
    queueTimeout: 5000
  });

  console.log("Pool de conexión Oracle inicializado");
  return pool;
}

export async function getConnection() {
  if (!pool) {
    await initDB();
  }
  return pool!.getConnection();    // le digo "!" porque sé que no es null ya que aseguro que se creen
  
}