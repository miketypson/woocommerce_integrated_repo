"""
Main Scheduler Script for Love Message Sender

This script ties together all components of the Love Message Sender system:
- Loads configuration from .env file
- Selects an image using the ImageHandler
- Generates a message using the MessageGenerator
- Sends the image and message using the WhatsAppSender

It can be run manually or scheduled using external tools like cron or Windows Task Scheduler.
"""

import os
import sys
import time
import random
import argparse
from datetime import datetime
from dotenv import load_dotenv
from typing import Dict, Optional

# Import our custom modules
from image_handler import ImageHandler
from message_generator import MessageGenerator
from whatsapp_sender import WhatsAppSender

def load_config() -> Dict:
    """
    Load configuration from .env file.
    
    Returns:
        Dictionary containing configuration settings
    """
    # Check if .env file exists, if not, create from template
    if not os.path.exists('.env'):
        if os.path.exists('.env.template'):
            print("No .env file found. Creating from template...")
            with open('.env.template', 'r') as template_file:
                template_content = template_file.read()
            
            with open('.env', 'w') as env_file:
                env_file.write(template_content)
            
            print("Created .env file from template. Please edit it with your settings.")
            print("Exiting until configuration is complete.")
            sys.exit(1)
        else:
            print("Error: No .env file or template found.")
            sys.exit(1)
    
    # Load .env file
    load_dotenv()
    
    # Create config dictionary from environment variables
    config = {
        # OpenAI API Key
        'OPENAI_API_KEY': os.getenv('OPENAI_API_KEY', ''),
        
        # WhatsApp Configuration
        'RECIPIENT_PHONE': os.getenv('RECIPIENT_PHONE', ''),
        'COUNTRY_CODE': os.getenv('COUNTRY_CODE', '1'),
        
        # Image Storage Configuration
        'STORAGE_TYPE': os.getenv('STORAGE_TYPE', 'local'),
        'IMAGES_FOLDER': os.getenv('IMAGES_FOLDER', './images'),
        'DROPBOX_ACCESS_TOKEN': os.getenv('DROPBOX_ACCESS_TOKEN', ''),
        'GDRIVE_FOLDER_ID': os.getenv('GDRIVE_FOLDER_ID', ''),
        
        # Message Configuration
        'YOUR_NAME': os.getenv('YOUR_NAME', 'Your Name'),
        'GIRLFRIEND_NAME': os.getenv('GIRLFRIEND_NAME', 'Her Name'),
        'RELATIONSHIP_DURATION': os.getenv('RELATIONSHIP_DURATION', ''),
        
        # Schedule Configuration
        'SEND_DAY': int(os.getenv('SEND_DAY', '5')),  # Default to Saturday
        'SEND_HOUR': int(os.getenv('SEND_HOUR', '18')),  # Default to 6 PM
        'SEND_MINUTE': int(os.getenv('SEND_MINUTE', '0'))  # Default to on the hour
    }
    
    return config

def validate_config(config: Dict) -> bool:
    """
    Validate the configuration settings.
    
    Args:
        config: Dictionary containing configuration settings
        
    Returns:
        True if configuration is valid, False otherwise
    """
    # Check required settings
    if config['RECIPIENT_PHONE'] == '' or config['RECIPIENT_PHONE'] == '1234567890':
        print("Error: Recipient phone number not configured in .env file")
        return False
    
    # Check if images folder exists
    if config['STORAGE_TYPE'] == 'local' and not os.path.exists(config['IMAGES_FOLDER']):
        print(f"Warning: Images folder {config['IMAGES_FOLDER']} does not exist. Creating it...")
        os.makedirs(config['IMAGES_FOLDER'])
        print(f"Please add images to {config['IMAGES_FOLDER']} before running again.")
        return False
    
    # Check if images folder is empty
    if config['STORAGE_TYPE'] == 'local' and len(os.listdir(config['IMAGES_FOLDER'])) == 0:
        print(f"Error: No images found in {config['IMAGES_FOLDER']}")
        return False
    
    return True

def send_love_message(config: Dict, test_mode: bool = False) -> bool:
    """
    Send a love message with an image.
    
    Args:
        config: Dictionary containing configuration settings
        test_mode: Whether to run in test mode (print only, no actual sending)
        
    Returns:
        True if successful, False otherwise
    """
    try:
        # Initialize components
        image_handler = ImageHandler(config)
        message_generator = MessageGenerator(config)
        whatsapp_sender = WhatsAppSender(config)
        
        # Select an image
        image_path = image_handler.select_next_image()
        if not image_path:
            print("Error: Failed to select an image")
            return False
        
        # Generate a message
        message = message_generator.generate_message()
        if not message:
            print("Error: Failed to generate a message")
            return False
        
        print("\n" + "="*50)
        print("Love Message Sender")
        print("="*50)
        print(f"Selected image: {image_path}")
        print(f"Generated message: {message}")
        print("="*50 + "\n")
        
        # In test mode, just print the message and image path
        if test_mode:
            print("Test mode: Message and image would be sent to WhatsApp")
            return True
        
        # Send the image and message
        success = whatsapp_sender.send_image_with_message(image_path, message)
        
        if success:
            print("Successfully sent love message with image!")
        else:
            print("Failed to send love message")
        
        return success
        
    except Exception as e:
        print(f"Error in send_love_message: {e}")
        return False

def check_schedule(config: Dict) -> bool:
    """
    Check if it's time to send a message based on schedule.
    
    Args:
        config: Dictionary containing configuration settings
        
    Returns:
        True if it's time to send, False otherwise
    """
    now = datetime.now()
    scheduled_day = config['SEND_DAY']  # 0 = Monday, 6 = Sunday
    scheduled_hour = config['SEND_HOUR']
    scheduled_minute = config['SEND_MINUTE']
    
    # Convert Python's weekday (0 = Monday) to our config format
    current_day = now.weekday()
    current_hour = now.hour
    current_minute = now.minute
    
    return (current_day == scheduled_day and 
            current_hour == scheduled_hour and 
            current_minute == scheduled_minute)

def main():
    """Main function to run the Love Message Sender."""
    parser = argparse.ArgumentParser(description='Love Message Sender')
    parser.add_argument('--test', action='store_true', help='Run in test mode (no actual sending)')
    parser.add_argument('--force', action='store_true', help='Force send regardless of schedule')
    parser.add_argument('--check-schedule', action='store_true', help='Check if it\'s time to send based on schedule')
    args = parser.parse_args()
    
    # Load configuration
    config = load_config()
    
    # Validate configuration
    if not validate_config(config):
        print("Please fix configuration issues and try again.")
        sys.exit(1)
    
    # Check schedule if requested
    if args.check_schedule:
        if check_schedule(config):
            print("It's time to send a love message based on the schedule!")
        else:
            now = datetime.now()
            print(f"It's not time to send yet. Current time: {now.strftime('%A %H:%M')}")
            print(f"Scheduled time: Day {config['SEND_DAY']} (0=Mon, 6=Sun) at {config['SEND_HOUR']}:{config['SEND_MINUTE']:02d}")
        sys.exit(0)
    
    # If force send or it's time to send based on schedule
    if args.force or check_schedule(config):
        success = send_love_message(config, args.test)
        sys.exit(0 if success else 1)
    else:
        print("Not scheduled to send now. Use --force to send anyway.")
        sys.exit(0)

if __name__ == "__main__":
    main()
