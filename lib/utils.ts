export function maybeBooleanToNumber(boolean?: boolean) {
  if (typeof boolean === "undefined") return;
  return boolean ? 1 : 0;
}
