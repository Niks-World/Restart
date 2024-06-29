To-Do List App with Archive Functionality
This application is a to-do list app with two main pages:

index.html (Landing Page): This is where you create new to-do items.
archive.html (Archive Page): This is where you can view and manage archived to-do items.
Technologies Used:

HTML: Creates the structure of the webpages.
CSS: Styles the appearance of the webpages (e.g., fonts, colors).
JavaScript: Adds interactivity to the webpages (e.g., adding to-do items, filtering archived items).
DOM: Refers to the Document Object Model, which allows JavaScript to manipulate the content of the webpage.
Local Storage: Stores data on the user's device for persistence, even after refreshing the page.
Navigation:

A navigation bar (<nav>) is present at the top with links to both index.html (Home) and archive.html (Archive).

Creating a To-Do (index.html):

Input: You can enter the task name in an input field.
Priority: Select the priority level (low, medium, high) from a dropdown menu (select tag).
Add Button: Clicking this button adds the to-do item to a list stored on the user's device (local storage) with the key name "todos."
If no text is entered, an alert message appears stating "Todo cannot be empty!"
Data Structure:

Each to-do item is stored as an object within an array in local storage. The object has the following properties:

title: The name of the to-do item.
priority: The priority level (low, medium, high).
status: The current status of the item ("Pending" or "Completed✅").
Dynamic Table:

A table displays the added to-do items:

Name: Shows the title of the to-do item.
Priority: Shows the priority level. The background color of the cell changes based on priority:
Low: No color change.
Medium: Yellow (rgb(255, 255, 0)).
High: Red (rgb(255, 0, 0)).
Status: Shows the current status ("Pending" or "Completed✅"). Clicking this button toggles the status (between Pending and Completed) and updates both the page and local storage.
Delete: Clicking this button removes the to-do item from the list in local storage and refreshes the page.
Archive: Clicking this button removes the to-do item from the current list and adds it to the archive list in local storage (key name "archive"). The page refreshes to reflect the change.
Archive Page (archive.html):

This page retrieves archived to-do items from local storage and displays them in a similar table format as the index page.
Restore: Clicking this button removes the to-do item from the archive list and adds it back to the main to-do list in local storage (key name "todos"). The page refreshes to reflect the change.
Delete: Clicking this button permanently removes the to-do item from the archive list in local storage. The page refreshes to reflect the change.
Filtering Archived To-Dos:

Two dropdown menus (select tags) allow you to filter the archived to-do items:

Priority Filter: Choose a priority level to see only items with that specific priority.
Status Filter: Choose a status ("Pending" or "Completed✅") to see only items with that specific status.
Explanation of Images (not provided):

Image.1 - index.html: This would likely show the layout of the landing page with the input field, dropdown menu, button, and table.
<img src="https://i.ibb.co/NtRDfkn/Screenshot-2024-06-29-233809.png"> <br>

Image.1.1 - index.html (alert): This would likely show an example of the alert message that appears when no text is entered.
<img src="https://i.ibb.co/fMx86Pv/Screenshot-2024-06-29-234234.png"> <br>

Image- archive.html : here You can see all the details
<img src="https://i.ibb.co/5kY69BH/Screenshot-2024-06-29-233820.png">