# Capstone project information

## Project information

-   Project name: Feed the Needy
-   Project description: The website has two purposes: sponsoring and education.
-   Technology used: Nextjs, TailwindCSS, i18next, Husky, Prettier, Eslint, Commitlinter (Conventional Commits)
-   Team members: Aboura Bouchra Ikram, Belharazem Walid, Mecheter Mouloud , Merzouk Fatima Zohra, Zaidi Mounib.
-   Bootcamp: NEA DZ 2023

## Introduction
Welcome to our Website : Buy Me A Meal, a platform dedicated to fighting hunger through the power of sponsorship and education. This website serves as the Capstone Project for the Frontend Web Development in Re:coded, showcasing our ability to create impactful websites while leveraging our technical skills in GitHub, HTML, CSS, JavaScript, Firebase, and Next.js.

## Pages

### Meals Page
•	This page likely displays the list of the available meals for each restaurant.
•	The user can search for specific restaurant inorder to ad dits meals to the cart.
### Cart Page (carts persist even after page refresh)
•	This page displays the meals that a user has added to their shopping cart.
•	Users can review, edit the quantity, or remove the meals from their cart.
###	Checkout Page
•	The checkout page is where users go to complete their purchase.
•	The donor provide his name, e-mail and payment information to finalize the donation.
###	Blogs Page
•	This page likely contains articles or blog posts related to the issue of hunger in worldwide, (content, news and updates ...)
•	Users can read and engage with the content on this page.
###	Home Page
•	The home page is the main landing page when users first visit the website.
•	It typically provides an overview of the business, featured items, promotions, or any other important information.
### Admin Dashboard
This page is accessible only to restaurant owners who have special privileges. such as:
•	Add Meals : The ability to add new meals to the menu or remove existing ones.
•	Overview: Tracking and analyzing financial data related to sales and income.
•	History : Keeping a record of donors who have contributed or made purchases and Track the Number of Active Meals.
•	Edit Page: to update and modify the details of the restaurant, such as contact information or business hours.

## Installation

```shell
git clone https://github.com/your-username/hunger-heroes.git // Clone the repository
cd buymeameal               // Navigate to the project directory
npm install                // Install dependencies

``` 
## Configuration
Before running the project, make sure to set up the necessary configuration:

- Stripe API Keys: Add your Stripe secret and public keys to the .env file.
STRIPE_SECRET_KEY = your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = your_stripe_public_key

- Firebase Account: Add your Firebase secret to the .env file.
NEXT_PUBLIC_FIREBASE_API_KEY = your_firebase_secret

- Email Configuration: Add your email and password to the .env file.
EMAIL = your_email@example.com
PASS = your_email_password


## Development process

-   When commiting you will have to use `git cz` and then go through the process. Look at the first commit I made to know what that means.
-   The translation process is done using the i18next library. There's an example in the index.js file of how this is done. Check this github project for more info on how to use the i18next library: [i18next](https://github.com/i18next/next-i18next)
-   When writing commits, commitlinter library is used to make sure that your commits are consistent with the conventional commits. To learn more about it refer to the guidelines in Canvas or the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) site.
-   The `layout` folder contains the components that will be used in the layout of pages, so components like the header and footer will be placed there.

Good luck and happy coding :D
