@ui @basket
Feature: Shopping Basket
  As a customer
  I want to manage items in my basket
  So that I can review my order before checkout

  Background:
    Given I am logged in as a standard user
    And my basket is empty

  @smoke @regression
  Scenario: Add a single item to basket and verify details
    When I view the "Sauce Labs Backpack" product details
    And I check the product name and price
    And I add the product to the basket
    Then the basket should show 1 item
    When I open the basket
    Then I should see the product with the same name and price