from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import undetected_chromedriver as uc
import csv
import os

# Opens link from the file to read the link
# Old link will be stored on its own if the scraping gets interrupted
# Can be used to resume where scraping was left of
with open("next_button_url.txt", "r") as txt_file:
    URL = txt_file.read().strip()
driver = uc.Chrome()
driver.get(URL)


# if selenium gets a list instead of an element, this function can be used to sanitize it
def convert_list_to_str(list_to_convert):
    converted_text = ""
    for elem in list_to_convert:
        converted_text += elem.text
        if converted_text != "":
            converted_text += "|"
    return converted_text


# main element where jobs are listed on indeed.com
def get_main():
    try:
        element = driver.find_element(By.ID, "mosaic-jobResults")
        jobs = element.find_elements(By.CLASS_NAME, "cardOutline")
        return jobs
    except Exception as a:
        print(a)
        write_next_page_url()


# writes the next page url. file is saved and new instance is launched for each new link
# to avoid Cloudflare proxy triggering
def write_next_page_url():
    try:
        pagination_next = driver.find_element(By.XPATH, "//a[contains(@aria-label, 'Next Page')]")

        with open("next_button_url.txt", "w") as txt_file_to_save:
            txt_file_to_save.write(pagination_next.get_attribute("href"))
    except Exception as e:
        print("Error", e)
        print("No more jobs for this term are left to scrape")
        with open("next_button_url.txt", "w") as txt_file_to_save:
            # DONE is used to tell the main.py that the job is finished scraping
            txt_file_to_save.write("DONE")


# main scraping logic is handled by this function
def copy_jobs(selected_jobs, file_writer):
    for job in selected_jobs:
        job.click()
        try:
            details_of_job = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "fastviewjob"))
            )
            title_element = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "jobsearch-JobInfoHeader-title"))
            )
            job_title = title_element.find_element(By.TAG_NAME, "span").text
            trimmed_job_title = job_title.replace("- job post", "").strip()
            company_name = driver.find_element(By.CLASS_NAME, "css-1saizt3")

            indeed_url = driver.current_url
            job_description = driver.find_element(By.CLASS_NAME, "jobsearch-BodyContainer").text
            meta_data_list = job.find_elements(By.CLASS_NAME, "metadata")
            meta_data = convert_list_to_str(meta_data_list)
            print("Title:", trimmed_job_title)
            print("Company:", company_name.text)
            print("Indeed Link", indeed_url)
            print("Job description", job_description)
            print("Meta data", meta_data)

            file_writer.writerow([trimmed_job_title, company_name.text, indeed_url, job_description, meta_data])
            write_next_page_url()

        except Exception as e:
            print("Error:", e)
            write_next_page_url()


# Check if the CSV file exists
csv_file = "job_details.csv"
file_exists = os.path.isfile(csv_file)

# Open the CSV file in append mode outside the copy_jobs() function
with open(csv_file, mode="a", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)

    # Write header if the file doesn't exist
    if not file_exists:
        writer.writerow(["Title", "Company", "Indeed Link", "Job Description", "Meta Data"])

    # Execute the job copying and writing
    copy_jobs(get_main(), writer)

# The file will be closed automatically after exiting the 'with' block
driver.close()
