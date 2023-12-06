Project Overview

About
Problem Statement: Many individuals with hectic schedules find it challenging to allocate dedicated time for language learning. This project aims to provide a convenient and time-efficient way for users to expand their vocabulary, fitting into their busy lifestyles.
Example Scenario: Engage in a quick flashcard session or word search, reinforcing vocabulary without disrupting their busy day.
User Impact: 
aims to make language learning accessible and manageable for individuals with time constraints, allowing them to consistently improve their vocabulary during a hectic schedule.

Third-Party APIs
1. Dictionary API (Oxford Dictionaries API):
Use this API to fetch word definitions, examples, and pronunciations.
Integration points:
•	Word search feature to retrieve definitions.
•	Flashcard component to display word information.
2. Push Notification Service (e.g., OneSignal, Firebase Cloud Messaging):
Integrate a push notification service to send reminders for short vocabulary sessions.
Integration points:
•	Trigger push notifications for scheduled learning sessions.
•	Allow users to customize notification preferences.

CRUD Capabilities
1.	Word CRUD Operations:
•	Create: Allow users to add new words to their learning list.
•	Read: Fetch word details from the Dictionary API and display them in the app.
•	Update: Let users modify the information associated with words (e.g., add personal notes or mark as learned).
•	Delete: Enable users to remove words from their vocabulary list.

2.	User Progress CRUD Operations:
•	Create: Record user progress after each learning session.
•	Read: Display user achievements and progress insights.
•	Update: Modify progress based on user interactions and completed sessions.
•	Delete: Allow users to reset or clear their learning history.
•	Example Django views:
Features
1.	Authentication (Optional): Enable users to have personalized word lists and progress tracking, implement user authentication.
2.	Learning Plan Recommendations (Optional): Use machine learning to generate personalized learning plans for users based on their past interactions and available time slots.
3.	User Feedback (Optional): Implement a feedback system for users to suggest new words or report issues.
4.	Real-Life Context (Optional): Enhance the word information with example sentences and scenarios for a more practical understanding.
5.	
Stretch Learning
1.	Word Usage Examples: Use OpenAI to generate contextually relevant example sentences for the words fetched from the Dictionary API. This provides users with real-life contexts for the words they are learning.
2.	Interactive Conversations (Optional): Allow users to engage in interactive conversations with a virtual tutor powered by GPT-3. Users can practice using newly learned words in different scenarios.
3.	Dynamic Learning Prompts: Utilize OpenAI to dynamically generate learning prompts or questions related to the words in the user's vocabulary list. This enhances engagement and understanding.
4.	Customized Learning Paths (Optional): Leverage OpenAI to analyze user interactions and generate personalized learning paths or content recommendations. For example, if a user struggles with certain types of words, the system could adapt the learning materials accordingly.


Dependencies:

pip install django
pip install python-dotenv
pip install requests
pip install psycopg2
pip install djangrestframework
pip install openai==0.28
