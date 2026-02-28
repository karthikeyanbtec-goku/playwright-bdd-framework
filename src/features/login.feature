@smoke @login
Feature: User Authentication

  Background:
    Given I navigate to the application login page

  @positive
  Scenario: Successful login with valid credentials
    When I login as a "standard_user"
    Then I should be navigated to the inventory page
    
  @negative
  Scenario Outline: Unsuccessful login with invalid credentials
    When I login with username "<username>" and password "<password>"
    Then I should see an error message "<errorMessage>"

    Examples:
      | username        | password     | errorMessage                                                              |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
      | invalid_user    | invalid_pass | Epic sadface: Username and password do not match any user in this service |
