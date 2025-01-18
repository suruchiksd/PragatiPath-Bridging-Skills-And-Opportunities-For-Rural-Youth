import json

roles = [
    "front+end+developer",
    "react+developer",
    "MERN+developer",
    "fullstack+developer",
    "javascript+developer",
    "Angular+Developer",
    "Vue+Developer",
    "React+Native+Developer",
    "UI+UX+Developer"
]

states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
    "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
    "WI", "WY"
]

apply_links = []

for state in states:
    for role in roles:
        role_object = f"https://www.indeed.com/jobs?q={role}&l={state}&sc=0kf%3Aattr%28DSQF7%29%3B&vjk=d5cb90ffe055303f"
        print("Added ", role_object)
        apply_links.append(role_object)

with open("apply_links.json", "w") as file:
    json.dump(apply_links, file)

print("apply_links list has been saved to apply_links.json")