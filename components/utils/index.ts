export const isObject = (item): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const isArray = (item): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return item && typeof item === 'object' && Array.isArray(item);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObjectToMerge = Record<string, any>;
type ExtraObjectToMerge = ObjectToMerge | undefined;

export const deepMerge = (
  targetObject: ObjectToMerge,
  ...moreObjects: ExtraObjectToMerge[]
) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  mergeObjects(targetObject, ...moreObjects);

const mergeObjects = (
  targetObject: ObjectToMerge,
  ...moreObjects: ExtraObjectToMerge[]
) => {
  if (!moreObjects.length) return targetObject;
  const source = moreObjects.shift();
  if (isObject(targetObject) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!targetObject[key])
          Object.assign(targetObject, {
            [key]: {},
          });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        mergeObjects(targetObject[key], source[key]);
      } else {
        Object.assign(targetObject, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          [key]: source[key],
        });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return mergeObjects(targetObject, ...moreObjects);
};
