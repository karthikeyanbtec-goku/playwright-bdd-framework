@checkout
Feature: Checkout Flow

  Background:
    Given I log in to the application as "standard_user"
    And I add product "backpack" to the cart
    And I navigate to the cart page
    And I proceed to checkout

  @positive @e2e
  Scenario: Successfully complete an order
    When I fill in the shipping details for "valid" user
    And I finish the checkout process
    Then I should see the order complete message

  @negative
  Scenario: Attempt checkout without postal code
    When I fill in the shipping details for "invalid" user
    And I click continue checkout
    Then I should see a checkout error message "missingPostalCode"
