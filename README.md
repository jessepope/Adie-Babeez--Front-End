# Adie-Babeez 
Adie-Babeez was created as part of [Ada Developers Academy](https://adadevelopersacademy.org/) Cohort 16 Capstone project. It's purpose is to connect student parents at Ada Developers Academy. Students can sign up for our site and access a social feed and direct messaging as means to connect with, and share resources between, student parents at Ada. We chose to build this app because we saw a need for additional support services for students in our cohort who were balancing parenting and/or care giving while also completing the program. We believe that connecting students who share similar experiences and needs would increase community support for these students. 

This app is integrated with a Flask API and React Chat Engine API. The user is able to create an account through Adie-Babeez and also be signed up for an account through Chat Engine, which enables direct messaging between users within the Adie-Babeez platform. 

## Demo

Embed Demo video here

## Features
+ Login/Sign-up
+ Social Feed
+ Create New Post
+ Like/Comment/Delete Post
+ My Profile/Users Profile
+ Edit/Delete My Profile
+ Inbox with Direct Messaging

## Deployment

Adie-Babeez is deployed on Heroku:
<br />Front-end: https://adiebabeez.herokuapp.com/
<br />Back-end (database): https://adie-babeez.herokuapp.com/users/all
<br />
<br />
Back-end Repo: https://github.com/jessepope/Adie-Babeez--Back-End

## Capstone Team

This capstone project was a team effort. Our team includes Andrea Yuson, Elly Wong, and Jesse Pope.

# Installation and Set up

1. Clone this repository.
2. Install dependencies by running npm install.
3. To Visit App: localhost:3000/

## Dependencies 
Adie-Babeez relies on:
- Python/Flask API
- React Chat Engine API
- React Router Dom
- React Hook Form
- SQLAlchemy
- gunicorn


## Reflection
**Overview** <br />
This was a three week capstone project to complete the classroom portion of Ada Developers Academy. Project goals included using technologies and skills that we had learned during the classroom portion, as well as seeking to utilize new documentation and technologies. 

We wanted to build an app to help student parents get connected to each other so that they could share resources and support. We noticed that student parents faced unique challenges and barriers during the classroom portion at Ada, and wanted to ideate ways to help them overcome those challenges and feel more connected and supported. 

**Process** <br />
You can view documents created during our brainstorming process in our capstone google drive at the following link: https://drive.google.com/drive/folders/1LvXXp3TYMRqG9Y5oz8PFVMv-LOxxWi9y?usp=sharing

These documents included notes from tutorials that we watched in preparation, our wireframing ideas, screenshots from apps that we used as inspiration, DOM drafts, and notes from our work sessions and team meetings.

**Tools and Technologies**<br />
We implemented many new react tools for this project, including react router and react hook form. We used the create-react-app buildpack to help jumpstart our process and allow us to focus on learning new tools in the devleopment process. We wrote code in python and flask for the backend, and JSX, JavaScript, and CSS for the front end. We utilized axios for API calls. We integrated an external API. We built/connected to our database with SQLAlchemy and postgress. Lastly, we deployed both our front and back end on Heroku.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Challenges**<br />
We ran into some challenges with implementing new libraries in react (such as react-router-dom and react-hook-form). We spent a lot of time reading reatc docs and looking at examples of these libraries being used. We also had to make some updates to our front end code midway, due to an update with the syntax for react routing. Another challenge that we ran into was maintaining a global state for the current user. To seolve this problem we used useContext to pass a state variable to other components (this was a new react tool for us). 

We also ran into some challenges with integrating a third-party external API (react chat engine). The documentation for this API is limited, and it was difficult to find exmaples that were up to date with the current version of react and react router that we were using. We did quite a bit of trouble shooting, trial and error, and console-logging to solve the issues with the external API. We were able to integrate it in our sign up, eidt user, and inbox features. 

**Learning Reflections**<br />
**Why was this project challenging and therefore a really good learning experience?**
+ Getting better at unblocking yourself by searching for resources and being able to get through git merge conflicts with the help of my group  which will make my anxiety towards git a little better for future use!
+ This is challenging because this is my first full stack project using some tech stacks which I am not familiar with and this also really relied on the communications with team members to make our work come true and successful.

**Ideas for Extensions and Refactoring**<br />
We wanted to collect the ideas that we have for refactoring and extensions that we were not able to get to within the time constraints of our capstone project.
+ Error message asking user to login if the global user state is null
+ More responsiveness in the design
+ More accessibility in HTML/JSX id and class names, as well as elemtn structure
+ Further style integration for inbox
+ "forgot password" feature
+ Images for avatar included in user profile
+ Posts made by user included in user profile
+ Post sorting feature in UI
+ Button for direct messaging in user profile
