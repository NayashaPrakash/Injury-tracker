https://github.com/NayashaPrakash/Injury-tracker/assets/98101207/d36b9165-2b81-473b-9ca1-261a9d504d8b

# Injury Tracker

### Installation

To run the application, ensure that you are in the root project and then run the following commands:

1. In a terminal session, launch the server:

```bash
   make server
```

2.  In a separate terminal session, launch the client

```bash
   make client
```

The project is all set to run now!

## Description:

### Frontend

The user interface is built using React and Material UI components and is responsive in nature.

### Backend

The backend is developed using Node.js framework along with MongoDB for database.

### Features

1. Body-map:

   It includes automatic location detection feature done using image mapping.

2. Analytics Dashboard:

   The charts are made using Chart.JS based on the number of reports reported on a particular date by the user.

3. User Registration and Authentication:

   Users can register for an account using a unique username and password. Authentication is implemented using JWT for secure access. Registered users can log in and log out of their  
   accounts. User history, including reported injuries, is stored and accessible upon login.

4. Injury Reporting:

   Users can create a new injury report that includes various fields. They can select different areas of injury on a body map image and can provide details of injuries for each labeled
   area. The system automatically identifies and labels the selected areas (e.g., "left hand," "left foot").

5. List of Reports:

   Users can view history of all reported injuries. The list includes the name of the reporter, date & time of injury, and the date of the report.
