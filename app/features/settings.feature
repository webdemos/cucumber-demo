@settings @only
Feature: Settings: Change plan type and choose different currencies
  In order to see different plans with different currencies
  As a user I can choose at the first time when login or later to click setting icon

  Background:
    Given I go to ACAT's home page
    And there will be a welcome popup
    When I close the popup
    And it will check whether I have access permission

  Scenario: choose a plan type and currency when the first time load page
    When I have permission
    Then there will be a popup to let me assign model
    When I choose to display the model view with one of the below plans:
       # TODO: separate this table to an external file
      | PlanId | PlanName |
      | LDR    | Leader   |
      | EMP    | Employee |
    And even countries if I choose "Employee" plan:
      | CountryCode | CountryName |
      | DE          | Germany     |
      | ES          | Spain       |
      | HK          | Hong Kong   |
      | IE          | Ireland     |
      | NG          | Nigeria     |
      | SG          | Singapore   |
      | US          | USA         |
    And currencies:
      | CurrencyCode | DisplayName |
      | USD          | USD         |
      | AED          | AED         |
      | AOA          | AOA         |
      | ARS          | ARS         |
      | AUD          | AUD         |
      | BOB          | BOB         |
      | BRL          | BRL         |
      | BWP          | BWP         |
      | CAD          | CAD         |
      | CHF          | CHF         |
      | CLP          | CLP         |
      | CNY          | CNY         |
      | COP          | COP         |
      | CZK          | CZK         |
      | DKK          | DKK         |
      | EUR          | EUR         |
      | GBP          | GBP         |
      | HKD          | HKD         |
      | HUF          | HUF         |
      | IDR          | IDR         |
      | ILS          | ILS         |
      | INR          | INR         |
      | JPY          | JPY         |
      | KES          | KES         |
      | KRW          | KRW         |
      | LVL          | LVL         |
      | MAD          | MAD         |
      | MUR          | MUR         |
      | MXN          | MXN         |
      | MYR          | MYR         |
      | NGN          | NGN         |
      | NOK          | NOK         |
      | NZD          | NZD         |
      | PEN          | PEN         |
      | PHP          | PHP         |
      | PLN          | PLN         |
      | RON          | RON         |
      | RUB          | RUB         |
      | SAR          | SAR         |
      | SEK          | SEK         |
      | SGD          | SGD         |
      | THB          | THB         |
      | TRY          | TRY         |
      | TWD          | TWD         |
      | VEF          | VEF         |
      | VND          | VND         |
      | ZAR          | ZAR         |
    And submit my selection
    Then the model view will be displayed as I assigned

  Scenario: change plan type by click setting icon
    When I have permission
    And already choose a plan type
    But I want to move to a different plan
    When I click the setting icon at the up right corner
    Then there will be a popup to let me assign model
    When I choose to display the model view with one of the below plans:
      # TODO: separate this table to an external file
      | PlanId | PlanName |
      | LDR    | Leader   |
      | EMP    | Employee |
    And even countries if I choose "Employee" plan:
      | CountryCode | CountryName |
      | DE          | Germany     |
      | ES          | Spain       |
      | HK          | Hong Kong   |
      | IE          | Ireland     |
      | NG          | Nigeria     |
      | SG          | Singapore   |
      | US          | USA         |
    And currencies:
      | CurrencyCode | DisplayName |
      | USD          | USD         |
      | AED          | AED         |
      | AOA          | AOA         |
      | ARS          | ARS         |
      | AUD          | AUD         |
      | BOB          | BOB         |
      | BRL          | BRL         |
      | BWP          | BWP         |
      | CAD          | CAD         |
      | CHF          | CHF         |
      | CLP          | CLP         |
      | CNY          | CNY         |
      | COP          | COP         |
      | CZK          | CZK         |
      | DKK          | DKK         |
      | EUR          | EUR         |
      | GBP          | GBP         |
      | HKD          | HKD         |
      | HUF          | HUF         |
      | IDR          | IDR         |
      | ILS          | ILS         |
      | INR          | INR         |
      | JPY          | JPY         |
      | KES          | KES         |
      | KRW          | KRW         |
      | LVL          | LVL         |
      | MAD          | MAD         |
      | MUR          | MUR         |
      | MXN          | MXN         |
      | MYR          | MYR         |
      | NGN          | NGN         |
      | NOK          | NOK         |
      | NZD          | NZD         |
      | PEN          | PEN         |
      | PHP          | PHP         |
      | PLN          | PLN         |
      | RON          | RON         |
      | RUB          | RUB         |
      | SAR          | SAR         |
      | SEK          | SEK         |
      | SGD          | SGD         |
      | THB          | THB         |
      | TRY          | TRY         |
      | TWD          | TWD         |
      | VEF          | VEF         |
      | VND          | VND         |
      | ZAR          | ZAR         |
    And submit my selection
    Then the model view will be displayed as I assigned

  Scenario: don't have access permission
    When I don't have access permission
    Then there will be alert popup
    And freeze the page
