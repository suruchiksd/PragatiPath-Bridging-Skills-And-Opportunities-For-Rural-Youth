#!pip install google-api-python-client beautifulsoup4 requests selenium

import json

# Sample input data
input_data = {
    "keywords": [
        "Python programming",
        "Data Science",
        "Machine Learning",
        "Web Development",
        "Artificial Intelligence"
    ]
}

# Save to a file
with open('input.json', 'w') as file:
    json.dump(input_data, file, indent=4)

print("Sample input.json file created!")

# Import necessary libraries
import json
import requests
import googleapiclient 
from bs4 import BeautifulSoup
from googleapiclient.discovery import build

# YouTube API setup
YOUTUBE_API_KEY = 'AIzaSyA6M4UFuO49xP0QhMS-C03fClOK-t47otQ'  # Replace with your YouTube API Key
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# Function to search YouTube
def search_youtube(keywords):
    results = []
    for keyword in keywords:
        request = youtube.search().list(
            part="snippet",
            maxResults=10,
            q=keyword
        )
        response = request.execute()
        for item in response['items']:
            if item['id']['kind'] == 'youtube#video':
                results.append({
                    'title': item['snippet']['title'],
                    'link': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                    'image': item['snippet']['thumbnails']['high']['url']
                })
    return results

# Main function
def main(input_json_file, output_json_file):
    # Load input keywords from JSON file
    with open(input_json_file, 'r') as file:
        data = json.load(file)
        keywords = data.get('keywords', [])

    # Get results from YouTube and Coursera
    youtube_results = search_youtube(keywords)
    
    
    # Combine and save results
    results = {
        'YouTube': youtube_results,
        
    }
    with open(output_json_file, 'w') as file:
        json.dump(results, file, indent=4)
    print(f"Results saved to {output_json_file}")
    
main('input.json', 'output.json')