@inventory
Feature: Inventory Management

  Background:
    Given I log in to the application as "standard_user"
    And I am on the inventory page

  @positive
  Scenario: Add a single item to the cart
    When I add product "backpack" to the cart
    Then the shopping cart badge should display "1"

  @positive
  Scenario: Add multiple items and remove one
    When I add product "bikeLight" to the cart
    And I add product "fleeceJacket" to the cart
    Then the shopping cart badge should display "2"
    When I remove product "bikeLight" from the cart
    Then the shopping cart badge should display "1"

  @positive @sorting
  Scenario Outline: Sort products by various criteria
    When I sort the products by "<sortCriteria>"
    Then the products should be sorted appropriately

    Examples:
      | sortCriteria        |
      | Name (Z to A)       |
      | Price (low to high) |
