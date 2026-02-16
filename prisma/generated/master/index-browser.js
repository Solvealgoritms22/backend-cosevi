
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  role: 'role',
  isActive: 'isActive',
  idNumber: 'idNumber',
  phone: 'phone',
  dateOfBirth: 'dateOfBirth',
  profileImage: 'profileImage',
  pushNotificationsEnabled: 'pushNotificationsEnabled',
  pushToken: 'pushToken',
  qrSecret: 'qrSecret',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResidentProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  unitNumber: 'unitNumber',
  phoneNumber: 'phoneNumber'
};

exports.Prisma.SecurityProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  checkpointId: 'checkpointId'
};

exports.Prisma.VehicleScalarFieldEnum = {
  id: 'id',
  licensePlate: 'licensePlate',
  residentProfileId: 'residentProfileId',
  model: 'model',
  color: 'color'
};

exports.Prisma.VisitorScalarFieldEnum = {
  id: 'id',
  idNumber: 'idNumber',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VisitScalarFieldEnum = {
  id: 'id',
  hostId: 'hostId',
  visitorId: 'visitorId',
  visitorName: 'visitorName',
  visitorIdNumber: 'visitorIdNumber',
  licensePlate: 'licensePlate',
  companionCount: 'companionCount',
  isVip: 'isVip',
  singleEntry: 'singleEntry',
  manualEntry: 'manualEntry',
  visitorCategory: 'visitorCategory',
  images: 'images',
  status: 'status',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  entryTime: 'entryTime',
  exitTime: 'exitTime',
  qrCode: 'qrCode',
  accessCode: 'accessCode',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  spaceId: 'spaceId'
};

exports.Prisma.IncidentReportScalarFieldEnum = {
  id: 'id',
  type: 'type',
  description: 'description',
  location: 'location',
  reporterId: 'reporterId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmergencyAlertScalarFieldEnum = {
  id: 'id',
  type: 'type',
  senderId: 'senderId',
  location: 'location',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.SpaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  status: 'status',
  level: 'level',
  vehicleId: 'vehicleId',
  residentProfileId: 'residentProfileId',
  visitId: 'visitId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccessLogScalarFieldEnum = {
  id: 'id',
  visitId: 'visitId',
  plate: 'plate',
  checkpoint: 'checkpoint',
  direction: 'direction',
  timestamp: 'timestamp',
  snapshotUrl: 'snapshotUrl'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  message: 'message',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.IncidentCommentScalarFieldEnum = {
  id: 'id',
  text: 'text',
  incidentReportId: 'incidentReportId',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HardwareDeviceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  location: 'location',
  status: 'status',
  lastSeen: 'lastSeen',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HardwareEventScalarFieldEnum = {
  id: 'id',
  deviceId: 'deviceId',
  type: 'type',
  data: 'data',
  timestamp: 'timestamp'
};

exports.Prisma.IotCommandScalarFieldEnum = {
  id: 'id',
  deviceId: 'deviceId',
  command: 'command',
  payload: 'payload',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  subdomain: 'subdomain',
  dbUrl: 'dbUrl',
  plan: 'plan',
  apiKey: 'apiKey',
  logoUrl: 'logoUrl',
  adminEmail: 'adminEmail',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isActive: 'isActive',
  location: 'location'
};

exports.Prisma.PendingRegistrationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  organizationName: 'organizationName',
  location: 'location',
  plan: 'plan',
  logoUrl: 'logoUrl',
  paypalOrderId: 'paypalOrderId',
  paypalSubscriptionId: 'paypalSubscriptionId',
  paymentLink: 'paymentLink',
  amount: 'amount',
  status: 'status',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
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

exports.Prisma.InvoiceScalarFieldEnum = {
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

exports.Prisma.UsageSnapshotScalarFieldEnum = {
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

exports.Prisma.GlobalUserMapScalarFieldEnum = {
  email: 'email',
  tenantId: 'tenantId',
  role: 'role'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  RESIDENT: 'RESIDENT',
  SECURITY: 'SECURITY'
};

exports.VisitorCategory = exports.$Enums.VisitorCategory = {
  FAMILIAR: 'FAMILIAR',
  CONTRATISTA: 'CONTRATISTA',
  EMPLEADO: 'EMPLEADO',
  OTRO: 'OTRO'
};

exports.VisitStatus = exports.$Enums.VisitStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  DENIED: 'DENIED',
  EXPIRED: 'EXPIRED'
};

exports.SpaceStatus = exports.$Enums.SpaceStatus = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  RESERVED: 'RESERVED',
  MAINTENANCE: 'MAINTENANCE'
};

exports.RegistrationStatus = exports.$Enums.RegistrationStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELLED: 'CANCELLED',
  PAUSED: 'PAUSED'
};

exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  URGENTE: 'URGENTE'
};

exports.Prisma.ModelName = {
  User: 'User',
  ResidentProfile: 'ResidentProfile',
  SecurityProfile: 'SecurityProfile',
  Vehicle: 'Vehicle',
  Visitor: 'Visitor',
  Visit: 'Visit',
  IncidentReport: 'IncidentReport',
  EmergencyAlert: 'EmergencyAlert',
  Space: 'Space',
  AccessLog: 'AccessLog',
  Notification: 'Notification',
  IncidentComment: 'IncidentComment',
  HardwareDevice: 'HardwareDevice',
  HardwareEvent: 'HardwareEvent',
  IotCommand: 'IotCommand',
  Tenant: 'Tenant',
  PendingRegistration: 'PendingRegistration',
  Subscription: 'Subscription',
  Invoice: 'Invoice',
  UsageSnapshot: 'UsageSnapshot',
  GlobalUserMap: 'GlobalUserMap'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
