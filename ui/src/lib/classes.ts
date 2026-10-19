export function cx(...parties: Array<string | false | null | undefined>): string {
  return parties.filter(Boolean).join(' ')
}
