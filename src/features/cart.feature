Feature: Shopping Cart Functionality

  @cart
  Scenario: Add multiple items to the cart
    Given I am logged in as "standard_user"
    And I am on the inventory page
    When I add product "backpack" to the cart
    And I add product "bike-light" to the cart
    Then the shopping cart badge should display "2"

  @cart
  Scenario: Remove item from cart from the cart page
    Given I am logged in as "standard_user"
    And I add product "backpack" to the cart
    And I navigate to the cart page
    When I remove the product "backpack" from the cart page
    Then the shopping cart badge should display ""
