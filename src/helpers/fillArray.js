import { removeDuplicates } from "./removeDuplicates";

export function fillArray(arr, reserve, amount) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }

  if (result.length < amount)
    return removeDuplicates([...result, ...reserve], amount);
  else if (result.length > amount) result.splice(amount);

  return result;
}
