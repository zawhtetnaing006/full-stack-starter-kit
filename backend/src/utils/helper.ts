export function decodeJson(payload: string) {
  if (typeof payload === 'string') {
    const decodedPayload = JSON.parse(payload);
    if (typeof decodedPayload !== 'object') {
      throw new Error('Invalid payload');
    }
    return decodedPayload;
  } else {
    throw new Error('Invalid payload');
  }
}
