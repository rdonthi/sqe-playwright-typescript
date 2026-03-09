Feature: Sauce Demo Login
  As a user
  I want to log in to the sauce demo site
  So that I can access the inventory

  @ui @smoke @positive
  Scenario Outline: Successful login with all valid users
    Given I am on the Sauce Demo login page
    When I login as user "<userType>"
    Then I should be redirected to the inventory page
    And the inventory page should be displayed

    Examples:
      | userType           |
      | STANDARD           |
      | PROBLEM            |
      | PERFORMANCE_GLITCH |
      | ERROR              |
      | VISUAL             |

  @ui @negative
  Scenario: Login with locked out user
    Given I am on the Sauce Demo login page
    When I login as user "LOCKED_OUT"
    Then I should see error "LOCKED_OUT"

  @ui @negative
  Scenario Outline: Login with invalid credentials
    Given I am on the Sauce Demo login page
    When I login with invalid credentials "<invalidType>"
    Then I should see error "<errorKey>"

    Examples:
      | invalidType       | errorKey            |
      | NULL_VALUE        | INVALID_CREDENTIALS |
      | WRONG_PASSWORD    | INVALID_CREDENTIALS |
      | EMPTY_USERNAME    | USERNAME_REQUIRED   |
      | EMPTY_PASSWORD    | PASSWORD_REQUIRED   |