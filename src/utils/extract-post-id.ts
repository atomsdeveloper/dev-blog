export function extractId(formData: FormData): string | null {
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key === "$ACTION_1:1") {
      try {
        const parsedValueForArrayObject = JSON.parse(value as string);

        if (parsedValueForArrayObject?.id) return parsedValueForArrayObject.id;

        if (
          Array.isArray(parsedValueForArrayObject) &&
          parsedValueForArrayObject[0]?.valuesFormState?.id
        ) {
          return parsedValueForArrayObject[0].valuesFormState.id;
        }
      } catch (e: unknown) {
        throw new Error(String(e));
      }
    }
  }
  return null;
}
