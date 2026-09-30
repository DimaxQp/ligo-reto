Feature: Precio y depósito conservan su valor al persistir
  Background:
    * url baseUrl
    * def auth = call read('classpath:helpers/auth.feature')
    * def token = auth.token
    * def bookingId = null
    * configure afterScenario =
      """
      function() {
        var id = karate.get('bookingId');
        if (id) karate.call('classpath:helpers/cleanup.feature', { bookingId: id, token: karate.get('token') });
      }
      """
  @regression
  Scenario Outline: API-06 persistencia precio <price> y depósito <paid>
    * def booking = newBooking(<price>, <paid>)
    Given path 'booking'
    And request booking
    When method post
    * def bookingId = response.bookingid
    Then status 200
    And match response.booking == booking
    Given path 'booking', bookingId
    And header Accept = 'application/json'
    When method get
    Then status 200
    And match response == read('classpath:schemas/booking.json')
    And match response == booking
    Examples:
      | price | paid  |
      | 0     | false |
      | 1     | true  |
