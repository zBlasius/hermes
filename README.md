# Financial Life Tracker

This mobile project is designed to help users take control of their financial lives. With a simple and intuitive interface, users can track their incomes and expenses, visualize financial reports, and maintain full access to their data—even when offline.

## Features

### Core Features:
- Add and manage **incomes** and **outcomes**.
- Generate **financial reports** based on recorded transactions.
- **Offline-first approach**: all data is available even without an internet connection.
- Seamless **syncing with the cloud** when the device reconnects to the internet.

### Technical Highlights:
- Built using **React Native** for a smooth cross-platform mobile experience.
- Backend powered by **Node.js**, ensuring scalable and performant APIs.
- **PostgreSQL** used for structured relational data like user profiles and transaction metadata.
- **SQLite** utilized for offline caching.
- **RabbitMQ** utilized for sync offline in backend database (PostgresSQL).
- Offline capabilities ensure users never lose access to critical data.

## Getting Started

1. **Install the App**:
   - Clone the repository and follow the setup guide for React Native development (Expo or bare workflow).
   - Make sure to set up the backend server locally or connect to a deployed API.

2. **Create Your Account**:
   - Register as a new user directly in the mobile app.
   - Your data will be stored locally and synced to the server when online.

3. **Start Managing Your Finances**:
   - Add new income or expense records.
   - View monthly summaries and insights into your spending behavior.

## How It Works

- The mobile app uses a local database (SQLite) to store financial data securely on the device.
- When online, changes are synced to the backend built with Node.js.
- The backend manages user data and transactions using Postgress.
- This hybrid architecture supports both structure and flexibility, ideal for offline-first apps.
- Check screens on [Figma]([https://github.com/zBlasius/PhysiLab2d](https://www.figma.com/design/r9Zk7BSqB5jVdbqG028ELb/Financial-App?node-id=1-2&t=hJrqXp8SGZFrBM8R-1)).

## Contribution

Contributions are welcome! If you have ideas or improvements, feel free to:

- Open an issue.
- Submit a pull request.

Please make sure to follow best practices and include clear documentation for any code changes.

## Contact
For any inquiries or support, please contact blasiusgustavo19@gmail.com

For questions or support, feel free to contact me at: **blasiusgustavo19@gmail.com**
