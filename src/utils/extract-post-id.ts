// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractField<T = any>(
  formData: FormData,
  field: string
): T | null {
  try {
    // procura alguma chave que comece com "$ACTION_" e termine em ":1"
    const actionKey = Array.from(formData.keys()).find(
      (k) => k.startsWith("$ACTION_") && k.endsWith(":1")
    );

    if (!actionKey) return null;

    // pega o valor bruto e parseia
    const raw = formData.get(actionKey) as string;
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed[0]?.valuesFormState?.[field] ?? null;
  } catch (err) {
    console.error("Erro ao extrair campo:", err);
    return null;
  }
}
