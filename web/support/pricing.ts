export interface SelectedItem {
  name: string;
  unitPriceCents: number;
  quantity: number;
}

// USD con dos decimales; rechazar formatos inesperados en lugar de convertirlos a cero.
export function parsePrice(text: string): number {
  const match = /^\$(\d+)\.(\d{2})$/.exec(text.trim());
  if (!match) throw new Error(`Precio USD inválido: ${text}`);
  const cents = Number(match[1]) * 100 + Number(match[2]);
  if (!Number.isSafeInteger(cents)) throw new Error('Precio fuera del rango seguro');
  return cents;
}

export function calculateTotals(items: SelectedItem[], taxBasisPoints: number) {
  if (!items.length) throw new Error('No hay productos seleccionados para validar los importes');
  const subtotal = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  // Regla de negocio: redondeo del impuesto sobre el subtotal a un centavo.
  const tax = Math.round(subtotal * taxBasisPoints / 10_000);
  return { subtotal, tax, total: subtotal + tax };
}

