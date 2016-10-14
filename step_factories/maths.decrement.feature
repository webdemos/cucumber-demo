@frontend
Feature: Simple maths: decrement
  In order to do maths
  As a developer
  I want to decrement variables

  @easy
  Scenario: easy maths decrement
    Given a variable set to 3
    When I decrement the variable by 1
    Then the variable should contain 2

  @complex
  Scenario Outline: much more complex stuff
    Given a variable set to <var>
    When I decrement the variable by <decrement>
    Then the variable should contain <result>

    Examples:
      | var  | decrement | result |
      |  105 |         5 |    100 |
      | 1333 |      1234 |     99 |
      |   12 |         5 |     18 |