@ignore
Feature: Elimina solamente la reserva creada por el escenario
  Scenario:
    Given url baseUrl
    And path 'booking', bookingId
    And cookie token = token
    When method delete
    Then status 201
    Given path 'booking', bookingId
    When method get
    Then status 404
