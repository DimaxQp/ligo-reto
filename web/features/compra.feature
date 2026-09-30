# language: es
@regression
Característica: Compra en SauceDemo
  Como comprador quiero conservar mis productos e importes hasta confirmar el pedido.

  Antecedentes:
    Dado que estoy en la página de acceso

  @smoke @WEB-01
  Esquema del escenario: WEB-01 Comprar dos productos con importes correctos
    Dado que ingreso con la cuenta "estándar"
    Cuando agrego los productos:
      | producto    |
      | <producto1> |
      | <producto2> |
    Y abro el carrito
    Entonces el carrito contiene:
      | producto    | cantidad |
      | <producto1> | 1        |
      | <producto2> | 1        |
    Cuando inicio el checkout
    Y envío los datos válidos de entrega
    Entonces el resumen contiene los productos:
      | producto    |
      | <producto1> |
      | <producto2> |
    Y los importes del resumen corresponden a los productos seleccionados
    Cuando confirmo la compra
    Entonces recibo la confirmación del pedido

    Ejemplos:
      | producto1 | producto2 |
      | backpack  | bikeLight |

  @WEB-04
  Esquema del escenario: <id> Un campo obligatorio vacío impide avanzar
    Dado que ingreso con la cuenta "estándar"
    Y agrego el producto "backpack"
    Y abro el carrito
    Y inicio el checkout
    Cuando envío los datos de entrega sin "<campo>"
    Entonces veo el error de campo obligatorio "<campo>"
    Y permanezco en el formulario de entrega

    Ejemplos:
      | id      | campo      |
      | WEB-04a | firstName  |
      | WEB-04b | lastName   |
      | WEB-04c | postalCode |

  @WEB-05
  Esquema del escenario: WEB-05 Quitar un producto recalcula el importe
    Dado que ingreso con la cuenta "estándar"
    Y agrego los productos:
      | producto    |
      | <eliminado> |
      | <restante>  |
    Y abro el carrito
    Cuando elimino el producto "<eliminado>"
    Entonces el carrito contiene:
      | producto   | cantidad |
      | <restante> | 1        |
    Cuando inicio el checkout
    Y envío los datos válidos de entrega
    Entonces los importes del resumen corresponden a los productos seleccionados

    Ejemplos:
      | eliminado | restante  |
      | backpack  | bikeLight |

  @WEB-06
  Esquema del escenario: WEB-06 Cancelar checkout conserva la selección
    Dado que ingreso con la cuenta "estándar"
    Y agrego el producto "<producto>"
    Y abro el carrito
    Y inicio el checkout
    Cuando cancelo el checkout
    Entonces regreso al carrito
    Y el carrito contiene:
      | producto   | cantidad |
      | <producto> | 1        |

    Ejemplos:
      | producto |
      | backpack |
