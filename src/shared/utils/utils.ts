export function arrayToMap<T>(array: T[], getKey: (elem: T) => string) {
  return array.reduce<Map<string, T>>((map, item) => {
    map.set(getKey(item), item);
    return map;
  }, new Map());
}
