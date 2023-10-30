export function formatToPrisma<Type>(
  jsonObject: any,
  _Type: Type[]
): Type[] | undefined {
  const _jsonObjectProperties = Object.keys(jsonObject as any[]);
  const _typeProperties = Object.keys(_Type);
  console.log("==========formatToPrisma=======>",jsonObject,_Type)
  type o = Record<any, any>;
  for (const j of _jsonObjectProperties) {
    //form a object with the properties
    //you are looping over
    for (const t of _typeProperties) {
      if (j === t) {
        const p: o = {
          t: j,
        };
        const q = <Type>p;
        _Type.push(q);
      }
    }
  }

  return _Type;
}


