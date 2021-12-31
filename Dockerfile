FROM python:3.6

# MAINTANER Your Name "youremail@domain.tld"
WORKDIR /app

# RUN apt-get update -y && \
#     apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app
EXPOSE 5000

# Set flaks to debug mode
# ***default FLASK_ENV=production***
# To enable automate update changes to python code while running flask, by setting FLASK_ENV to development
ENV FLASK_ENV=development
ENV FLASK_APP=/app/app_run.py
