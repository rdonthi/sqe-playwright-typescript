Feature: Petstore API - Pet Management
  As an API consumer
  I want to manage pets in the store
  So that I can test CRUD operations

  Background:
    Given I have API access to Petstore

  @api @smoke @positive
  Scenario: Create a new pet successfully
    When I create a pet with name "Buddy" and status "available"
    Then the response status should be 200
    And the pet should have id, name "Buddy", and status "available"

  @api @negative
Scenario: Attempt to create pet with empty name
  Given I have API access to Petstore
  When I create a pet with empty name
  Then the response status should be 200
  And the pet should be created with empty name

  @api
  Scenario Outline: Find pets by status
    When I search for pets with status "<status>"
    Then the response status should be 200
    And all returned pets should have status "<status>"

    Examples:
      | status    |
      | available |
      | pending   |
      | sold      |