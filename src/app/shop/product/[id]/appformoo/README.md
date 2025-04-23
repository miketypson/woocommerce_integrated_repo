# Love Message Sender - User Guide

## Overview
Love Message Sender is a thoughtful application that allows you to send weekly images with AI-generated romantic messages to your loved one via WhatsApp. This guide will help you set up and use the application.

## Features
- Sends images from your collection with personalized romantic messages
- Supports local image storage (with Dropbox and Google Drive placeholders for future expansion)
- Generates AI-powered romantic messages (with OpenAI integration or fallback messages)
- Sends images and messages via WhatsApp
- Can be scheduled to run automatically using your system's task scheduler

## Requirements
- Python 3.6 or higher
- WhatsApp Web access
- Internet connection
- A collection of images to send

## Installation

### Step 1: Download the Application
Download and extract the Love Message Sender package to a location on your computer.

### Step 2: Install Required Dependencies
Open a terminal or command prompt, navigate to the application folder, and run:

```bash
pip install pywhatkit python-dotenv openai pillow
```

### Step 3: Configure the Application
1. Copy the `.env.template` file to a new file named `.env`
2. Edit the `.env` file with your personal information:
   - Set your OpenAI API key (optional, for AI-generated messages)
   - Enter your girlfriend's phone number (with country code, no + or spaces)
   - Set your country code
   - Configure your names and relationship details
   - Set the schedule for sending messages

### Step 4: Add Your Images
Place your collection of images in the `images` folder within the application directory.

## Usage

### Manual Sending
To manually send a love message with an image:

```bash
python love_message_sender.py --force
```

### Test Mode
To test the application without actually sending a message:

```bash
python love_message_sender.py --test
```

### Check Schedule
To check if it's time to send a message based on your schedule:

```bash
python love_message_sender.py --check-schedule
```

## Scheduling Automatic Sending

### Windows
1. Open Task Scheduler
2. Create a new Basic Task
3. Set the trigger to Weekly, selecting your preferred day and time
4. Set the action to "Start a program"
5. Browse to your Python executable (e.g., `C:\Python39\python.exe`)
6. Add arguments: `love_message_sender.py --force`
7. Set the start in directory to your Love Message Sender folder

### macOS
1. Open Terminal
2. Run `crontab -e`
3. Add a line like: `0 18 * * 6 cd /path/to/love_message_sender && python3 love_message_sender.py --force`
   (This runs every Saturday at 6 PM)

### Linux
1. Open Terminal
2. Run `crontab -e`
3. Add a line like: `0 18 * * 6 cd /path/to/love_message_sender && python3 love_message_sender.py --force`
   (This runs every Saturday at 6 PM)

## Important Notes
- The first time the application runs, it will open WhatsApp Web in a browser
- You'll need to scan the QR code with your phone to authenticate
- Your computer must be on and unlocked when the scheduled task runs
- The application uses PyAutoGUI to control your mouse and keyboard to interact with WhatsApp Web
- Ensure you're not using your computer when the scheduled task runs to avoid interference

## Troubleshooting

### WhatsApp Web Not Opening
- Make sure you have a default web browser set
- Try running the application manually with the `--force` flag

### Messages Not Sending
- Check your internet connection
- Verify your WhatsApp account is active
- Ensure your phone number format is correct in the .env file

### No Images Appearing
- Check that you've added images to the images folder
- Verify the image file formats are supported (JPG, PNG, etc.)

## Customization
- Edit the message templates in `message_generator.py` to customize the fallback messages
- Modify the schedule in your .env file to change when messages are sent

## Privacy and Security
- Your images and messages are stored locally on your computer
- The application does not share your data with any third parties
- If using OpenAI for message generation, your prompts will be sent to OpenAI's API

## Support
If you encounter any issues or have questions, please refer to the documentation or contact the developer.
