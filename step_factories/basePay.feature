@frontend @basePay @only
Feature: Base pay update

  Background: Goto to base pay
    Given I goto base pay grid
  
  Scenario: Green upper arrow
    When I change editable cells with the number that up starting point
    Then the indicator should be an upper green arrow
    And the comment's background color should be yellow
    And the graph bar will also be changed

  Scenario: Red lower arrow
    When I change editable cells with the number that below starting point
    Then the indicator should be a lower red arrow
    And the comment's background color should be yellow
    And the graph bar will also be changed

  Scenario: Gray lodash
    When I change editable cells with the number that equal starting point
    Then the indicator should be a gray lodash
    And the comment's background color should be yellow
    And the graph bar will also be changed

  Scenario: Comment in red
    When there is no value assigned to comment
    Then the comment flag's background will be red

  Scenario: Comment in yellow
    When I change some editable cells
    Then comment should be in yellow

  Scenario: Comment in normal
    When I change some editable cells
    Then comment should be in yellow
    When I assign a value to the comment
    And save my changes
    Then the comment will be as normal





