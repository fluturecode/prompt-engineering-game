# Prompt Engineering Game

## Overview

The Prompt Engineering Game is an interactive React application designed to help users improve their skills in crafting effective prompts for AI models. By engaging with a series of challenges, users learn to create more precise and useful prompts, enhancing their ability to interact with AI systems like ChatGPT.

## Features

- Multiple levels of prompting challenges
- Real-time interaction with OpenAI's GPT model
- Scoring system to track user progress
- Feedback and tips for improving prompts
- Responsive design using shadcn/ui components

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenAI API key

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/prompt-engineering-game.git
   cd prompt-engineering-game
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

To start the development server:

```
npm start
```

Navigate to `http://localhost:3000` in your web browser to use the application.

## Game Rules

1. You will be presented with a series of prompting tasks.
2. Craft a prompt based on the given task and submit it.
3. The AI will respond to your prompt.
4. Your prompt will be evaluated based on how well the AI's response meets the task criteria.
5. Receive feedback and a score for each prompt.
6. Progress through increasingly challenging levels to improve your prompt engineering skills.

## Contributing

Contributions to the Prompt Engineering Game are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- OpenAI for providing the GPT API
- shadcn/ui for the UI components
- Create React App for the project setup

## Contact

If you have any questions or feedback, please open an issue in the GitHub repository.
