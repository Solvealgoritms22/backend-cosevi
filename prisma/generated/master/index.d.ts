
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model PendingRegistration
 * 
 */
export type PendingRegistration = $Result.DefaultSelection<Prisma.$PendingRegistrationPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model UsageSnapshot
 * 
 */
export type UsageSnapshot = $Result.DefaultSelection<Prisma.$UsageSnapshotPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RegistrationStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELLED: 'CANCELLED',
  PAUSED: 'PAUSED'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const InvoiceStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]

}

export type RegistrationStatus = $Enums.RegistrationStatus

export const RegistrationStatus: typeof $Enums.RegistrationStatus

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type InvoiceStatus = $Enums.InvoiceStatus

export const InvoiceStatus: typeof $Enums.InvoiceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendingRegistration`: Exposes CRUD operations for the **PendingRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingRegistrations
    * const pendingRegistrations = await prisma.pendingRegistration.findMany()
    * ```
    */
  get pendingRegistration(): Prisma.PendingRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageSnapshot`: Exposes CRUD operations for the **UsageSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageSnapshots
    * const usageSnapshots = await prisma.usageSnapshot.findMany()
    * ```
    */
  get usageSnapshot(): Prisma.UsageSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    PendingRegistration: 'PendingRegistration',
    Subscription: 'Subscription',
    Invoice: 'Invoice',
    UsageSnapshot: 'UsageSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tenant" | "pendingRegistration" | "subscription" | "invoice" | "usageSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      PendingRegistration: {
        payload: Prisma.$PendingRegistrationPayload<ExtArgs>
        fields: Prisma.PendingRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          findFirst: {
            args: Prisma.PendingRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          findMany: {
            args: Prisma.PendingRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>[]
          }
          create: {
            args: Prisma.PendingRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          createMany: {
            args: Prisma.PendingRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>[]
          }
          delete: {
            args: Prisma.PendingRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          update: {
            args: Prisma.PendingRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.PendingRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendingRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.PendingRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRegistrationPayload>
          }
          aggregate: {
            args: Prisma.PendingRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingRegistration>
          }
          groupBy: {
            args: Prisma.PendingRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<PendingRegistrationCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      UsageSnapshot: {
        payload: Prisma.$UsageSnapshotPayload<ExtArgs>
        fields: Prisma.UsageSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          findFirst: {
            args: Prisma.UsageSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          findMany: {
            args: Prisma.UsageSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>[]
          }
          create: {
            args: Prisma.UsageSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          createMany: {
            args: Prisma.UsageSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>[]
          }
          delete: {
            args: Prisma.UsageSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          update: {
            args: Prisma.UsageSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.UsageSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.UsageSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageSnapshotPayload>
          }
          aggregate: {
            args: Prisma.UsageSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageSnapshot>
          }
          groupBy: {
            args: Prisma.UsageSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<UsageSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tenant?: TenantOmit
    pendingRegistration?: PendingRegistrationOmit
    subscription?: SubscriptionOmit
    invoice?: InvoiceOmit
    usageSnapshot?: UsageSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    subscriptions: number
    invoices: number
    usageSnapshots: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | TenantCountOutputTypeCountSubscriptionsArgs
    invoices?: boolean | TenantCountOutputTypeCountInvoicesArgs
    usageSnapshots?: boolean | TenantCountOutputTypeCountUsageSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountUsageSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageSnapshotWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    invoices: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | SubscriptionCountOutputTypeCountInvoicesArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    subdomain: string | null
    dbUrl: string | null
    plan: string | null
    apiKey: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    location: string | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    subdomain: string | null
    dbUrl: string | null
    plan: string | null
    apiKey: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    location: string | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    subdomain: number
    dbUrl: number
    plan: number
    apiKey: number
    logoUrl: number
    primaryColor: number
    secondaryColor: number
    createdAt: number
    updatedAt: number
    isActive: number
    location: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    dbUrl?: true
    plan?: true
    apiKey?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    location?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    dbUrl?: true
    plan?: true
    apiKey?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    location?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    dbUrl?: true
    plan?: true
    apiKey?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    location?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    subdomain: string
    dbUrl: string
    plan: string
    apiKey: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    location: string | null
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    dbUrl?: boolean
    plan?: boolean
    apiKey?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    location?: boolean
    subscriptions?: boolean | Tenant$subscriptionsArgs<ExtArgs>
    invoices?: boolean | Tenant$invoicesArgs<ExtArgs>
    usageSnapshots?: boolean | Tenant$usageSnapshotsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    dbUrl?: boolean
    plan?: boolean
    apiKey?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    location?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    dbUrl?: boolean
    plan?: boolean
    apiKey?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    location?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    subdomain?: boolean
    dbUrl?: boolean
    plan?: boolean
    apiKey?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    location?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "subdomain" | "dbUrl" | "plan" | "apiKey" | "logoUrl" | "primaryColor" | "secondaryColor" | "createdAt" | "updatedAt" | "isActive" | "location", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | Tenant$subscriptionsArgs<ExtArgs>
    invoices?: boolean | Tenant$invoicesArgs<ExtArgs>
    usageSnapshots?: boolean | Tenant$usageSnapshotsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      usageSnapshots: Prisma.$UsageSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      subdomain: string
      dbUrl: string
      plan: string
      apiKey: string | null
      logoUrl: string | null
      primaryColor: string | null
      secondaryColor: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      location: string | null
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends Tenant$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invoices<T extends Tenant$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageSnapshots<T extends Tenant$usageSnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$usageSnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly subdomain: FieldRef<"Tenant", 'String'>
    readonly dbUrl: FieldRef<"Tenant", 'String'>
    readonly plan: FieldRef<"Tenant", 'String'>
    readonly apiKey: FieldRef<"Tenant", 'String'>
    readonly logoUrl: FieldRef<"Tenant", 'String'>
    readonly primaryColor: FieldRef<"Tenant", 'String'>
    readonly secondaryColor: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
    readonly isActive: FieldRef<"Tenant", 'Boolean'>
    readonly location: FieldRef<"Tenant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.subscriptions
   */
  export type Tenant$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Tenant.invoices
   */
  export type Tenant$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Tenant.usageSnapshots
   */
  export type Tenant$usageSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    where?: UsageSnapshotWhereInput
    orderBy?: UsageSnapshotOrderByWithRelationInput | UsageSnapshotOrderByWithRelationInput[]
    cursor?: UsageSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageSnapshotScalarFieldEnum | UsageSnapshotScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model PendingRegistration
   */

  export type AggregatePendingRegistration = {
    _count: PendingRegistrationCountAggregateOutputType | null
    _avg: PendingRegistrationAvgAggregateOutputType | null
    _sum: PendingRegistrationSumAggregateOutputType | null
    _min: PendingRegistrationMinAggregateOutputType | null
    _max: PendingRegistrationMaxAggregateOutputType | null
  }

  export type PendingRegistrationAvgAggregateOutputType = {
    amount: number | null
  }

  export type PendingRegistrationSumAggregateOutputType = {
    amount: number | null
  }

  export type PendingRegistrationMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    organizationName: string | null
    location: string | null
    plan: string | null
    logoUrl: string | null
    paypalOrderId: string | null
    paymentLink: string | null
    amount: number | null
    status: $Enums.RegistrationStatus | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendingRegistrationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    organizationName: string | null
    location: string | null
    plan: string | null
    logoUrl: string | null
    paypalOrderId: string | null
    paymentLink: string | null
    amount: number | null
    status: $Enums.RegistrationStatus | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendingRegistrationCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    organizationName: number
    location: number
    plan: number
    logoUrl: number
    paypalOrderId: number
    paymentLink: number
    amount: number
    status: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PendingRegistrationAvgAggregateInputType = {
    amount?: true
  }

  export type PendingRegistrationSumAggregateInputType = {
    amount?: true
  }

  export type PendingRegistrationMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    organizationName?: true
    location?: true
    plan?: true
    logoUrl?: true
    paypalOrderId?: true
    paymentLink?: true
    amount?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendingRegistrationMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    organizationName?: true
    location?: true
    plan?: true
    logoUrl?: true
    paypalOrderId?: true
    paymentLink?: true
    amount?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendingRegistrationCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    organizationName?: true
    location?: true
    plan?: true
    logoUrl?: true
    paypalOrderId?: true
    paymentLink?: true
    amount?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PendingRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingRegistration to aggregate.
     */
    where?: PendingRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRegistrations to fetch.
     */
    orderBy?: PendingRegistrationOrderByWithRelationInput | PendingRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingRegistrations
    **/
    _count?: true | PendingRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PendingRegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PendingRegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingRegistrationMaxAggregateInputType
  }

  export type GetPendingRegistrationAggregateType<T extends PendingRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingRegistration[P]>
      : GetScalarType<T[P], AggregatePendingRegistration[P]>
  }




  export type PendingRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingRegistrationWhereInput
    orderBy?: PendingRegistrationOrderByWithAggregationInput | PendingRegistrationOrderByWithAggregationInput[]
    by: PendingRegistrationScalarFieldEnum[] | PendingRegistrationScalarFieldEnum
    having?: PendingRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingRegistrationCountAggregateInputType | true
    _avg?: PendingRegistrationAvgAggregateInputType
    _sum?: PendingRegistrationSumAggregateInputType
    _min?: PendingRegistrationMinAggregateInputType
    _max?: PendingRegistrationMaxAggregateInputType
  }

  export type PendingRegistrationGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    organizationName: string
    location: string | null
    plan: string
    logoUrl: string | null
    paypalOrderId: string | null
    paymentLink: string | null
    amount: number
    status: $Enums.RegistrationStatus
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PendingRegistrationCountAggregateOutputType | null
    _avg: PendingRegistrationAvgAggregateOutputType | null
    _sum: PendingRegistrationSumAggregateOutputType | null
    _min: PendingRegistrationMinAggregateOutputType | null
    _max: PendingRegistrationMaxAggregateOutputType | null
  }

  type GetPendingRegistrationGroupByPayload<T extends PendingRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], PendingRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type PendingRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    organizationName?: boolean
    location?: boolean
    plan?: boolean
    logoUrl?: boolean
    paypalOrderId?: boolean
    paymentLink?: boolean
    amount?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pendingRegistration"]>

  export type PendingRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    organizationName?: boolean
    location?: boolean
    plan?: boolean
    logoUrl?: boolean
    paypalOrderId?: boolean
    paymentLink?: boolean
    amount?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pendingRegistration"]>

  export type PendingRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    organizationName?: boolean
    location?: boolean
    plan?: boolean
    logoUrl?: boolean
    paypalOrderId?: boolean
    paymentLink?: boolean
    amount?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pendingRegistration"]>

  export type PendingRegistrationSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    organizationName?: boolean
    location?: boolean
    plan?: boolean
    logoUrl?: boolean
    paypalOrderId?: boolean
    paymentLink?: boolean
    amount?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PendingRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "organizationName" | "location" | "plan" | "logoUrl" | "paypalOrderId" | "paymentLink" | "amount" | "status" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pendingRegistration"]>

  export type $PendingRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingRegistration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      organizationName: string
      location: string | null
      plan: string
      logoUrl: string | null
      paypalOrderId: string | null
      paymentLink: string | null
      amount: number
      status: $Enums.RegistrationStatus
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pendingRegistration"]>
    composites: {}
  }

  type PendingRegistrationGetPayload<S extends boolean | null | undefined | PendingRegistrationDefaultArgs> = $Result.GetResult<Prisma.$PendingRegistrationPayload, S>

  type PendingRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendingRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendingRegistrationCountAggregateInputType | true
    }

  export interface PendingRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingRegistration'], meta: { name: 'PendingRegistration' } }
    /**
     * Find zero or one PendingRegistration that matches the filter.
     * @param {PendingRegistrationFindUniqueArgs} args - Arguments to find a PendingRegistration
     * @example
     * // Get one PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingRegistrationFindUniqueArgs>(args: SelectSubset<T, PendingRegistrationFindUniqueArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PendingRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingRegistrationFindUniqueOrThrowArgs} args - Arguments to find a PendingRegistration
     * @example
     * // Get one PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationFindFirstArgs} args - Arguments to find a PendingRegistration
     * @example
     * // Get one PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingRegistrationFindFirstArgs>(args?: SelectSubset<T, PendingRegistrationFindFirstArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationFindFirstOrThrowArgs} args - Arguments to find a PendingRegistration
     * @example
     * // Get one PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PendingRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingRegistrations
     * const pendingRegistrations = await prisma.pendingRegistration.findMany()
     * 
     * // Get first 10 PendingRegistrations
     * const pendingRegistrations = await prisma.pendingRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendingRegistrationWithIdOnly = await prisma.pendingRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendingRegistrationFindManyArgs>(args?: SelectSubset<T, PendingRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PendingRegistration.
     * @param {PendingRegistrationCreateArgs} args - Arguments to create a PendingRegistration.
     * @example
     * // Create one PendingRegistration
     * const PendingRegistration = await prisma.pendingRegistration.create({
     *   data: {
     *     // ... data to create a PendingRegistration
     *   }
     * })
     * 
     */
    create<T extends PendingRegistrationCreateArgs>(args: SelectSubset<T, PendingRegistrationCreateArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PendingRegistrations.
     * @param {PendingRegistrationCreateManyArgs} args - Arguments to create many PendingRegistrations.
     * @example
     * // Create many PendingRegistrations
     * const pendingRegistration = await prisma.pendingRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingRegistrationCreateManyArgs>(args?: SelectSubset<T, PendingRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingRegistrations and returns the data saved in the database.
     * @param {PendingRegistrationCreateManyAndReturnArgs} args - Arguments to create many PendingRegistrations.
     * @example
     * // Create many PendingRegistrations
     * const pendingRegistration = await prisma.pendingRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingRegistrations and only return the `id`
     * const pendingRegistrationWithIdOnly = await prisma.pendingRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PendingRegistration.
     * @param {PendingRegistrationDeleteArgs} args - Arguments to delete one PendingRegistration.
     * @example
     * // Delete one PendingRegistration
     * const PendingRegistration = await prisma.pendingRegistration.delete({
     *   where: {
     *     // ... filter to delete one PendingRegistration
     *   }
     * })
     * 
     */
    delete<T extends PendingRegistrationDeleteArgs>(args: SelectSubset<T, PendingRegistrationDeleteArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PendingRegistration.
     * @param {PendingRegistrationUpdateArgs} args - Arguments to update one PendingRegistration.
     * @example
     * // Update one PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingRegistrationUpdateArgs>(args: SelectSubset<T, PendingRegistrationUpdateArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PendingRegistrations.
     * @param {PendingRegistrationDeleteManyArgs} args - Arguments to filter PendingRegistrations to delete.
     * @example
     * // Delete a few PendingRegistrations
     * const { count } = await prisma.pendingRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingRegistrationDeleteManyArgs>(args?: SelectSubset<T, PendingRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingRegistrations
     * const pendingRegistration = await prisma.pendingRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingRegistrationUpdateManyArgs>(args: SelectSubset<T, PendingRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingRegistrations and returns the data updated in the database.
     * @param {PendingRegistrationUpdateManyAndReturnArgs} args - Arguments to update many PendingRegistrations.
     * @example
     * // Update many PendingRegistrations
     * const pendingRegistration = await prisma.pendingRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PendingRegistrations and only return the `id`
     * const pendingRegistrationWithIdOnly = await prisma.pendingRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendingRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, PendingRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PendingRegistration.
     * @param {PendingRegistrationUpsertArgs} args - Arguments to update or create a PendingRegistration.
     * @example
     * // Update or create a PendingRegistration
     * const pendingRegistration = await prisma.pendingRegistration.upsert({
     *   create: {
     *     // ... data to create a PendingRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingRegistration we want to update
     *   }
     * })
     */
    upsert<T extends PendingRegistrationUpsertArgs>(args: SelectSubset<T, PendingRegistrationUpsertArgs<ExtArgs>>): Prisma__PendingRegistrationClient<$Result.GetResult<Prisma.$PendingRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PendingRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationCountArgs} args - Arguments to filter PendingRegistrations to count.
     * @example
     * // Count the number of PendingRegistrations
     * const count = await prisma.pendingRegistration.count({
     *   where: {
     *     // ... the filter for the PendingRegistrations we want to count
     *   }
     * })
    **/
    count<T extends PendingRegistrationCountArgs>(
      args?: Subset<T, PendingRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendingRegistrationAggregateArgs>(args: Subset<T, PendingRegistrationAggregateArgs>): Prisma.PrismaPromise<GetPendingRegistrationAggregateType<T>>

    /**
     * Group by PendingRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendingRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: PendingRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendingRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingRegistration model
   */
  readonly fields: PendingRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PendingRegistration model
   */
  interface PendingRegistrationFieldRefs {
    readonly id: FieldRef<"PendingRegistration", 'String'>
    readonly name: FieldRef<"PendingRegistration", 'String'>
    readonly email: FieldRef<"PendingRegistration", 'String'>
    readonly passwordHash: FieldRef<"PendingRegistration", 'String'>
    readonly organizationName: FieldRef<"PendingRegistration", 'String'>
    readonly location: FieldRef<"PendingRegistration", 'String'>
    readonly plan: FieldRef<"PendingRegistration", 'String'>
    readonly logoUrl: FieldRef<"PendingRegistration", 'String'>
    readonly paypalOrderId: FieldRef<"PendingRegistration", 'String'>
    readonly paymentLink: FieldRef<"PendingRegistration", 'String'>
    readonly amount: FieldRef<"PendingRegistration", 'Float'>
    readonly status: FieldRef<"PendingRegistration", 'RegistrationStatus'>
    readonly expiresAt: FieldRef<"PendingRegistration", 'DateTime'>
    readonly createdAt: FieldRef<"PendingRegistration", 'DateTime'>
    readonly updatedAt: FieldRef<"PendingRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PendingRegistration findUnique
   */
  export type PendingRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PendingRegistration to fetch.
     */
    where: PendingRegistrationWhereUniqueInput
  }

  /**
   * PendingRegistration findUniqueOrThrow
   */
  export type PendingRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PendingRegistration to fetch.
     */
    where: PendingRegistrationWhereUniqueInput
  }

  /**
   * PendingRegistration findFirst
   */
  export type PendingRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PendingRegistration to fetch.
     */
    where?: PendingRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRegistrations to fetch.
     */
    orderBy?: PendingRegistrationOrderByWithRelationInput | PendingRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingRegistrations.
     */
    cursor?: PendingRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingRegistrations.
     */
    distinct?: PendingRegistrationScalarFieldEnum | PendingRegistrationScalarFieldEnum[]
  }

  /**
   * PendingRegistration findFirstOrThrow
   */
  export type PendingRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PendingRegistration to fetch.
     */
    where?: PendingRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRegistrations to fetch.
     */
    orderBy?: PendingRegistrationOrderByWithRelationInput | PendingRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingRegistrations.
     */
    cursor?: PendingRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingRegistrations.
     */
    distinct?: PendingRegistrationScalarFieldEnum | PendingRegistrationScalarFieldEnum[]
  }

  /**
   * PendingRegistration findMany
   */
  export type PendingRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PendingRegistrations to fetch.
     */
    where?: PendingRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRegistrations to fetch.
     */
    orderBy?: PendingRegistrationOrderByWithRelationInput | PendingRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingRegistrations.
     */
    cursor?: PendingRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRegistrations.
     */
    skip?: number
    distinct?: PendingRegistrationScalarFieldEnum | PendingRegistrationScalarFieldEnum[]
  }

  /**
   * PendingRegistration create
   */
  export type PendingRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to create a PendingRegistration.
     */
    data: XOR<PendingRegistrationCreateInput, PendingRegistrationUncheckedCreateInput>
  }

  /**
   * PendingRegistration createMany
   */
  export type PendingRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingRegistrations.
     */
    data: PendingRegistrationCreateManyInput | PendingRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingRegistration createManyAndReturn
   */
  export type PendingRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many PendingRegistrations.
     */
    data: PendingRegistrationCreateManyInput | PendingRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingRegistration update
   */
  export type PendingRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to update a PendingRegistration.
     */
    data: XOR<PendingRegistrationUpdateInput, PendingRegistrationUncheckedUpdateInput>
    /**
     * Choose, which PendingRegistration to update.
     */
    where: PendingRegistrationWhereUniqueInput
  }

  /**
   * PendingRegistration updateMany
   */
  export type PendingRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingRegistrations.
     */
    data: XOR<PendingRegistrationUpdateManyMutationInput, PendingRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PendingRegistrations to update
     */
    where?: PendingRegistrationWhereInput
    /**
     * Limit how many PendingRegistrations to update.
     */
    limit?: number
  }

  /**
   * PendingRegistration updateManyAndReturn
   */
  export type PendingRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update PendingRegistrations.
     */
    data: XOR<PendingRegistrationUpdateManyMutationInput, PendingRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PendingRegistrations to update
     */
    where?: PendingRegistrationWhereInput
    /**
     * Limit how many PendingRegistrations to update.
     */
    limit?: number
  }

  /**
   * PendingRegistration upsert
   */
  export type PendingRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * The filter to search for the PendingRegistration to update in case it exists.
     */
    where: PendingRegistrationWhereUniqueInput
    /**
     * In case the PendingRegistration found by the `where` argument doesn't exist, create a new PendingRegistration with this data.
     */
    create: XOR<PendingRegistrationCreateInput, PendingRegistrationUncheckedCreateInput>
    /**
     * In case the PendingRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingRegistrationUpdateInput, PendingRegistrationUncheckedUpdateInput>
  }

  /**
   * PendingRegistration delete
   */
  export type PendingRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
    /**
     * Filter which PendingRegistration to delete.
     */
    where: PendingRegistrationWhereUniqueInput
  }

  /**
   * PendingRegistration deleteMany
   */
  export type PendingRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingRegistrations to delete
     */
    where?: PendingRegistrationWhereInput
    /**
     * Limit how many PendingRegistrations to delete.
     */
    limit?: number
  }

  /**
   * PendingRegistration without action
   */
  export type PendingRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRegistration
     */
    select?: PendingRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingRegistration
     */
    omit?: PendingRegistrationOmit<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    amount: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    amount: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    plan: string | null
    paypalSubscriptionId: string | null
    status: $Enums.SubscriptionStatus | null
    amount: number | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    plan: string | null
    paypalSubscriptionId: string | null
    status: $Enums.SubscriptionStatus | null
    amount: number | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    tenantId: number
    plan: number
    paypalSubscriptionId: number
    status: number
    amount: number
    currentPeriodStart: number
    currentPeriodEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    amount?: true
  }

  export type SubscriptionSumAggregateInputType = {
    amount?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    tenantId?: true
    plan?: true
    paypalSubscriptionId?: true
    status?: true
    amount?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    plan?: true
    paypalSubscriptionId?: true
    status?: true
    amount?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    tenantId?: true
    plan?: true
    paypalSubscriptionId?: true
    status?: true
    amount?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    tenantId: string
    plan: string
    paypalSubscriptionId: string | null
    status: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date
    currentPeriodEnd: Date
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    plan?: boolean
    paypalSubscriptionId?: boolean
    status?: boolean
    amount?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoices?: boolean | Subscription$invoicesArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    plan?: boolean
    paypalSubscriptionId?: boolean
    status?: boolean
    amount?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    plan?: boolean
    paypalSubscriptionId?: boolean
    status?: boolean
    amount?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    plan?: boolean
    paypalSubscriptionId?: boolean
    status?: boolean
    amount?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "plan" | "paypalSubscriptionId" | "status" | "amount" | "currentPeriodStart" | "currentPeriodEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoices?: boolean | Subscription$invoicesArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      plan: string
      paypalSubscriptionId: string | null
      status: $Enums.SubscriptionStatus
      amount: number
      currentPeriodStart: Date
      currentPeriodEnd: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoices<T extends Subscription$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly tenantId: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'String'>
    readonly paypalSubscriptionId: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly amount: FieldRef<"Subscription", 'Float'>
    readonly currentPeriodStart: FieldRef<"Subscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription.invoices
   */
  export type Subscription$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    amount: number | null
    overageAmount: number | null
    totalAmount: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    amount: number | null
    overageAmount: number | null
    totalAmount: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    subscriptionId: string | null
    amount: number | null
    overageAmount: number | null
    totalAmount: number | null
    status: $Enums.InvoiceStatus | null
    paypalPaymentId: string | null
    billingPeriodStart: Date | null
    billingPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    subscriptionId: string | null
    amount: number | null
    overageAmount: number | null
    totalAmount: number | null
    status: $Enums.InvoiceStatus | null
    paypalPaymentId: string | null
    billingPeriodStart: Date | null
    billingPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    tenantId: number
    subscriptionId: number
    amount: number
    overageAmount: number
    totalAmount: number
    status: number
    paypalPaymentId: number
    billingPeriodStart: number
    billingPeriodEnd: number
    details: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    amount?: true
    overageAmount?: true
    totalAmount?: true
  }

  export type InvoiceSumAggregateInputType = {
    amount?: true
    overageAmount?: true
    totalAmount?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    tenantId?: true
    subscriptionId?: true
    amount?: true
    overageAmount?: true
    totalAmount?: true
    status?: true
    paypalPaymentId?: true
    billingPeriodStart?: true
    billingPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    tenantId?: true
    subscriptionId?: true
    amount?: true
    overageAmount?: true
    totalAmount?: true
    status?: true
    paypalPaymentId?: true
    billingPeriodStart?: true
    billingPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    tenantId?: true
    subscriptionId?: true
    amount?: true
    overageAmount?: true
    totalAmount?: true
    status?: true
    paypalPaymentId?: true
    billingPeriodStart?: true
    billingPeriodEnd?: true
    details?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    tenantId: string
    subscriptionId: string | null
    amount: number
    overageAmount: number
    totalAmount: number
    status: $Enums.InvoiceStatus
    paypalPaymentId: string | null
    billingPeriodStart: Date
    billingPeriodEnd: Date
    details: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    overageAmount?: boolean
    totalAmount?: boolean
    status?: boolean
    paypalPaymentId?: boolean
    billingPeriodStart?: boolean
    billingPeriodEnd?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
    usageSnapshot?: boolean | Invoice$usageSnapshotArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    overageAmount?: boolean
    totalAmount?: boolean
    status?: boolean
    paypalPaymentId?: boolean
    billingPeriodStart?: boolean
    billingPeriodEnd?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    overageAmount?: boolean
    totalAmount?: boolean
    status?: boolean
    paypalPaymentId?: boolean
    billingPeriodStart?: boolean
    billingPeriodEnd?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    tenantId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    overageAmount?: boolean
    totalAmount?: boolean
    status?: boolean
    paypalPaymentId?: boolean
    billingPeriodStart?: boolean
    billingPeriodEnd?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "subscriptionId" | "amount" | "overageAmount" | "totalAmount" | "status" | "paypalPaymentId" | "billingPeriodStart" | "billingPeriodEnd" | "details" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
    usageSnapshot?: boolean | Invoice$usageSnapshotArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    subscription?: boolean | Invoice$subscriptionArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      usageSnapshot: Prisma.$UsageSnapshotPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      subscriptionId: string | null
      amount: number
      overageAmount: number
      totalAmount: number
      status: $Enums.InvoiceStatus
      paypalPaymentId: string | null
      billingPeriodStart: Date
      billingPeriodEnd: Date
      details: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscription<T extends Invoice$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    usageSnapshot<T extends Invoice$usageSnapshotArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$usageSnapshotArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly tenantId: FieldRef<"Invoice", 'String'>
    readonly subscriptionId: FieldRef<"Invoice", 'String'>
    readonly amount: FieldRef<"Invoice", 'Float'>
    readonly overageAmount: FieldRef<"Invoice", 'Float'>
    readonly totalAmount: FieldRef<"Invoice", 'Float'>
    readonly status: FieldRef<"Invoice", 'InvoiceStatus'>
    readonly paypalPaymentId: FieldRef<"Invoice", 'String'>
    readonly billingPeriodStart: FieldRef<"Invoice", 'DateTime'>
    readonly billingPeriodEnd: FieldRef<"Invoice", 'DateTime'>
    readonly details: FieldRef<"Invoice", 'Json'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice.subscription
   */
  export type Invoice$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * Invoice.usageSnapshot
   */
  export type Invoice$usageSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    where?: UsageSnapshotWhereInput
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model UsageSnapshot
   */

  export type AggregateUsageSnapshot = {
    _count: UsageSnapshotCountAggregateOutputType | null
    _avg: UsageSnapshotAvgAggregateOutputType | null
    _sum: UsageSnapshotSumAggregateOutputType | null
    _min: UsageSnapshotMinAggregateOutputType | null
    _max: UsageSnapshotMaxAggregateOutputType | null
  }

  export type UsageSnapshotAvgAggregateOutputType = {
    units: number | null
    parking: number | null
    monitors: number | null
    security: number | null
    visits: number | null
    incidents: number | null
    emergencies: number | null
  }

  export type UsageSnapshotSumAggregateOutputType = {
    units: number | null
    parking: number | null
    monitors: number | null
    security: number | null
    visits: number | null
    incidents: number | null
    emergencies: number | null
  }

  export type UsageSnapshotMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    invoiceId: string | null
    units: number | null
    parking: number | null
    monitors: number | null
    security: number | null
    visits: number | null
    incidents: number | null
    emergencies: number | null
    snapshotDate: Date | null
  }

  export type UsageSnapshotMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    invoiceId: string | null
    units: number | null
    parking: number | null
    monitors: number | null
    security: number | null
    visits: number | null
    incidents: number | null
    emergencies: number | null
    snapshotDate: Date | null
  }

  export type UsageSnapshotCountAggregateOutputType = {
    id: number
    tenantId: number
    invoiceId: number
    units: number
    parking: number
    monitors: number
    security: number
    visits: number
    incidents: number
    emergencies: number
    snapshotDate: number
    _all: number
  }


  export type UsageSnapshotAvgAggregateInputType = {
    units?: true
    parking?: true
    monitors?: true
    security?: true
    visits?: true
    incidents?: true
    emergencies?: true
  }

  export type UsageSnapshotSumAggregateInputType = {
    units?: true
    parking?: true
    monitors?: true
    security?: true
    visits?: true
    incidents?: true
    emergencies?: true
  }

  export type UsageSnapshotMinAggregateInputType = {
    id?: true
    tenantId?: true
    invoiceId?: true
    units?: true
    parking?: true
    monitors?: true
    security?: true
    visits?: true
    incidents?: true
    emergencies?: true
    snapshotDate?: true
  }

  export type UsageSnapshotMaxAggregateInputType = {
    id?: true
    tenantId?: true
    invoiceId?: true
    units?: true
    parking?: true
    monitors?: true
    security?: true
    visits?: true
    incidents?: true
    emergencies?: true
    snapshotDate?: true
  }

  export type UsageSnapshotCountAggregateInputType = {
    id?: true
    tenantId?: true
    invoiceId?: true
    units?: true
    parking?: true
    monitors?: true
    security?: true
    visits?: true
    incidents?: true
    emergencies?: true
    snapshotDate?: true
    _all?: true
  }

  export type UsageSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageSnapshot to aggregate.
     */
    where?: UsageSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageSnapshots to fetch.
     */
    orderBy?: UsageSnapshotOrderByWithRelationInput | UsageSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageSnapshots
    **/
    _count?: true | UsageSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageSnapshotMaxAggregateInputType
  }

  export type GetUsageSnapshotAggregateType<T extends UsageSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageSnapshot[P]>
      : GetScalarType<T[P], AggregateUsageSnapshot[P]>
  }




  export type UsageSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageSnapshotWhereInput
    orderBy?: UsageSnapshotOrderByWithAggregationInput | UsageSnapshotOrderByWithAggregationInput[]
    by: UsageSnapshotScalarFieldEnum[] | UsageSnapshotScalarFieldEnum
    having?: UsageSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageSnapshotCountAggregateInputType | true
    _avg?: UsageSnapshotAvgAggregateInputType
    _sum?: UsageSnapshotSumAggregateInputType
    _min?: UsageSnapshotMinAggregateInputType
    _max?: UsageSnapshotMaxAggregateInputType
  }

  export type UsageSnapshotGroupByOutputType = {
    id: string
    tenantId: string
    invoiceId: string
    units: number
    parking: number
    monitors: number
    security: number
    visits: number
    incidents: number
    emergencies: number
    snapshotDate: Date
    _count: UsageSnapshotCountAggregateOutputType | null
    _avg: UsageSnapshotAvgAggregateOutputType | null
    _sum: UsageSnapshotSumAggregateOutputType | null
    _min: UsageSnapshotMinAggregateOutputType | null
    _max: UsageSnapshotMaxAggregateOutputType | null
  }

  type GetUsageSnapshotGroupByPayload<T extends UsageSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], UsageSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type UsageSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    invoiceId?: boolean
    units?: boolean
    parking?: boolean
    monitors?: boolean
    security?: boolean
    visits?: boolean
    incidents?: boolean
    emergencies?: boolean
    snapshotDate?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageSnapshot"]>

  export type UsageSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    invoiceId?: boolean
    units?: boolean
    parking?: boolean
    monitors?: boolean
    security?: boolean
    visits?: boolean
    incidents?: boolean
    emergencies?: boolean
    snapshotDate?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageSnapshot"]>

  export type UsageSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    invoiceId?: boolean
    units?: boolean
    parking?: boolean
    monitors?: boolean
    security?: boolean
    visits?: boolean
    incidents?: boolean
    emergencies?: boolean
    snapshotDate?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageSnapshot"]>

  export type UsageSnapshotSelectScalar = {
    id?: boolean
    tenantId?: boolean
    invoiceId?: boolean
    units?: boolean
    parking?: boolean
    monitors?: boolean
    security?: boolean
    visits?: boolean
    incidents?: boolean
    emergencies?: boolean
    snapshotDate?: boolean
  }

  export type UsageSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "invoiceId" | "units" | "parking" | "monitors" | "security" | "visits" | "incidents" | "emergencies" | "snapshotDate", ExtArgs["result"]["usageSnapshot"]>
  export type UsageSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type UsageSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type UsageSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }

  export type $UsageSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageSnapshot"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      invoice: Prisma.$InvoicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      invoiceId: string
      units: number
      parking: number
      monitors: number
      security: number
      visits: number
      incidents: number
      emergencies: number
      snapshotDate: Date
    }, ExtArgs["result"]["usageSnapshot"]>
    composites: {}
  }

  type UsageSnapshotGetPayload<S extends boolean | null | undefined | UsageSnapshotDefaultArgs> = $Result.GetResult<Prisma.$UsageSnapshotPayload, S>

  type UsageSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageSnapshotCountAggregateInputType | true
    }

  export interface UsageSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageSnapshot'], meta: { name: 'UsageSnapshot' } }
    /**
     * Find zero or one UsageSnapshot that matches the filter.
     * @param {UsageSnapshotFindUniqueArgs} args - Arguments to find a UsageSnapshot
     * @example
     * // Get one UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageSnapshotFindUniqueArgs>(args: SelectSubset<T, UsageSnapshotFindUniqueArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageSnapshotFindUniqueOrThrowArgs} args - Arguments to find a UsageSnapshot
     * @example
     * // Get one UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotFindFirstArgs} args - Arguments to find a UsageSnapshot
     * @example
     * // Get one UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageSnapshotFindFirstArgs>(args?: SelectSubset<T, UsageSnapshotFindFirstArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotFindFirstOrThrowArgs} args - Arguments to find a UsageSnapshot
     * @example
     * // Get one UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageSnapshots
     * const usageSnapshots = await prisma.usageSnapshot.findMany()
     * 
     * // Get first 10 UsageSnapshots
     * const usageSnapshots = await prisma.usageSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageSnapshotWithIdOnly = await prisma.usageSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageSnapshotFindManyArgs>(args?: SelectSubset<T, UsageSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageSnapshot.
     * @param {UsageSnapshotCreateArgs} args - Arguments to create a UsageSnapshot.
     * @example
     * // Create one UsageSnapshot
     * const UsageSnapshot = await prisma.usageSnapshot.create({
     *   data: {
     *     // ... data to create a UsageSnapshot
     *   }
     * })
     * 
     */
    create<T extends UsageSnapshotCreateArgs>(args: SelectSubset<T, UsageSnapshotCreateArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageSnapshots.
     * @param {UsageSnapshotCreateManyArgs} args - Arguments to create many UsageSnapshots.
     * @example
     * // Create many UsageSnapshots
     * const usageSnapshot = await prisma.usageSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageSnapshotCreateManyArgs>(args?: SelectSubset<T, UsageSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageSnapshots and returns the data saved in the database.
     * @param {UsageSnapshotCreateManyAndReturnArgs} args - Arguments to create many UsageSnapshots.
     * @example
     * // Create many UsageSnapshots
     * const usageSnapshot = await prisma.usageSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageSnapshots and only return the `id`
     * const usageSnapshotWithIdOnly = await prisma.usageSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageSnapshot.
     * @param {UsageSnapshotDeleteArgs} args - Arguments to delete one UsageSnapshot.
     * @example
     * // Delete one UsageSnapshot
     * const UsageSnapshot = await prisma.usageSnapshot.delete({
     *   where: {
     *     // ... filter to delete one UsageSnapshot
     *   }
     * })
     * 
     */
    delete<T extends UsageSnapshotDeleteArgs>(args: SelectSubset<T, UsageSnapshotDeleteArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageSnapshot.
     * @param {UsageSnapshotUpdateArgs} args - Arguments to update one UsageSnapshot.
     * @example
     * // Update one UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageSnapshotUpdateArgs>(args: SelectSubset<T, UsageSnapshotUpdateArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageSnapshots.
     * @param {UsageSnapshotDeleteManyArgs} args - Arguments to filter UsageSnapshots to delete.
     * @example
     * // Delete a few UsageSnapshots
     * const { count } = await prisma.usageSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageSnapshotDeleteManyArgs>(args?: SelectSubset<T, UsageSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageSnapshots
     * const usageSnapshot = await prisma.usageSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageSnapshotUpdateManyArgs>(args: SelectSubset<T, UsageSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageSnapshots and returns the data updated in the database.
     * @param {UsageSnapshotUpdateManyAndReturnArgs} args - Arguments to update many UsageSnapshots.
     * @example
     * // Update many UsageSnapshots
     * const usageSnapshot = await prisma.usageSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageSnapshots and only return the `id`
     * const usageSnapshotWithIdOnly = await prisma.usageSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageSnapshot.
     * @param {UsageSnapshotUpsertArgs} args - Arguments to update or create a UsageSnapshot.
     * @example
     * // Update or create a UsageSnapshot
     * const usageSnapshot = await prisma.usageSnapshot.upsert({
     *   create: {
     *     // ... data to create a UsageSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends UsageSnapshotUpsertArgs>(args: SelectSubset<T, UsageSnapshotUpsertArgs<ExtArgs>>): Prisma__UsageSnapshotClient<$Result.GetResult<Prisma.$UsageSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotCountArgs} args - Arguments to filter UsageSnapshots to count.
     * @example
     * // Count the number of UsageSnapshots
     * const count = await prisma.usageSnapshot.count({
     *   where: {
     *     // ... the filter for the UsageSnapshots we want to count
     *   }
     * })
    **/
    count<T extends UsageSnapshotCountArgs>(
      args?: Subset<T, UsageSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageSnapshotAggregateArgs>(args: Subset<T, UsageSnapshotAggregateArgs>): Prisma.PrismaPromise<GetUsageSnapshotAggregateType<T>>

    /**
     * Group by UsageSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: UsageSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageSnapshot model
   */
  readonly fields: UsageSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageSnapshot model
   */
  interface UsageSnapshotFieldRefs {
    readonly id: FieldRef<"UsageSnapshot", 'String'>
    readonly tenantId: FieldRef<"UsageSnapshot", 'String'>
    readonly invoiceId: FieldRef<"UsageSnapshot", 'String'>
    readonly units: FieldRef<"UsageSnapshot", 'Int'>
    readonly parking: FieldRef<"UsageSnapshot", 'Int'>
    readonly monitors: FieldRef<"UsageSnapshot", 'Int'>
    readonly security: FieldRef<"UsageSnapshot", 'Int'>
    readonly visits: FieldRef<"UsageSnapshot", 'Int'>
    readonly incidents: FieldRef<"UsageSnapshot", 'Int'>
    readonly emergencies: FieldRef<"UsageSnapshot", 'Int'>
    readonly snapshotDate: FieldRef<"UsageSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageSnapshot findUnique
   */
  export type UsageSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which UsageSnapshot to fetch.
     */
    where: UsageSnapshotWhereUniqueInput
  }

  /**
   * UsageSnapshot findUniqueOrThrow
   */
  export type UsageSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which UsageSnapshot to fetch.
     */
    where: UsageSnapshotWhereUniqueInput
  }

  /**
   * UsageSnapshot findFirst
   */
  export type UsageSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which UsageSnapshot to fetch.
     */
    where?: UsageSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageSnapshots to fetch.
     */
    orderBy?: UsageSnapshotOrderByWithRelationInput | UsageSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageSnapshots.
     */
    cursor?: UsageSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageSnapshots.
     */
    distinct?: UsageSnapshotScalarFieldEnum | UsageSnapshotScalarFieldEnum[]
  }

  /**
   * UsageSnapshot findFirstOrThrow
   */
  export type UsageSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which UsageSnapshot to fetch.
     */
    where?: UsageSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageSnapshots to fetch.
     */
    orderBy?: UsageSnapshotOrderByWithRelationInput | UsageSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageSnapshots.
     */
    cursor?: UsageSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageSnapshots.
     */
    distinct?: UsageSnapshotScalarFieldEnum | UsageSnapshotScalarFieldEnum[]
  }

  /**
   * UsageSnapshot findMany
   */
  export type UsageSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which UsageSnapshots to fetch.
     */
    where?: UsageSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageSnapshots to fetch.
     */
    orderBy?: UsageSnapshotOrderByWithRelationInput | UsageSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageSnapshots.
     */
    cursor?: UsageSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageSnapshots.
     */
    skip?: number
    distinct?: UsageSnapshotScalarFieldEnum | UsageSnapshotScalarFieldEnum[]
  }

  /**
   * UsageSnapshot create
   */
  export type UsageSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageSnapshot.
     */
    data: XOR<UsageSnapshotCreateInput, UsageSnapshotUncheckedCreateInput>
  }

  /**
   * UsageSnapshot createMany
   */
  export type UsageSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageSnapshots.
     */
    data: UsageSnapshotCreateManyInput | UsageSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageSnapshot createManyAndReturn
   */
  export type UsageSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many UsageSnapshots.
     */
    data: UsageSnapshotCreateManyInput | UsageSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageSnapshot update
   */
  export type UsageSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageSnapshot.
     */
    data: XOR<UsageSnapshotUpdateInput, UsageSnapshotUncheckedUpdateInput>
    /**
     * Choose, which UsageSnapshot to update.
     */
    where: UsageSnapshotWhereUniqueInput
  }

  /**
   * UsageSnapshot updateMany
   */
  export type UsageSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageSnapshots.
     */
    data: XOR<UsageSnapshotUpdateManyMutationInput, UsageSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which UsageSnapshots to update
     */
    where?: UsageSnapshotWhereInput
    /**
     * Limit how many UsageSnapshots to update.
     */
    limit?: number
  }

  /**
   * UsageSnapshot updateManyAndReturn
   */
  export type UsageSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update UsageSnapshots.
     */
    data: XOR<UsageSnapshotUpdateManyMutationInput, UsageSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which UsageSnapshots to update
     */
    where?: UsageSnapshotWhereInput
    /**
     * Limit how many UsageSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageSnapshot upsert
   */
  export type UsageSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageSnapshot to update in case it exists.
     */
    where: UsageSnapshotWhereUniqueInput
    /**
     * In case the UsageSnapshot found by the `where` argument doesn't exist, create a new UsageSnapshot with this data.
     */
    create: XOR<UsageSnapshotCreateInput, UsageSnapshotUncheckedCreateInput>
    /**
     * In case the UsageSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageSnapshotUpdateInput, UsageSnapshotUncheckedUpdateInput>
  }

  /**
   * UsageSnapshot delete
   */
  export type UsageSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
    /**
     * Filter which UsageSnapshot to delete.
     */
    where: UsageSnapshotWhereUniqueInput
  }

  /**
   * UsageSnapshot deleteMany
   */
  export type UsageSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageSnapshots to delete
     */
    where?: UsageSnapshotWhereInput
    /**
     * Limit how many UsageSnapshots to delete.
     */
    limit?: number
  }

  /**
   * UsageSnapshot without action
   */
  export type UsageSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageSnapshot
     */
    select?: UsageSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageSnapshot
     */
    omit?: UsageSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subdomain: 'subdomain',
    dbUrl: 'dbUrl',
    plan: 'plan',
    apiKey: 'apiKey',
    logoUrl: 'logoUrl',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    location: 'location'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const PendingRegistrationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    organizationName: 'organizationName',
    location: 'location',
    plan: 'plan',
    logoUrl: 'logoUrl',
    paypalOrderId: 'paypalOrderId',
    paymentLink: 'paymentLink',
    amount: 'amount',
    status: 'status',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PendingRegistrationScalarFieldEnum = (typeof PendingRegistrationScalarFieldEnum)[keyof typeof PendingRegistrationScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    plan: 'plan',
    paypalSubscriptionId: 'paypalSubscriptionId',
    status: 'status',
    amount: 'amount',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    subscriptionId: 'subscriptionId',
    amount: 'amount',
    overageAmount: 'overageAmount',
    totalAmount: 'totalAmount',
    status: 'status',
    paypalPaymentId: 'paypalPaymentId',
    billingPeriodStart: 'billingPeriodStart',
    billingPeriodEnd: 'billingPeriodEnd',
    details: 'details',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const UsageSnapshotScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    invoiceId: 'invoiceId',
    units: 'units',
    parking: 'parking',
    monitors: 'monitors',
    security: 'security',
    visits: 'visits',
    incidents: 'incidents',
    emergencies: 'emergencies',
    snapshotDate: 'snapshotDate'
  };

  export type UsageSnapshotScalarFieldEnum = (typeof UsageSnapshotScalarFieldEnum)[keyof typeof UsageSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RegistrationStatus'
   */
  export type EnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus'>
    


  /**
   * Reference to a field of type 'RegistrationStatus[]'
   */
  export type ListEnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'InvoiceStatus'
   */
  export type EnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus'>
    


  /**
   * Reference to a field of type 'InvoiceStatus[]'
   */
  export type ListEnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    subdomain?: StringFilter<"Tenant"> | string
    dbUrl?: StringFilter<"Tenant"> | string
    plan?: StringFilter<"Tenant"> | string
    apiKey?: StringNullableFilter<"Tenant"> | string | null
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    primaryColor?: StringNullableFilter<"Tenant"> | string | null
    secondaryColor?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    isActive?: BoolFilter<"Tenant"> | boolean
    location?: StringNullableFilter<"Tenant"> | string | null
    subscriptions?: SubscriptionListRelationFilter
    invoices?: InvoiceListRelationFilter
    usageSnapshots?: UsageSnapshotListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    dbUrl?: SortOrder
    plan?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    location?: SortOrderInput | SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    invoices?: InvoiceOrderByRelationAggregateInput
    usageSnapshots?: UsageSnapshotOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    subdomain?: string
    apiKey?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    dbUrl?: StringFilter<"Tenant"> | string
    plan?: StringFilter<"Tenant"> | string
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    primaryColor?: StringNullableFilter<"Tenant"> | string | null
    secondaryColor?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    isActive?: BoolFilter<"Tenant"> | boolean
    location?: StringNullableFilter<"Tenant"> | string | null
    subscriptions?: SubscriptionListRelationFilter
    invoices?: InvoiceListRelationFilter
    usageSnapshots?: UsageSnapshotListRelationFilter
  }, "id" | "subdomain" | "apiKey">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    dbUrl?: SortOrder
    plan?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    location?: SortOrderInput | SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    subdomain?: StringWithAggregatesFilter<"Tenant"> | string
    dbUrl?: StringWithAggregatesFilter<"Tenant"> | string
    plan?: StringWithAggregatesFilter<"Tenant"> | string
    apiKey?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    secondaryColor?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Tenant"> | boolean
    location?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
  }

  export type PendingRegistrationWhereInput = {
    AND?: PendingRegistrationWhereInput | PendingRegistrationWhereInput[]
    OR?: PendingRegistrationWhereInput[]
    NOT?: PendingRegistrationWhereInput | PendingRegistrationWhereInput[]
    id?: StringFilter<"PendingRegistration"> | string
    name?: StringFilter<"PendingRegistration"> | string
    email?: StringFilter<"PendingRegistration"> | string
    passwordHash?: StringFilter<"PendingRegistration"> | string
    organizationName?: StringFilter<"PendingRegistration"> | string
    location?: StringNullableFilter<"PendingRegistration"> | string | null
    plan?: StringFilter<"PendingRegistration"> | string
    logoUrl?: StringNullableFilter<"PendingRegistration"> | string | null
    paypalOrderId?: StringNullableFilter<"PendingRegistration"> | string | null
    paymentLink?: StringNullableFilter<"PendingRegistration"> | string | null
    amount?: FloatFilter<"PendingRegistration"> | number
    status?: EnumRegistrationStatusFilter<"PendingRegistration"> | $Enums.RegistrationStatus
    expiresAt?: DateTimeFilter<"PendingRegistration"> | Date | string
    createdAt?: DateTimeFilter<"PendingRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PendingRegistration"> | Date | string
  }

  export type PendingRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    organizationName?: SortOrder
    location?: SortOrderInput | SortOrder
    plan?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    paypalOrderId?: SortOrderInput | SortOrder
    paymentLink?: SortOrderInput | SortOrder
    amount?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paypalOrderId?: string
    AND?: PendingRegistrationWhereInput | PendingRegistrationWhereInput[]
    OR?: PendingRegistrationWhereInput[]
    NOT?: PendingRegistrationWhereInput | PendingRegistrationWhereInput[]
    name?: StringFilter<"PendingRegistration"> | string
    email?: StringFilter<"PendingRegistration"> | string
    passwordHash?: StringFilter<"PendingRegistration"> | string
    organizationName?: StringFilter<"PendingRegistration"> | string
    location?: StringNullableFilter<"PendingRegistration"> | string | null
    plan?: StringFilter<"PendingRegistration"> | string
    logoUrl?: StringNullableFilter<"PendingRegistration"> | string | null
    paymentLink?: StringNullableFilter<"PendingRegistration"> | string | null
    amount?: FloatFilter<"PendingRegistration"> | number
    status?: EnumRegistrationStatusFilter<"PendingRegistration"> | $Enums.RegistrationStatus
    expiresAt?: DateTimeFilter<"PendingRegistration"> | Date | string
    createdAt?: DateTimeFilter<"PendingRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PendingRegistration"> | Date | string
  }, "id" | "paypalOrderId">

  export type PendingRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    organizationName?: SortOrder
    location?: SortOrderInput | SortOrder
    plan?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    paypalOrderId?: SortOrderInput | SortOrder
    paymentLink?: SortOrderInput | SortOrder
    amount?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PendingRegistrationCountOrderByAggregateInput
    _avg?: PendingRegistrationAvgOrderByAggregateInput
    _max?: PendingRegistrationMaxOrderByAggregateInput
    _min?: PendingRegistrationMinOrderByAggregateInput
    _sum?: PendingRegistrationSumOrderByAggregateInput
  }

  export type PendingRegistrationScalarWhereWithAggregatesInput = {
    AND?: PendingRegistrationScalarWhereWithAggregatesInput | PendingRegistrationScalarWhereWithAggregatesInput[]
    OR?: PendingRegistrationScalarWhereWithAggregatesInput[]
    NOT?: PendingRegistrationScalarWhereWithAggregatesInput | PendingRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PendingRegistration"> | string
    name?: StringWithAggregatesFilter<"PendingRegistration"> | string
    email?: StringWithAggregatesFilter<"PendingRegistration"> | string
    passwordHash?: StringWithAggregatesFilter<"PendingRegistration"> | string
    organizationName?: StringWithAggregatesFilter<"PendingRegistration"> | string
    location?: StringNullableWithAggregatesFilter<"PendingRegistration"> | string | null
    plan?: StringWithAggregatesFilter<"PendingRegistration"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"PendingRegistration"> | string | null
    paypalOrderId?: StringNullableWithAggregatesFilter<"PendingRegistration"> | string | null
    paymentLink?: StringNullableWithAggregatesFilter<"PendingRegistration"> | string | null
    amount?: FloatWithAggregatesFilter<"PendingRegistration"> | number
    status?: EnumRegistrationStatusWithAggregatesFilter<"PendingRegistration"> | $Enums.RegistrationStatus
    expiresAt?: DateTimeWithAggregatesFilter<"PendingRegistration"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PendingRegistration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PendingRegistration"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    tenantId?: StringFilter<"Subscription"> | string
    plan?: StringFilter<"Subscription"> | string
    paypalSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    amount?: FloatFilter<"Subscription"> | number
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    invoices?: InvoiceListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    plan?: SortOrder
    paypalSubscriptionId?: SortOrderInput | SortOrder
    status?: SortOrder
    amount?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    invoices?: InvoiceOrderByRelationAggregateInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paypalSubscriptionId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    tenantId?: StringFilter<"Subscription"> | string
    plan?: StringFilter<"Subscription"> | string
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    amount?: FloatFilter<"Subscription"> | number
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    invoices?: InvoiceListRelationFilter
  }, "id" | "paypalSubscriptionId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    plan?: SortOrder
    paypalSubscriptionId?: SortOrderInput | SortOrder
    status?: SortOrder
    amount?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    tenantId?: StringWithAggregatesFilter<"Subscription"> | string
    plan?: StringWithAggregatesFilter<"Subscription"> | string
    paypalSubscriptionId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    amount?: FloatWithAggregatesFilter<"Subscription"> | number
    currentPeriodStart?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    tenantId?: StringFilter<"Invoice"> | string
    subscriptionId?: StringNullableFilter<"Invoice"> | string | null
    amount?: FloatFilter<"Invoice"> | number
    overageAmount?: FloatFilter<"Invoice"> | number
    totalAmount?: FloatFilter<"Invoice"> | number
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    paypalPaymentId?: StringNullableFilter<"Invoice"> | string | null
    billingPeriodStart?: DateTimeFilter<"Invoice"> | Date | string
    billingPeriodEnd?: DateTimeFilter<"Invoice"> | Date | string
    details?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    usageSnapshot?: XOR<UsageSnapshotNullableScalarRelationFilter, UsageSnapshotWhereInput> | null
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
    status?: SortOrder
    paypalPaymentId?: SortOrderInput | SortOrder
    billingPeriodStart?: SortOrder
    billingPeriodEnd?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    subscription?: SubscriptionOrderByWithRelationInput
    usageSnapshot?: UsageSnapshotOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    tenantId?: StringFilter<"Invoice"> | string
    subscriptionId?: StringNullableFilter<"Invoice"> | string | null
    amount?: FloatFilter<"Invoice"> | number
    overageAmount?: FloatFilter<"Invoice"> | number
    totalAmount?: FloatFilter<"Invoice"> | number
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    paypalPaymentId?: StringNullableFilter<"Invoice"> | string | null
    billingPeriodStart?: DateTimeFilter<"Invoice"> | Date | string
    billingPeriodEnd?: DateTimeFilter<"Invoice"> | Date | string
    details?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    usageSnapshot?: XOR<UsageSnapshotNullableScalarRelationFilter, UsageSnapshotWhereInput> | null
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
    status?: SortOrder
    paypalPaymentId?: SortOrderInput | SortOrder
    billingPeriodStart?: SortOrder
    billingPeriodEnd?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    tenantId?: StringWithAggregatesFilter<"Invoice"> | string
    subscriptionId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    amount?: FloatWithAggregatesFilter<"Invoice"> | number
    overageAmount?: FloatWithAggregatesFilter<"Invoice"> | number
    totalAmount?: FloatWithAggregatesFilter<"Invoice"> | number
    status?: EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus
    paypalPaymentId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    billingPeriodStart?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    billingPeriodEnd?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    details?: JsonNullableWithAggregatesFilter<"Invoice">
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type UsageSnapshotWhereInput = {
    AND?: UsageSnapshotWhereInput | UsageSnapshotWhereInput[]
    OR?: UsageSnapshotWhereInput[]
    NOT?: UsageSnapshotWhereInput | UsageSnapshotWhereInput[]
    id?: StringFilter<"UsageSnapshot"> | string
    tenantId?: StringFilter<"UsageSnapshot"> | string
    invoiceId?: StringFilter<"UsageSnapshot"> | string
    units?: IntFilter<"UsageSnapshot"> | number
    parking?: IntFilter<"UsageSnapshot"> | number
    monitors?: IntFilter<"UsageSnapshot"> | number
    security?: IntFilter<"UsageSnapshot"> | number
    visits?: IntFilter<"UsageSnapshot"> | number
    incidents?: IntFilter<"UsageSnapshot"> | number
    emergencies?: IntFilter<"UsageSnapshot"> | number
    snapshotDate?: DateTimeFilter<"UsageSnapshot"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }

  export type UsageSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    invoiceId?: SortOrder
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
    snapshotDate?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    invoice?: InvoiceOrderByWithRelationInput
  }

  export type UsageSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceId?: string
    AND?: UsageSnapshotWhereInput | UsageSnapshotWhereInput[]
    OR?: UsageSnapshotWhereInput[]
    NOT?: UsageSnapshotWhereInput | UsageSnapshotWhereInput[]
    tenantId?: StringFilter<"UsageSnapshot"> | string
    units?: IntFilter<"UsageSnapshot"> | number
    parking?: IntFilter<"UsageSnapshot"> | number
    monitors?: IntFilter<"UsageSnapshot"> | number
    security?: IntFilter<"UsageSnapshot"> | number
    visits?: IntFilter<"UsageSnapshot"> | number
    incidents?: IntFilter<"UsageSnapshot"> | number
    emergencies?: IntFilter<"UsageSnapshot"> | number
    snapshotDate?: DateTimeFilter<"UsageSnapshot"> | Date | string
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
  }, "id" | "invoiceId">

  export type UsageSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    invoiceId?: SortOrder
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
    snapshotDate?: SortOrder
    _count?: UsageSnapshotCountOrderByAggregateInput
    _avg?: UsageSnapshotAvgOrderByAggregateInput
    _max?: UsageSnapshotMaxOrderByAggregateInput
    _min?: UsageSnapshotMinOrderByAggregateInput
    _sum?: UsageSnapshotSumOrderByAggregateInput
  }

  export type UsageSnapshotScalarWhereWithAggregatesInput = {
    AND?: UsageSnapshotScalarWhereWithAggregatesInput | UsageSnapshotScalarWhereWithAggregatesInput[]
    OR?: UsageSnapshotScalarWhereWithAggregatesInput[]
    NOT?: UsageSnapshotScalarWhereWithAggregatesInput | UsageSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageSnapshot"> | string
    tenantId?: StringWithAggregatesFilter<"UsageSnapshot"> | string
    invoiceId?: StringWithAggregatesFilter<"UsageSnapshot"> | string
    units?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    parking?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    monitors?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    security?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    visits?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    incidents?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    emergencies?: IntWithAggregatesFilter<"UsageSnapshot"> | number
    snapshotDate?: DateTimeWithAggregatesFilter<"UsageSnapshot"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutTenantInput
    invoices?: InvoiceCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutTenantInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUpdateManyWithoutTenantNestedInput
    invoices?: InvoiceUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutTenantNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PendingRegistrationCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    organizationName: string
    location?: string | null
    plan?: string
    logoUrl?: string | null
    paypalOrderId?: string | null
    paymentLink?: string | null
    amount?: number
    status?: $Enums.RegistrationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingRegistrationUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    organizationName: string
    location?: string | null
    plan?: string
    logoUrl?: string | null
    paypalOrderId?: string | null
    paymentLink?: string | null
    amount?: number
    status?: $Enums.RegistrationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paypalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLink?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paypalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLink?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingRegistrationCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    organizationName: string
    location?: string | null
    plan?: string
    logoUrl?: string | null
    paypalOrderId?: string | null
    paymentLink?: string | null
    amount?: number
    status?: $Enums.RegistrationStatus
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paypalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLink?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    organizationName?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paypalOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLink?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSubscriptionsInput
    invoices?: InvoiceCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    tenantId: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSubscriptionsNestedInput
    invoices?: InvoiceUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    tenantId: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutInvoicesInput
    subscription?: SubscriptionCreateNestedOneWithoutInvoicesInput
    usageSnapshot?: UsageSnapshotCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    tenantId: string
    subscriptionId?: string | null
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    usageSnapshot?: UsageSnapshotUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutInvoicesNestedInput
    subscription?: SubscriptionUpdateOneWithoutInvoicesNestedInput
    usageSnapshot?: UsageSnapshotUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageSnapshot?: UsageSnapshotUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id?: string
    tenantId: string
    subscriptionId?: string | null
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotCreateInput = {
    id?: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
    tenant: TenantCreateNestedOneWithoutUsageSnapshotsInput
    invoice: InvoiceCreateNestedOneWithoutUsageSnapshotInput
  }

  export type UsageSnapshotUncheckedCreateInput = {
    id?: string
    tenantId: string
    invoiceId: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
  }

  export type UsageSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsageSnapshotsNestedInput
    invoice?: InvoiceUpdateOneRequiredWithoutUsageSnapshotNestedInput
  }

  export type UsageSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotCreateManyInput = {
    id?: string
    tenantId: string
    invoiceId: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
  }

  export type UsageSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type UsageSnapshotListRelationFilter = {
    every?: UsageSnapshotWhereInput
    some?: UsageSnapshotWhereInput
    none?: UsageSnapshotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    dbUrl?: SortOrder
    plan?: SortOrder
    apiKey?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    location?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    dbUrl?: SortOrder
    plan?: SortOrder
    apiKey?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    location?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    dbUrl?: SortOrder
    plan?: SortOrder
    apiKey?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    location?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type PendingRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    organizationName?: SortOrder
    location?: SortOrder
    plan?: SortOrder
    logoUrl?: SortOrder
    paypalOrderId?: SortOrder
    paymentLink?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingRegistrationAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PendingRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    organizationName?: SortOrder
    location?: SortOrder
    plan?: SortOrder
    logoUrl?: SortOrder
    paypalOrderId?: SortOrder
    paymentLink?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    organizationName?: SortOrder
    location?: SortOrder
    plan?: SortOrder
    logoUrl?: SortOrder
    paypalOrderId?: SortOrder
    paymentLink?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingRegistrationSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    plan?: SortOrder
    paypalSubscriptionId?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    plan?: SortOrder
    paypalSubscriptionId?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    plan?: SortOrder
    paypalSubscriptionId?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type EnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type UsageSnapshotNullableScalarRelationFilter = {
    is?: UsageSnapshotWhereInput | null
    isNot?: UsageSnapshotWhereInput | null
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
    status?: SortOrder
    paypalPaymentId?: SortOrder
    billingPeriodStart?: SortOrder
    billingPeriodEnd?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
    status?: SortOrder
    paypalPaymentId?: SortOrder
    billingPeriodStart?: SortOrder
    billingPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
    status?: SortOrder
    paypalPaymentId?: SortOrder
    billingPeriodStart?: SortOrder
    billingPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    amount?: SortOrder
    overageAmount?: SortOrder
    totalAmount?: SortOrder
  }

  export type EnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InvoiceScalarRelationFilter = {
    is?: InvoiceWhereInput
    isNot?: InvoiceWhereInput
  }

  export type UsageSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    invoiceId?: SortOrder
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
    snapshotDate?: SortOrder
  }

  export type UsageSnapshotAvgOrderByAggregateInput = {
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
  }

  export type UsageSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    invoiceId?: SortOrder
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
    snapshotDate?: SortOrder
  }

  export type UsageSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    invoiceId?: SortOrder
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
    snapshotDate?: SortOrder
  }

  export type UsageSnapshotSumOrderByAggregateInput = {
    units?: SortOrder
    parking?: SortOrder
    monitors?: SortOrder
    security?: SortOrder
    visits?: SortOrder
    incidents?: SortOrder
    emergencies?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SubscriptionCreateNestedManyWithoutTenantInput = {
    create?: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput> | SubscriptionCreateWithoutTenantInput[] | SubscriptionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTenantInput | SubscriptionCreateOrConnectWithoutTenantInput[]
    createMany?: SubscriptionCreateManyTenantInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutTenantInput = {
    create?: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput> | InvoiceCreateWithoutTenantInput[] | InvoiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutTenantInput | InvoiceCreateOrConnectWithoutTenantInput[]
    createMany?: InvoiceCreateManyTenantInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type UsageSnapshotCreateNestedManyWithoutTenantInput = {
    create?: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput> | UsageSnapshotCreateWithoutTenantInput[] | UsageSnapshotUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutTenantInput | UsageSnapshotCreateOrConnectWithoutTenantInput[]
    createMany?: UsageSnapshotCreateManyTenantInputEnvelope
    connect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput> | SubscriptionCreateWithoutTenantInput[] | SubscriptionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTenantInput | SubscriptionCreateOrConnectWithoutTenantInput[]
    createMany?: SubscriptionCreateManyTenantInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput> | InvoiceCreateWithoutTenantInput[] | InvoiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutTenantInput | InvoiceCreateOrConnectWithoutTenantInput[]
    createMany?: InvoiceCreateManyTenantInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type UsageSnapshotUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput> | UsageSnapshotCreateWithoutTenantInput[] | UsageSnapshotUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutTenantInput | UsageSnapshotCreateOrConnectWithoutTenantInput[]
    createMany?: UsageSnapshotCreateManyTenantInputEnvelope
    connect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SubscriptionUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput> | SubscriptionCreateWithoutTenantInput[] | SubscriptionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTenantInput | SubscriptionCreateOrConnectWithoutTenantInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutTenantInput | SubscriptionUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SubscriptionCreateManyTenantInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutTenantInput | SubscriptionUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutTenantInput | SubscriptionUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutTenantNestedInput = {
    create?: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput> | InvoiceCreateWithoutTenantInput[] | InvoiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutTenantInput | InvoiceCreateOrConnectWithoutTenantInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutTenantInput | InvoiceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: InvoiceCreateManyTenantInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutTenantInput | InvoiceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutTenantInput | InvoiceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type UsageSnapshotUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput> | UsageSnapshotCreateWithoutTenantInput[] | UsageSnapshotUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutTenantInput | UsageSnapshotCreateOrConnectWithoutTenantInput[]
    upsert?: UsageSnapshotUpsertWithWhereUniqueWithoutTenantInput | UsageSnapshotUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UsageSnapshotCreateManyTenantInputEnvelope
    set?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    disconnect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    delete?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    connect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    update?: UsageSnapshotUpdateWithWhereUniqueWithoutTenantInput | UsageSnapshotUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UsageSnapshotUpdateManyWithWhereWithoutTenantInput | UsageSnapshotUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UsageSnapshotScalarWhereInput | UsageSnapshotScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput> | SubscriptionCreateWithoutTenantInput[] | SubscriptionUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutTenantInput | SubscriptionCreateOrConnectWithoutTenantInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutTenantInput | SubscriptionUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: SubscriptionCreateManyTenantInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutTenantInput | SubscriptionUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutTenantInput | SubscriptionUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput> | InvoiceCreateWithoutTenantInput[] | InvoiceUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutTenantInput | InvoiceCreateOrConnectWithoutTenantInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutTenantInput | InvoiceUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: InvoiceCreateManyTenantInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutTenantInput | InvoiceUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutTenantInput | InvoiceUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type UsageSnapshotUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput> | UsageSnapshotCreateWithoutTenantInput[] | UsageSnapshotUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutTenantInput | UsageSnapshotCreateOrConnectWithoutTenantInput[]
    upsert?: UsageSnapshotUpsertWithWhereUniqueWithoutTenantInput | UsageSnapshotUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: UsageSnapshotCreateManyTenantInputEnvelope
    set?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    disconnect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    delete?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    connect?: UsageSnapshotWhereUniqueInput | UsageSnapshotWhereUniqueInput[]
    update?: UsageSnapshotUpdateWithWhereUniqueWithoutTenantInput | UsageSnapshotUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: UsageSnapshotUpdateManyWithWhereWithoutTenantInput | UsageSnapshotUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: UsageSnapshotScalarWhereInput | UsageSnapshotScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRegistrationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationStatus
  }

  export type TenantCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<TenantCreateWithoutSubscriptionsInput, TenantUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSubscriptionsInput
    connect?: TenantWhereUniqueInput
  }

  export type InvoiceCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput> | InvoiceCreateWithoutSubscriptionInput[] | InvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSubscriptionInput | InvoiceCreateOrConnectWithoutSubscriptionInput[]
    createMany?: InvoiceCreateManySubscriptionInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput> | InvoiceCreateWithoutSubscriptionInput[] | InvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSubscriptionInput | InvoiceCreateOrConnectWithoutSubscriptionInput[]
    createMany?: InvoiceCreateManySubscriptionInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type TenantUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<TenantCreateWithoutSubscriptionsInput, TenantUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSubscriptionsInput
    upsert?: TenantUpsertWithoutSubscriptionsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutSubscriptionsInput, TenantUpdateWithoutSubscriptionsInput>, TenantUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type InvoiceUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput> | InvoiceCreateWithoutSubscriptionInput[] | InvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSubscriptionInput | InvoiceCreateOrConnectWithoutSubscriptionInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | InvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: InvoiceCreateManySubscriptionInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | InvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutSubscriptionInput | InvoiceUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput> | InvoiceCreateWithoutSubscriptionInput[] | InvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutSubscriptionInput | InvoiceCreateOrConnectWithoutSubscriptionInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | InvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: InvoiceCreateManySubscriptionInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | InvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutSubscriptionInput | InvoiceUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<TenantCreateWithoutInvoicesInput, TenantUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutInvoicesInput
    connect?: TenantWhereUniqueInput
  }

  export type SubscriptionCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<SubscriptionCreateWithoutInvoicesInput, SubscriptionUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutInvoicesInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UsageSnapshotCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutInvoiceInput
    connect?: UsageSnapshotWhereUniqueInput
  }

  export type UsageSnapshotUncheckedCreateNestedOneWithoutInvoiceInput = {
    create?: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutInvoiceInput
    connect?: UsageSnapshotWhereUniqueInput
  }

  export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus
  }

  export type TenantUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<TenantCreateWithoutInvoicesInput, TenantUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutInvoicesInput
    upsert?: TenantUpsertWithoutInvoicesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutInvoicesInput, TenantUpdateWithoutInvoicesInput>, TenantUncheckedUpdateWithoutInvoicesInput>
  }

  export type SubscriptionUpdateOneWithoutInvoicesNestedInput = {
    create?: XOR<SubscriptionCreateWithoutInvoicesInput, SubscriptionUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutInvoicesInput
    upsert?: SubscriptionUpsertWithoutInvoicesInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutInvoicesInput, SubscriptionUpdateWithoutInvoicesInput>, SubscriptionUncheckedUpdateWithoutInvoicesInput>
  }

  export type UsageSnapshotUpdateOneWithoutInvoiceNestedInput = {
    create?: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutInvoiceInput
    upsert?: UsageSnapshotUpsertWithoutInvoiceInput
    disconnect?: UsageSnapshotWhereInput | boolean
    delete?: UsageSnapshotWhereInput | boolean
    connect?: UsageSnapshotWhereUniqueInput
    update?: XOR<XOR<UsageSnapshotUpdateToOneWithWhereWithoutInvoiceInput, UsageSnapshotUpdateWithoutInvoiceInput>, UsageSnapshotUncheckedUpdateWithoutInvoiceInput>
  }

  export type UsageSnapshotUncheckedUpdateOneWithoutInvoiceNestedInput = {
    create?: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
    connectOrCreate?: UsageSnapshotCreateOrConnectWithoutInvoiceInput
    upsert?: UsageSnapshotUpsertWithoutInvoiceInput
    disconnect?: UsageSnapshotWhereInput | boolean
    delete?: UsageSnapshotWhereInput | boolean
    connect?: UsageSnapshotWhereUniqueInput
    update?: XOR<XOR<UsageSnapshotUpdateToOneWithWhereWithoutInvoiceInput, UsageSnapshotUpdateWithoutInvoiceInput>, UsageSnapshotUncheckedUpdateWithoutInvoiceInput>
  }

  export type TenantCreateNestedOneWithoutUsageSnapshotsInput = {
    create?: XOR<TenantCreateWithoutUsageSnapshotsInput, TenantUncheckedCreateWithoutUsageSnapshotsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsageSnapshotsInput
    connect?: TenantWhereUniqueInput
  }

  export type InvoiceCreateNestedOneWithoutUsageSnapshotInput = {
    create?: XOR<InvoiceCreateWithoutUsageSnapshotInput, InvoiceUncheckedCreateWithoutUsageSnapshotInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutUsageSnapshotInput
    connect?: InvoiceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TenantUpdateOneRequiredWithoutUsageSnapshotsNestedInput = {
    create?: XOR<TenantCreateWithoutUsageSnapshotsInput, TenantUncheckedCreateWithoutUsageSnapshotsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutUsageSnapshotsInput
    upsert?: TenantUpsertWithoutUsageSnapshotsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutUsageSnapshotsInput, TenantUpdateWithoutUsageSnapshotsInput>, TenantUncheckedUpdateWithoutUsageSnapshotsInput>
  }

  export type InvoiceUpdateOneRequiredWithoutUsageSnapshotNestedInput = {
    create?: XOR<InvoiceCreateWithoutUsageSnapshotInput, InvoiceUncheckedCreateWithoutUsageSnapshotInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutUsageSnapshotInput
    upsert?: InvoiceUpsertWithoutUsageSnapshotInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutUsageSnapshotInput, InvoiceUpdateWithoutUsageSnapshotInput>, InvoiceUncheckedUpdateWithoutUsageSnapshotInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedEnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SubscriptionCreateWithoutTenantInput = {
    id?: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutTenantInput = {
    id?: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutTenantInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput>
  }

  export type SubscriptionCreateManyTenantInputEnvelope = {
    data: SubscriptionCreateManyTenantInput | SubscriptionCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutTenantInput = {
    id?: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutInvoicesInput
    usageSnapshot?: UsageSnapshotCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutTenantInput = {
    id?: string
    subscriptionId?: string | null
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    usageSnapshot?: UsageSnapshotUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutTenantInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput>
  }

  export type InvoiceCreateManyTenantInputEnvelope = {
    data: InvoiceCreateManyTenantInput | InvoiceCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type UsageSnapshotCreateWithoutTenantInput = {
    id?: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
    invoice: InvoiceCreateNestedOneWithoutUsageSnapshotInput
  }

  export type UsageSnapshotUncheckedCreateWithoutTenantInput = {
    id?: string
    invoiceId: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
  }

  export type UsageSnapshotCreateOrConnectWithoutTenantInput = {
    where: UsageSnapshotWhereUniqueInput
    create: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput>
  }

  export type UsageSnapshotCreateManyTenantInputEnvelope = {
    data: UsageSnapshotCreateManyTenantInput | UsageSnapshotCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutTenantInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutTenantInput, SubscriptionUncheckedUpdateWithoutTenantInput>
    create: XOR<SubscriptionCreateWithoutTenantInput, SubscriptionUncheckedCreateWithoutTenantInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutTenantInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutTenantInput, SubscriptionUncheckedUpdateWithoutTenantInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutTenantInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutTenantInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    tenantId?: StringFilter<"Subscription"> | string
    plan?: StringFilter<"Subscription"> | string
    paypalSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    amount?: FloatFilter<"Subscription"> | number
    currentPeriodStart?: DateTimeFilter<"Subscription"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"Subscription"> | Date | string
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type InvoiceUpsertWithWhereUniqueWithoutTenantInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutTenantInput, InvoiceUncheckedUpdateWithoutTenantInput>
    create: XOR<InvoiceCreateWithoutTenantInput, InvoiceUncheckedCreateWithoutTenantInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutTenantInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutTenantInput, InvoiceUncheckedUpdateWithoutTenantInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutTenantInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutTenantInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    tenantId?: StringFilter<"Invoice"> | string
    subscriptionId?: StringNullableFilter<"Invoice"> | string | null
    amount?: FloatFilter<"Invoice"> | number
    overageAmount?: FloatFilter<"Invoice"> | number
    totalAmount?: FloatFilter<"Invoice"> | number
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    paypalPaymentId?: StringNullableFilter<"Invoice"> | string | null
    billingPeriodStart?: DateTimeFilter<"Invoice"> | Date | string
    billingPeriodEnd?: DateTimeFilter<"Invoice"> | Date | string
    details?: JsonNullableFilter<"Invoice">
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type UsageSnapshotUpsertWithWhereUniqueWithoutTenantInput = {
    where: UsageSnapshotWhereUniqueInput
    update: XOR<UsageSnapshotUpdateWithoutTenantInput, UsageSnapshotUncheckedUpdateWithoutTenantInput>
    create: XOR<UsageSnapshotCreateWithoutTenantInput, UsageSnapshotUncheckedCreateWithoutTenantInput>
  }

  export type UsageSnapshotUpdateWithWhereUniqueWithoutTenantInput = {
    where: UsageSnapshotWhereUniqueInput
    data: XOR<UsageSnapshotUpdateWithoutTenantInput, UsageSnapshotUncheckedUpdateWithoutTenantInput>
  }

  export type UsageSnapshotUpdateManyWithWhereWithoutTenantInput = {
    where: UsageSnapshotScalarWhereInput
    data: XOR<UsageSnapshotUpdateManyMutationInput, UsageSnapshotUncheckedUpdateManyWithoutTenantInput>
  }

  export type UsageSnapshotScalarWhereInput = {
    AND?: UsageSnapshotScalarWhereInput | UsageSnapshotScalarWhereInput[]
    OR?: UsageSnapshotScalarWhereInput[]
    NOT?: UsageSnapshotScalarWhereInput | UsageSnapshotScalarWhereInput[]
    id?: StringFilter<"UsageSnapshot"> | string
    tenantId?: StringFilter<"UsageSnapshot"> | string
    invoiceId?: StringFilter<"UsageSnapshot"> | string
    units?: IntFilter<"UsageSnapshot"> | number
    parking?: IntFilter<"UsageSnapshot"> | number
    monitors?: IntFilter<"UsageSnapshot"> | number
    security?: IntFilter<"UsageSnapshot"> | number
    visits?: IntFilter<"UsageSnapshot"> | number
    incidents?: IntFilter<"UsageSnapshot"> | number
    emergencies?: IntFilter<"UsageSnapshot"> | number
    snapshotDate?: DateTimeFilter<"UsageSnapshot"> | Date | string
  }

  export type TenantCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    invoices?: InvoiceCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    invoices?: InvoiceUncheckedCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutSubscriptionsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutSubscriptionsInput, TenantUncheckedCreateWithoutSubscriptionsInput>
  }

  export type InvoiceCreateWithoutSubscriptionInput = {
    id?: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutInvoicesInput
    usageSnapshot?: UsageSnapshotCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    tenantId: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    usageSnapshot?: UsageSnapshotUncheckedCreateNestedOneWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutSubscriptionInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput>
  }

  export type InvoiceCreateManySubscriptionInputEnvelope = {
    data: InvoiceCreateManySubscriptionInput | InvoiceCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutSubscriptionsInput = {
    update: XOR<TenantUpdateWithoutSubscriptionsInput, TenantUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<TenantCreateWithoutSubscriptionsInput, TenantUncheckedCreateWithoutSubscriptionsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutSubscriptionsInput, TenantUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type TenantUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    invoices?: InvoiceUncheckedUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type InvoiceUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutSubscriptionInput, InvoiceUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<InvoiceCreateWithoutSubscriptionInput, InvoiceUncheckedCreateWithoutSubscriptionInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutSubscriptionInput, InvoiceUncheckedUpdateWithoutSubscriptionInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutSubscriptionInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type TenantCreateWithoutInvoicesInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutInvoicesInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutTenantInput
    usageSnapshots?: UsageSnapshotUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutInvoicesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutInvoicesInput, TenantUncheckedCreateWithoutInvoicesInput>
  }

  export type SubscriptionCreateWithoutInvoicesInput = {
    id?: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateWithoutInvoicesInput = {
    id?: string
    tenantId: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutInvoicesInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutInvoicesInput, SubscriptionUncheckedCreateWithoutInvoicesInput>
  }

  export type UsageSnapshotCreateWithoutInvoiceInput = {
    id?: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
    tenant: TenantCreateNestedOneWithoutUsageSnapshotsInput
  }

  export type UsageSnapshotUncheckedCreateWithoutInvoiceInput = {
    id?: string
    tenantId: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
  }

  export type UsageSnapshotCreateOrConnectWithoutInvoiceInput = {
    where: UsageSnapshotWhereUniqueInput
    create: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
  }

  export type TenantUpsertWithoutInvoicesInput = {
    update: XOR<TenantUpdateWithoutInvoicesInput, TenantUncheckedUpdateWithoutInvoicesInput>
    create: XOR<TenantCreateWithoutInvoicesInput, TenantUncheckedCreateWithoutInvoicesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutInvoicesInput, TenantUncheckedUpdateWithoutInvoicesInput>
  }

  export type TenantUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutTenantNestedInput
    usageSnapshots?: UsageSnapshotUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type SubscriptionUpsertWithoutInvoicesInput = {
    update: XOR<SubscriptionUpdateWithoutInvoicesInput, SubscriptionUncheckedUpdateWithoutInvoicesInput>
    create: XOR<SubscriptionCreateWithoutInvoicesInput, SubscriptionUncheckedCreateWithoutInvoicesInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutInvoicesInput, SubscriptionUncheckedUpdateWithoutInvoicesInput>
  }

  export type SubscriptionUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotUpsertWithoutInvoiceInput = {
    update: XOR<UsageSnapshotUpdateWithoutInvoiceInput, UsageSnapshotUncheckedUpdateWithoutInvoiceInput>
    create: XOR<UsageSnapshotCreateWithoutInvoiceInput, UsageSnapshotUncheckedCreateWithoutInvoiceInput>
    where?: UsageSnapshotWhereInput
  }

  export type UsageSnapshotUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: UsageSnapshotWhereInput
    data: XOR<UsageSnapshotUpdateWithoutInvoiceInput, UsageSnapshotUncheckedUpdateWithoutInvoiceInput>
  }

  export type UsageSnapshotUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutUsageSnapshotsNestedInput
  }

  export type UsageSnapshotUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantCreateWithoutUsageSnapshotsInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutTenantInput
    invoices?: InvoiceCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutUsageSnapshotsInput = {
    id?: string
    name: string
    subdomain: string
    dbUrl: string
    plan?: string
    apiKey?: string | null
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    location?: string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutTenantInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutUsageSnapshotsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutUsageSnapshotsInput, TenantUncheckedCreateWithoutUsageSnapshotsInput>
  }

  export type InvoiceCreateWithoutUsageSnapshotInput = {
    id?: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutInvoicesInput
    subscription?: SubscriptionCreateNestedOneWithoutInvoicesInput
  }

  export type InvoiceUncheckedCreateWithoutUsageSnapshotInput = {
    id?: string
    tenantId: string
    subscriptionId?: string | null
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutUsageSnapshotInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutUsageSnapshotInput, InvoiceUncheckedCreateWithoutUsageSnapshotInput>
  }

  export type TenantUpsertWithoutUsageSnapshotsInput = {
    update: XOR<TenantUpdateWithoutUsageSnapshotsInput, TenantUncheckedUpdateWithoutUsageSnapshotsInput>
    create: XOR<TenantCreateWithoutUsageSnapshotsInput, TenantUncheckedCreateWithoutUsageSnapshotsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutUsageSnapshotsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutUsageSnapshotsInput, TenantUncheckedUpdateWithoutUsageSnapshotsInput>
  }

  export type TenantUpdateWithoutUsageSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUpdateManyWithoutTenantNestedInput
    invoices?: InvoiceUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutUsageSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: StringFieldUpdateOperationsInput | string
    dbUrl?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    location?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutTenantNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type InvoiceUpsertWithoutUsageSnapshotInput = {
    update: XOR<InvoiceUpdateWithoutUsageSnapshotInput, InvoiceUncheckedUpdateWithoutUsageSnapshotInput>
    create: XOR<InvoiceCreateWithoutUsageSnapshotInput, InvoiceUncheckedCreateWithoutUsageSnapshotInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutUsageSnapshotInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutUsageSnapshotInput, InvoiceUncheckedUpdateWithoutUsageSnapshotInput>
  }

  export type InvoiceUpdateWithoutUsageSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutInvoicesNestedInput
    subscription?: SubscriptionUpdateOneWithoutInvoicesNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutUsageSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyTenantInput = {
    id?: string
    plan: string
    paypalSubscriptionId?: string | null
    status?: $Enums.SubscriptionStatus
    amount: number
    currentPeriodStart: Date | string
    currentPeriodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateManyTenantInput = {
    id?: string
    subscriptionId?: string | null
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageSnapshotCreateManyTenantInput = {
    id?: string
    invoiceId: string
    units?: number
    parking?: number
    monitors?: number
    security?: number
    visits?: number
    incidents?: number
    emergencies?: number
    snapshotDate?: Date | string
  }

  export type SubscriptionUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    paypalSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    amount?: FloatFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutInvoicesNestedInput
    usageSnapshot?: UsageSnapshotUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageSnapshot?: UsageSnapshotUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutUsageSnapshotNestedInput
  }

  export type UsageSnapshotUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageSnapshotUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: StringFieldUpdateOperationsInput | string
    units?: IntFieldUpdateOperationsInput | number
    parking?: IntFieldUpdateOperationsInput | number
    monitors?: IntFieldUpdateOperationsInput | number
    security?: IntFieldUpdateOperationsInput | number
    visits?: IntFieldUpdateOperationsInput | number
    incidents?: IntFieldUpdateOperationsInput | number
    emergencies?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManySubscriptionInput = {
    id?: string
    tenantId: string
    amount: number
    overageAmount?: number
    totalAmount: number
    status?: $Enums.InvoiceStatus
    paypalPaymentId?: string | null
    billingPeriodStart: Date | string
    billingPeriodEnd: Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutInvoicesNestedInput
    usageSnapshot?: UsageSnapshotUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageSnapshot?: UsageSnapshotUncheckedUpdateOneWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    overageAmount?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    paypalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    billingPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}