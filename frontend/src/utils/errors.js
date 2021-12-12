export class ApiError extends Error {
  constructor( data) {
    console.log(data)
    const { error, message, ...restOfData } = data

    if (error) {
      super(error)
    } else if (message) {
      super(message)
    } else {
      super('Unknown error')
    }


    this.name = 'api-error'
    this.data = restOfData
  }
}