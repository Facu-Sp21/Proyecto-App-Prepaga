declare module "oracledb" {
  export interface Connection {
    execute<T = any>(
      sql: string,
      bindParams?: Record<string, any> | any[],
      options?: { autoCommit?: boolean; outFormat?: number }
    ): Promise<{ rows?: T[]; rowsAffected?: number }>;

    commit(): Promise<void>;
    rollback(): Promise<void>;
    close(): Promise<void>;
  }

  export interface Pool {
    getConnection(): Promise<Connection>;
    close(force?: boolean): Promise<void>;
  }

  export function getConnection(): Promise<Connection>;

  export function createPool(config: {
    user: string;
    password: string;
    connectString: string;
    poolMin?: number;
    poolMax?: number;
    poolIncrement?: number;
    queueTimeout?: number;
  }): Promise<Pool>;

  export const OUT_FORMAT_OBJECT: number;
  export const OUT_FORMAT_ARRAY: number;

  // Configuración global
  export let outFormat: number;
}