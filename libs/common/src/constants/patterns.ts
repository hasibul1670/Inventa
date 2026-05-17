export const PATTERNS = {
  AUTH_REGISTER: 'auth.register',
  AUTH_LOGIN: 'auth.login',
  AUTH_VALIDATE: 'auth.validate',

  USER_CREATE: 'user.create',
  USER_FIND_ALL: 'user.findAll',
  USER_FIND_BY_ID: 'user.findById',
  USER_FIND_BY_EMAIL: 'user.findByEmail',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',

  CUSTOMER_CREATE: 'customer.create',
  CUSTOMER_FIND_ALL: 'customer.findAll',
  CUSTOMER_FIND_BY_ID: 'customer.findById',
  CUSTOMER_UPDATE: 'customer.update',
  CUSTOMER_DELETE: 'customer.delete',

  SUPPLIER_CREATE: 'supplier.create',
  SUPPLIER_FIND_ALL: 'supplier.findAll',
  SUPPLIER_FIND_BY_ID: 'supplier.findById',
  SUPPLIER_UPDATE: 'supplier.update',
  SUPPLIER_DELETE: 'supplier.delete',

  PRODUCT_CREATE: 'product.create',
  PRODUCT_FIND_ALL: 'product.findAll',
  PRODUCT_FIND_BY_ID: 'product.findById',
  PRODUCT_UPDATE: 'product.update',
  PRODUCT_DELETE: 'product.delete',

  WAREHOUSE_CREATE: 'warehouse.create',
  WAREHOUSE_FIND_ALL: 'warehouse.findAll',
  WAREHOUSE_FIND_BY_ID: 'warehouse.findById',
  WAREHOUSE_UPDATE: 'warehouse.update',
  WAREHOUSE_DELETE: 'warehouse.delete',

  STOCK_MOVEMENT_CREATE: 'stockMovement.create',
  STOCK_MOVEMENT_FIND_ALL: 'stockMovement.findAll',

  SALE_CREATE: 'sale.create',
  SALE_FIND_ALL: 'sale.findAll',
  SALE_FIND_BY_ID: 'sale.findById',

  INVOICE_CREATE: 'invoice.create',
  INVOICE_FIND_ALL: 'invoice.findAll',
  INVOICE_FIND_BY_ID: 'invoice.findById',

  PAYMENT_CREATE: 'payment.create',
  PAYMENT_FIND_ALL: 'payment.findAll',
} as const;
