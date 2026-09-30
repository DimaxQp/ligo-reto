Feature: Reservas aisladas, contrato y persistencia

  Background:
    * url baseUrl
    * header Accept = 'application/json'
    * def schema = read('classpath:schemas/booking.json')
    * def auth = call read('classpath:helpers/auth.feature')
    * def token = auth.token
    * def bookingId = null
    * def deleted = false
    * configure afterScenario =
      """
      function() {
        var id = karate.get('bookingId');
        if (id && !karate.get('deleted')) {
          karate.call('classpath:helpers/cleanup.feature', { bookingId: id, token: karate.get('token') });
        }
      }
      """
    * def booking = newBooking(125, true)
    Given path 'booking'
    And request booking
    When method post
    * def bookingId = response.bookingid
    Then status 200
    And match response == { bookingid: '#number', booking: '#(schema)' }
    And assert bookingId > 0 && bookingId % 1 == 0
    And match response.booking == booking
    And match header Content-Type contains 'application/json'

  @smoke
  Scenario: API-01 ciclo crear consultar actualizar parcial y total eliminar
    Given path 'booking', bookingId
    When method get
    Then status 200
    And match response == schema
    And match response == booking
    And match header Content-Type contains 'application/json'

    * copy replacement = booking
    * set replacement.lastname = 'Updated'
    * set replacement.totalprice = 220
    * set replacement.depositpaid = false
    Given path 'booking', bookingId
    And cookie token = token
    And request replacement
    When method put
    Then status 200
    And match response == replacement
    Given path 'booking', bookingId
    When method get
    Then status 200
    And match response == schema
    And match response == replacement

    Given path 'booking', bookingId
    And cookie token = token
    And request { additionalneeds: 'Dinner' }
    When method patch
    Then status 200
    * set replacement.additionalneeds = 'Dinner'
    And match response == replacement
    Given path 'booking', bookingId
    When method get
    Then status 200
    And match response == replacement

    Given path 'booking', bookingId
    And cookie token = token
    When method delete
    Then status 201
    * def deleted = true
    Given path 'booking', bookingId
    When method get
    Then status 404

  @smoke
  Scenario Outline: API-02 rechaza <operation> sin autenticación sin alterar reserva
    Given path 'booking', bookingId
    And request { firstname: 'Unauthorized', lastname: 'Unauthorized', totalprice: 1, depositpaid: false, bookingdates: { checkin: '2027-01-10', checkout: '2027-01-12' } }
    When method <operation>
    Then status 403
    And match response == 'Forbidden'
    Given path 'booking', bookingId
    When method get
    Then status 200
    And match response == booking
    Examples:
      | operation |
      | put       |
      | patch     |
      | delete    |

  @regression
  Scenario: API-03 token inválido no permite eliminar
    Given path 'booking', bookingId
    And cookie token = 'invalid-token'
    When method delete
    Then status 403
    Given path 'booking', bookingId
    When method get
    Then status 200
    And match response == booking

  @regression
  Scenario: API-04 búsqueda por nombre devuelve la reserva propia
    Given path 'booking'
    And params { firstname: '#(booking.firstname)', lastname: '#(booking.lastname)' }
    When method get
    Then status 200
    And match each response == { bookingid: '#number' }
    And match response contains { bookingid: '#(bookingId)' }
