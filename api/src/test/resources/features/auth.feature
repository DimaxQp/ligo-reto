Feature: Autenticación negativa
  @regression
  Scenario: API-05 credenciales inválidas no devuelven token
    Given url baseUrl
    And path 'auth'
    And request { username: 'admin', password: 'wrong-password' }
    When method post
    Then status 200
    And match header Content-Type contains 'application/json'
    And match response == { reason: 'Bad credentials' }
