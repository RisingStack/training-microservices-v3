'use strict'

const processType = process.env.PROCESS_TYPE

switch (processType) {
  case 'web':
    require('./web')
    break
  case 'script':
    require('./migrate')
    break
  default:
    throw new Error(
      `Invalid process type: ${processType}. It should be one of: 'web', 'script'.`
    )
}
