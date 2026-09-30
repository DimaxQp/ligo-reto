# language: es
@regression
Característica: Control de acceso
  Antecedentes:
    Dado que estoy en la página de acceso

  @smoke @WEB-02
  Esquema del escenario: WEB-02 Rechazar cuenta bloqueada
    Cuando ingreso con la cuenta "<cuenta>"
    Entonces se rechaza el acceso por "<motivo>"

    Ejemplos:
      | cuenta    | motivo  |
      | bloqueada | bloqueo |

  @WEB-03
  Esquema del escenario: WEB-03 Rechazar contraseña incorrecta
    Cuando ingreso con la cuenta "<cuenta>"
    Entonces se rechaza el acceso por "<motivo>"

    Ejemplos:
      | cuenta                | motivo                 |
      | contraseña incorrecta | credenciales inválidas |

