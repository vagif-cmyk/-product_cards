export function removeDuplicates(arr, amount) {
  const table = {};
  const res = arr
    .filter(({ id }) => !table[id] && (table[id] = 1))
    .filter((_, index) => index < amount);
  return res;
}