export function response(response: any, message?: string) {
  return { ok: !!response, message, response };
}
