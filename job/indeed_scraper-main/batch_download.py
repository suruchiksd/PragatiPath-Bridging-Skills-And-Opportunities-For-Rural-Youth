# import time
# import json
# import os
#
#
# def get_link():
#     with open("apply_links.json", "r") as file:
#         data = json.load(file)
#
#     if len(data) == 0:
#         return "ENDED"
#     link = data.pop()
#
#     with open("apply_links.json", "w") as file:
#         json.dump(data, file)
#
#     print(link)
#
#     return link
#
#
# def scrape_job():
#     job_link = get_link()
#     next_page_file = "next_button_url.txt"
#     with open(next_page_file, "w") as file:
#         file.write(job_link)
#
#     while True:
#         # Run the scrapper.py script using subprocess
#         subprocess.run(["/usr/bin/python3", "scrape.py"])
#
#         # Wait for a few seconds before checking the next_page file again
#         time.sleep(5)
#
#         # Check the content of the next_page file
#         with open(next_page_file, "r") as file:
#             next_page_status = file.read().strip()
#
#         # If the next_page file contains "DONE", break the loop
#         if next_page_status == "DONE":
#             with open(next_page_file, "w") as done_file:
#                 done_file.write(get_link())
#
#         if next_page_status == "ENDED":
#             os.remove(next_page_file)
#             break
#

import os
import time
import subprocess
import re
import json

next_page_file = "next_button_url.txt"
file_exists = os.path.isfile(next_page_file)
if not file_exists:
    with open('next_button_url.txt', "w") as next_file:
        next_file.write("DONE")


def get_link():
    with open("apply_links.json", "r") as link_file:
        data = json.load(link_file)

    if len(data) == 0:
        return "ENDED"

    link = data.pop()

    with open("apply_links.json", "w") as link_write_file:
        json.dump(data, link_write_file)

    print(link)

    return link


def get_link_and_write():
    job_link = get_link()
    with open(next_page_file, "w") as write_file:
        write_file.write(job_link)


# Loop until the next_page file is not marked as "DONE"
while True:
    # Run the scrapper.py script using subprocess
    # subprocess.run(["/usr/bin/python3", "scrape.py"])
    subprocess.run(["python", "scrape.py"])

    # Wait for a few seconds before checking the next_page file again
    time.sleep(5)

    # Check the content of the next_page file
    with open(next_page_file, "r") as file:
        next_page_status = file.read().strip()

    # If the next_page file contains "DONE", break the loop

    if next_page_status == "DONE":
        get_link_and_write()

    if next_page_status == "ENDED":
        os.remove(next_page_file)
        break
