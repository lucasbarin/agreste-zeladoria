/**
 * Formata texto para Title Case (primeira letra de cada palavra em maiúscula)
 * Evita que usuários digitem tudo em CAIXA ALTA
 */
export function toTitleCase(text: string): string {
  if (!text) return text;
  
  // Palavras que devem permanecer em minúscula (preposições e artigos)
  const lowercase = ['da', 'de', 'do', 'das', 'dos', 'e', 'a', 'o', 'as', 'os'];
  
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Primeira palavra sempre com maiúscula
      if (index === 0 || !lowercase.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(' ');
}

/**
 * Formata texto mantendo siglas e números
 */
export function formatName(text: string): string {
  if (!text) return text;
  return toTitleCase(text.trim());
}

/**
 * Formata endereço (rua, número, complemento)
 */
export function formatAddress(text: string): string {
  if (!text) return text;
  return toTitleCase(text.trim());
}
