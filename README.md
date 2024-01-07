Project Title: Daily Grind Wellness Tracker

Project Description: This web application will allow users to track their calorie intake and activity levels via user input and data retrieved from FitBit user accounts. 

User Story:
As a user who prioritizes my health and wellness,
I want to be able to keep track of my calorie intake and daily activity levels
So that I can reach my personal wellness goals

Acceptance Criteria:

Given I am an authenticated user,
When I enter my daily calories/nutrition data
Then the data is saved and displayed on a monthly calendar timeline graph

Given I am an authenticated user,
When I provide access to my personal fitbit account and data, 
Then my fitbit heartrate, daily steps, and calories-burned data is displayed on the application

User Flow Diagram: 
User enters fitbit login credentials > server responds with fitbit data 
User enters calorie/nutrition info > application displays data on a monthly calendar timeline graph


Server Side APIs:
	- Calorie Ninjas API
	- API Ninjas
	- FitBit API
  - Google Calendar API
