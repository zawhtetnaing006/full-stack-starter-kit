export class GatewayError {
  constructor(
    public message: string = 'Something went wrong!',
    public details?: Array<string>,
    public status: string = 'error',
    public data = null,
    public timestamp: string = new Date().toISOString(),
  ) {}
}
