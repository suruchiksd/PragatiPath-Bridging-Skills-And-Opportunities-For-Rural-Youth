import os
import time
import subprocess
import re


def is_indeed_url(url):
    pattern = r"^https?://www\.indeed\.com/jobs\?q="
    return bool(re.match(pattern, url))


next_page_file = "next_button_url.txt"
file_exists = os.path.isfile(next_page_file)


def get_link():
    while True:
        indeed_link = str(input("Please insert a valid indeed job search link e.g "
                                "https://www.indeed.com/jobs?q=software+engineer&sc=0kf%3Aattr%28DSQF7%29jt"
                                "%28contract%29%3B&taxo1=%5BDSQF7%5D&vjk=09799a214a4bb276\n"))
        if is_indeed_url(indeed_link):
            return indeed_link
        else:
            print("Invalid URL. Please enter a valid Indeed job search link.")


if not file_exists:
    job_link = get_link()
    with open(next_page_file, "w") as file:
        file.write(job_link)

if file_exists:
    print("A pending job exists. Do you want to continue?\ny = yes\nn = delete old job and start fresh\n"
          "Type \"cancel\" to exit. (y/n)")

    response = ""

    while response not in ["y", "n", "cancel"]:
        response = input("type a response: ").strip().lower()

    if response == "n":
        job_link = get_link()
        with open(next_page_file, "w") as file:
            file.write(job_link)
    elif response == "cancel":
        print("Exiting the program.")
        exit()

# Loop until the next_page file is not marked as "DONE"
while True:
    # Run the scrapper.py script using subprocess
    subprocess.run(["/usr/bin/python3", "scrape.py"])

    # Wait for a few seconds before checking the next_page file again
    time.sleep(5)

    # Check the content of the next_page file
    with open(next_page_file, "r") as file:
        next_page_status = file.read().strip()

    # If the next_page file contains "DONE", break the loop
    if next_page_status == "DONE":
        os.remove(next_page_file)
        break
