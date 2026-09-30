@ignore
Feature: Token de la cuenta demo
  Scenario:
    Given url baseUrl
    And path 'auth'
    And request { username: '#(username)', password: '#(password)' }
    When method post
    Then status 200
    And match response == { token: '#string' }
    And assert response.token.length > 0
    * def token = response.token
