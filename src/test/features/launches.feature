Feature: Verify Launches page

  Background:
    When I navigate to Login page
    And I fill "usernameInput" element from username text
    And I fill "passwordInput" element from password text
    And I click on "submitButton" element
    Then I am on Dashboard page
    And I should wait until "logoIcon" element is visible
    When I navigate to Launches page
    Then I should wait until "launchesButton" element is visible

    Scenario: Verify that add Filter buttons changes color on hover
      Then "addFilterButton" element should be visible
      And  CSS "background-color" property of "addFilterButton" element should be "rgb(255, 255, 255)"
      When I hover over "addFilterButton" element
      And  CSS "background-color" property of "addFilterButton" element should be "rgb(33, 195, 220)"

    Scenario: Verify that all launch properties exist
      Then "nameField" element should be visible
      And  CSS "color" property of following elements should be "rgb(119, 119, 119)":

      |field               |
      | nameField          |
      | startTimeField     |
      | totalField         |
      | skippedField       |
      | passedField        |
      | failedField        |
      | productBugField    |
      | autoBugField       |
      | systemIssueField   |
      | toInvestigateField |

   Scenario Outline: Verify start, total, pass, fail, skipped for each launch
    Then "demo_launch" element by index <index> should be visible
     And "demo_total" element by index <index> should be visible
     And "demo_total" element by index <index> should have "<total>" text
     And "demo_passed" element by index <index> should have "<passed>" text

     Examples:
       | index | total | passed |
       | 1     | 30    | 30     |
       | 2     | 25    | 20     |
       | 3     | 20    | 10     |
       | 4     | 15    | 5      |
       | 5     | 10    | 1      |



