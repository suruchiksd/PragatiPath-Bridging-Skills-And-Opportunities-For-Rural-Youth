import subprocess
import os


batch_download = ""
while batch_download != "y" and batch_download != "n":
    batch_download = input("Do you want to do a batch download or single link download\n"
                           "y = for batch download\n"
                           "n = for single file download\n")


#uncomment /user/bin line for linux and comment out "python". The default is for windows
if batch_download == "y":
    print("batch selected")
    if not os.path.isfile('apply_links.json'):
        print("Generating new apply link file...")
        # subprocess.run(["/usr/bin/python3", "generate_links.py"])
        subprocess.run(["python", "generate_links.py"])
        
    # subprocess.run(["/usr/bin/python3", "batch_download.py"])
    subprocess.run(["python", "batch_download.py"])


elif batch_download == "n":
    # subprocess.run(["/usr/bin/python3", "single_download.py"])
    subprocess.run(["python", "single_download.py"])
    
