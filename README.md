```
______ _     _        _____      _              _       _           
| ___ (_)   | |      /  ___|    | |            | |     | |          
| |_/ /_  __| | ___  \ `--.  ___| |__   ___  __| |_   _| | ___ _ __ 
|    /| |/ _` |/ _ \  `--. \/ __| '_ \ / _ \/ _` | | | | |/ _ \ '__|
| |\ \| | (_| |  __/ /\__/ / (__| | | |  __/ (_| | |_| | |  __/ |   
\_| \_|_|\__,_|\___| \____/ \___|_| |_|\___|\__,_|\__,_|_|\___|_|   
```                                                                                                                                   
# A React frontend application for Ride Scheduler
Allows users to view available buslines and schedules. Details can be shown and the user is able to search for journey routes.

Administrators can add/edit/delete buslines, busstops and schedules.

# Installation guide
Also needed: The [Backend Project](https://github.com/SoftwareArchitektur2/RideSchedulerBackend)
1. Copy the backend and frontend in one parent folder
2. Copy the [docker-compose.yml](https://github.com/SoftwareArchitektur2/RideSchedulerFrontend/blob/master/docker-compose-complete/docker-compose.yml) and the [redeployDockerCompose.ps1](https://github.com/SoftwareArchitektur2/RideSchedulerFrontend/blob/master/docker-compose-complete/redeployDockerCompose.ps1) from the folder docker-compose-complete into the parent folder
3. Run redeployDockerCompose.ps1 in parent folder. It will start the database, then backend, then build frontend via nginx webserver.
4. The application is now available at [localhost](http://localhost:80)

# Ride Scheduler CI
[![Node.js CI](https://github.com/SoftwareArchitektur2/RideSchedulerFrontend/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/SoftwareArchitektur2/RideSchedulerFrontend/actions/workflows/node.js.yml)
