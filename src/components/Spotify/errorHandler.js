export const errorHandler = error => {
  const { message, reason, status } = error ? error : {}
  switch (reason) {
    case 'NO_ACTIVE_DEVICE':
      return `Please connect device 'Ampor' in spotify`
    default:
      return `Please contact admin. Message: ${message}`
  }
}
