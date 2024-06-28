# Fridge to Fork

Fridge to Fork is an innovative recipe-finding app designed to help users discover recipes based on the ingredients they have at home. Users can filter recipes by cuisine and diet, save their favorite recipes to a personal list, and even record their own recipes.

## Features

- Search for recipes based on available ingredients.
- Filter recipes by cuisine and diet preferences.
- Save favorite recipes to a personal list.
- Record and save personal recipes.
- User authentication with Google OAuth.
- Interactive UI/UX designed with Figma and MUI.

## Getting Started

Fridge to Fork is a web app with a React/Vite frontend, an ExpressJS backend, and a PostgreSQL database. It leverages various AWS services for deployment and storage.

## Deployment

Fridge to Fork is deployed using Render for the backend and AWS services for storage and content delivery:

- **Render:** Hosts the ExpressJS backend and PostgreSQL database.
- **AWS S3:** Stores static assets.
- **AWS CloudFront:** Distributes the frontend content globally.
- **AWS RDS:** Hosts the PostgreSQL database.

## Video Demonstration

Check out the video demonstration on YouTube below!

[![Fridge to Fork screencast](https://img.youtube.com/vi/your_video_id/0.jpg)](https://www.youtube.com/watch?v=your_video_id)

## Screenshots

#### Home Page

![Home Page](/static/home_page.png)

#### Recipe Search

![Recipe Search](/static/recipe_search.png)

#### Recipe Details

![Recipe Details](/static/recipe_details.png)

#### Saved Recipes

![Saved Recipes](/static/saved_recipes.png)

#### Add Recipe

![Add Recipe](/static/add_recipe.png)

#### ER Diagram

![ER Diagram](/static/er-diagram.png)

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - MUI
  - React-Router
- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
- **APIs and Integrations:**
  - Google OAuth
  - Spoonacular API
- **Design and Planning:**
  - Figma
  - Miro
- **Deployment and Hosting:**
  - Render
  - AWS S3
  - AWS CloudFront
  - AWS RDS

## Next Steps

- Enhance search functionality with more filters.
- Add social features for sharing recipes with friends.
- Integrate a meal planning feature.
