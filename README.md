# To-Do App

A simple web application that allows you to manage your tasks. You can easily create, view, update, and delete tasks with this app.

## Key Features

- **Create Tasks:** Add new tasks to your to-do list.
- **Update Tasks:** Edit your existing tasks.
- **Mark Tasks as Done:** Check off tasks when completed.
- **Delete Tasks:** Remove tasks from your active list.
- **View Deleted Tasks:** See tasks that have been deleted.
- **View Completed Tasks:** Review tasks that have been marked as done.
- **Task Recovery:** Restore deleted tasks within a week before they are permanently removed.
- **Clear All Active Tasks:** Remove all tasks that are not yet completed.
- **Clear All Completed Tasks:** Remove all tasks that have been marked as done.

## How to Set Up Locally

### Option 1: Cloning the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/Kholoudxs55kh/To-Do-App.git
   ```

3. Navigate to the project folder:

   ```bash
   cd To-Do-App
   ```

### Option 2: Using the ZIP File

1. Download the repository as a ZIP file from GitHub.
2. Extract the ZIP file to your desired directory.
3. Navigate to the extracted folder using your terminal:

   ```bash
   cd To-Do-App
   ```

### Installing Dependencies

If you are using **Yarn**:

1. Install the required packages:

   ```bash
   yarn
   ```

2. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. Run Prisma migrations:

   ```bash
   npx prisma migrate
   ```

If you are using **npm**:

1. Install the required packages:

   ```bash
   npm install
   ```

2. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. Run Prisma migrations:

   ```bash
   npx prisma migrate
   ```

### Setting Up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following environment variables:

   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
   PORT=3000
   NEXT_PUBLIC_API_URL=http://localhost:3000/
   ```

For local development, you will need to set up a local PostgreSQL database and update the `DATABASE_URL` with your database credentials.

### Running the App Locally

#### Using **Yarn**:

1. Start the backend server:

   ```bash
   yarn start-backend
   ```

2. Start the frontend client:

   ```bash
   yarn start-front
   ```

#### Using **npm**:

1. Start the backend server:

   ```bash
   npm run start-backend
   ```

2. Start the frontend client:

   ```bash
   npm run start-front
   ```

### Running Tests

For running tests, use the following command:

- For **Yarn**:

  ```bash
  yarn test
  ```

- For **npm**:

  ```bash
  npm run test
  ```

## Production Databases

### Neon (Production Database)

In production, we use Neon as our database provider. You can use the following connection URL for Neon:

```bash
DATABASE_URL='postgresql://todoDB_owner:wphanrkjYx08@ep-nameless-voice-a58sxage.us-east-2.aws.neon.tech/todoDB?sslmode=require'
```

After setting the production database URL, run:

```bash
npx prisma pull
```

### Vercel PostgreSQL (Previously Used)

We also used Vercel PostgreSQL for a while. Here are the credentials for that:

```bash
POSTGRES_URL="postgres://default:TFemJk3Afoi4@ep-orange-butterfly-a43pezc9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:TFemJk3Afoi4@ep-orange-butterfly-a43pezc9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:TFemJk3Afoi4@ep-orange-butterfly-a43pezc9-pooler.us-east-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:TFemJk3Afoi4@ep-orange-butterfly-a43pezc9.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-orange-butterfly-a43pezc9-pooler.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="TFemJk3Afoi4"
POSTGRES_DATABASE="verceldb"
```

When using these credentials, you can also run:

```bash
npx prisma pull db
```
