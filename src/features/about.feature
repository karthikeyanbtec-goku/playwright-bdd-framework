Feature: About Page Navigation

  @about
  Scenario: Navigate to the About page from the sidebar
    Given I am logged in as "standard_user"
    When I open the sidebar menu
    And I click on the "About" link
    Then I should be navigated to the "saucelabs.com" website
