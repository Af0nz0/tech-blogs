# tech-blogs
Tech Blog is a Content Management System (CMS)-style blog site where users can publish articles, blog posts, and share their thoughts and opinions.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- Homepage displaying existing blog posts
- User dashboard for managing blog posts
- Ability to create, edit, and delete blog posts
- Leave comments on blog posts
- Idle session management for security
- Enhanced user interface with styling and JavaScript interactions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MySQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/tech-blog.git
Navigate to the project directory:
cd tech-blog
Install dependencies:

npm install

Set up your MySQL database and update the config/config.js file with your database credentials.

Run database migrations:
npx sequelize-cli db:migrate

Start the application:

node app.js

### Usage
Open your web browser and navigate to http://localhost:3000.

Sign up for an account or log in if you already have one.

Explore the homepage, read blog posts, and leave comments.

Access your dashboard to manage your blog posts.

Log out when you're done using the application.

### Contributing
Contributions are welcome! If you have any improvements or new features to suggest, please create a pull request

