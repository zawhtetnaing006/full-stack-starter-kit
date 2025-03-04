export class GatewaySuccessResponse {
  constructor(
    public readonly data: any,
    public readonly status: string = 'success',
    public readonly message: string = '',
    public readonly timestamp: string = new Date().toISOString(),
  ) {}
}
