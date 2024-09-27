export default function isEnumValue<T>(enumType: T, value: any): value is T {
    return Object.values(enumType).includes(value);
  }